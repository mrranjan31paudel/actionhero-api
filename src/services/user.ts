import UserModel from "../models/User";

export function readAllUsers() {
  //check if user is admin or not *It seems verfication with a middleware will be better*
}

export function readUserByCode(code: string) {
  //check if user is admin or not
}

export async function createUser(params: any) {
  const { email, name, dob, address } = params;
  //check if user is admin or not
  //check if user already exists
  const user = await UserModel.findUserByEmail(email);

  if (user && user._doc) {
    throw new Error('User already exists. E-mail already registered.');
  }

  const users = await UserModel.findAllUsers({ name: name });
  const noOfUsers = users.length || 0;
  const code = name.toLowerCase().replace(/ /g, '_') + '_' + String(noOfUsers + 1);

  const newUser = await UserModel.createUser({
    email, code, name, dob, address, type: 'SALES_PERSON'
  });

  return `New user created= ${newUser._id}`;
}

export function updateUser() {
  //check if user is admin or not
}

export function deleteUser() {
  //check if user is admin or not
}
