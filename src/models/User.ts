import { api } from 'actionhero';

import { ROLE_TYPE } from '../constants/miscs';

export interface UserType {
  code?: string,
  email?: string,
  name?: string,
  address?: string,
  dob?: Date,
  role?: ROLE_TYPE
};

interface FiltersType {
  name?: string
};

function findAllUsers(filters: FiltersType) {
  return api.colls.users.find(filters);
}

function findUserByCode(code: string) {
  return api.colls.users.findOne({ code: code });
}

function findUserByEmail(email: string) {
  return api.colls.users.findOne({ email: email });
}

function createUser(newUser: UserType) {
  const NewUser = api.colls.users(newUser);

  return NewUser.save();
}

function updateUser(user: UserType) {

}

function deleteUser(_id: number) {

}

export default {
  findAllUsers,
  findUserByCode,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser
}
