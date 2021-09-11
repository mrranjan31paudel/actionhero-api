import UserModel from "../models/User";

import { AlreadyExistsError, NotFoundError } from "../utils/errors";

export async function readAllUsers() {
  //check if user is admin or not *It seems verfication with a middleware will be better*
  const data = await UserModel.findAllUsers({});

  const formattedData = data.map((doc) => {
    const newDoc = { ...doc._doc };
    delete newDoc.__v;

    return newDoc;
  });

  return formattedData;
}

export async function readUserByCode(code: string) {
  //check if user is admin or not
  const user = await UserModel.findUserByCode(code);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const formattedUserData = { ...user._doc };
  delete formattedUserData.__v;

  return formattedUserData;
}

export async function createUser(params: any) {
  const { email, name, dob, address, gender, password } = params;
  //check if user is admin or not: TODO

  //check if user already exists
  const user = await UserModel.findUserByEmail(email);

  if (user && user._doc) {
    throw new AlreadyExistsError("Email already in use!");
  }

  const users = await UserModel.findAllUsers({ name: name });
  const noOfUsers = users.length || 0;
  const code =
    name.toLowerCase().replace(/ /g, "_") + "_" + String(noOfUsers + 1);

  const newUser = await UserModel.createUser({
    email,
    code,
    name,
    dob,
    gender,
    address,
    role: "SALES_PERSON",
  });

  return `New user created= ${newUser._id}`;
}

export async function updateUser(params: any) {
  const { code, name, dob, address } = params;

  const user = await UserModel.findUserByCode(code);

  if (!user) {
    throw new NotFoundError("User does not exist!");
  }

  let newUserData = {};

  if (name) {
    newUserData["name"] = name;
  }

  if (dob) {
    newUserData["dob"] = dob;
  }

  if (address) {
    newUserData["address"] = address;
  }

  await UserModel.updateUser(code, newUserData);

  return `User ${code} updated!`;
}

export async function deleteUser(code: string) {
  const user = await UserModel.findUserByCode(code);

  if (!user) {
    throw new NotFoundError(`User does not exist!`);
  }

  await UserModel.deleteUser(code);

  return "User deleted!";
}
