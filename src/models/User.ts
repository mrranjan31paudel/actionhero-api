import { api } from "actionhero";

import { ROLE_TYPE } from "../constants/miscs";

export interface UserType {
  code?: string;
  email?: string;
  name?: string;
  gender?: string;
  address?: string;
  dob?: Date;
  role?: ROLE_TYPE;
}

interface FiltersType {
  name?: string;
}

function findAllUsers(filters: FiltersType) {
  return api.colls.users.find(filters).exec();
}

function findUserByCode(code: string): UserType {
  return api.colls.users.findOne({ code: code }).lean().exec();
}

function findUserByEmail(email: string) {
  return api.colls.users.findOne({ email: email }).lean().exec();
}

function createUser(newUser: UserType) {
  const NewUser = api.colls.users(newUser);

  return NewUser.save();
}

function updateUser(code: string, userData: UserType) {
  return api.colls.users.updateOne({ code: code }, userData).lean().exec();
}

function deleteUser(code: string) {
  return api.colls.users.deleteOne({ code: code }).lean().exec();
}

export default {
  findAllUsers,
  findUserByCode,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
