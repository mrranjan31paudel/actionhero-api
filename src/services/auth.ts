import bcrypt from "bcrypt";

import { auth } from "../config/env";

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
