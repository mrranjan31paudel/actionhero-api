const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import { auth } from "../config/env";
import AuthModel, { AuthType } from "../models/Auth";
import UserModel, { UserType } from "../models/User";
import {
  AuthenticationError,
  BadRequestError,
  InternalError,
} from "../utils/errors";

/**
 * Encrypt or hash a raw password
 * @param password Raw password string
 * @returns Hashed password string
 */
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(auth.passwordSaltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

/**
 * Compare input value with hashed password to verify
 * @param inputvalue Raw input password
 * @param hashedPassword Hashed password from DB
 * @returns True if password is verified, else False
 */
export async function verifyPassword(
  inputvalue: string,
  hashedPassword: string
) {
  const isVerified = await bcrypt.compare(inputvalue, hashedPassword);

  return isVerified;
}

export async function generateUserCredentials(authData: AuthType) {
  const user = await UserModel.findUserByEmail(authData.email);

  if (user === null) throw new BadRequestError("Unknown user!");

  const userCred = await AuthModel.readAuthRecord(authData.email);

  if (userCred !== null)
    throw new BadRequestError("User credential already created!");

  const hashedPassword = await hashPassword(authData.password);

  return AuthModel.createAuthRecord({
    email: user.email,
    password: hashedPassword,
  });
}

export async function changeUserPassword(authData: AuthType) {
  const userCred = await AuthModel.readAuthRecord(authData.email);

  if (userCred === null)
    throw new BadRequestError("User credential has not been genrated!");

  const areOldAndNewPasswordSame = await verifyPassword(
    authData.password,
    userCred.password
  );

  if (areOldAndNewPasswordSame)
    throw new BadRequestError("Cannot set the old password again!");

  const newHashedPassword = await hashPassword(authData.password);

  return AuthModel.updateAuthRecord({
    ...authData,
    password: newHashedPassword,
  });
}

export async function deleteUserCredential(email: string) {
  const userCred = await AuthModel.readAuthRecord(email);

  if (userCred === null)
    throw new BadRequestError("User credential has not been genrated!");

  return AuthModel.deleteAuthRecord(email);
}

async function generateTokens(user: UserType) {
  const { code, email } = user;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  // payload for accessToken
  let payload = {
    code,
    email,
    exp: nowInSeconds + auth.jwt.accessTokenLife,
  };

  let accessToken = jwt.sign(payload, auth.jwt.secret);

  // payload for refreshToken
  Object.assign(payload, { accessToken });
  payload.exp = nowInSeconds + auth.jwt.refreshTokenLife;

  let refreshToken = jwt.sign(payload, auth.jwt.secret);

  // Encode the tokens: TODO
  // accessToken = await encodeToken(accessToken);
  // refreshToken = await encodeToken(refreshToken);

  return { accessToken, refreshToken };
}

export async function verifyToken(token: string) {
  const payload = await jwt.verify(token, auth.jwt.secret);

  return payload;
}

/**
 * decode access token and check if it is null
 * verify refresh token
 * if refresh token also expired send auth error to make the user to relogin
 * compare the access token of refresh token payload with the provided one from request
 * compare user id or code and email from both payloads
 * check whether the user exists or not
 * if all right call the generateTokens function.
 */
export async function refreshTokens(tokens: {
  accessToken: string;
  refreshToken: string;
}) {
  let invalidTokenStr = "Invalid Token!";
  let accessTokenPayload = jwt.decode(tokens.accessToken);

  if (accessTokenPayload === null)
    throw new AuthenticationError(invalidTokenStr);

  let refreshTokenPayload = null;
  try {
    refreshTokenPayload = await verifyToken(tokens.refreshToken);
    console.log(refreshTokenPayload);
  } catch (error) {
    console.error(error);
    throw new AuthenticationError(invalidTokenStr);
  }

  let noPayload = !(accessTokenPayload && refreshTokenPayload);
  let accessTokenMismatch =
    tokens.accessToken !== refreshTokenPayload.accessToken;
  let invalidCode =
    !accessTokenPayload.code ||
    !refreshTokenPayload.code ||
    accessTokenPayload.code !== refreshTokenPayload.code;
  let invalidEmail =
    !accessTokenPayload.email ||
    !refreshTokenPayload.email ||
    accessTokenPayload.email !== refreshTokenPayload.email;

  if (noPayload || accessTokenMismatch || invalidCode || invalidEmail)
    throw new AuthenticationError(invalidTokenStr);

  let user: UserType = null;
  try {
    user = await UserModel.findUserByCode(refreshTokenPayload.code);
  } catch (error) {
    console.error(error);
    throw new InternalError();
  }

  if (user === null || user.email !== refreshTokenPayload.email)
    throw new AuthenticationError(invalidTokenStr);

  return generateTokens(user);
}

export async function login(loginData: AuthType) {
  const { email, password } = loginData;

  const user = await UserModel.findUserByEmail(email);

  if (user === null) throw new BadRequestError("Unknown user!");

  const authData = await AuthModel.readAuthRecord(email);

  if (authData === null)
    throw new BadRequestError(
      "User credential is not setup. Please contact IT!"
    );

  const isPasswordValid = await verifyPassword(password, authData.password);

  if (!isPasswordValid)
    throw new BadRequestError("Email and password do not match!");

  return generateTokens(user);
}
