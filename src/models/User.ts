const mongoose = require("mongoose");
const db = require('../config/mongoDB');

export interface UserType {
  code: string,
  email: string,
  name: string,
  address: string,
  dob: Date,
  type: 'ADMIN' | 'SALES_PERSON'
};

interface FiltersType {
  name?: string
};

const UserSchema = mongoose.Schema({
  code: {
    type: String,
    unique: true
  }, //format will be 'full_name_<count>'-> count = no. of user with same name.
  email: {
    type: String,
    unique: true
  },
  name: String,
  address: String,
  dob: Date,
  type: {
    type: String,
    enum: ['ADMIN', 'SALES_PERSON']
  }
}, {
  timestamps: {
    createdAt: 'added_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', UserSchema);

function findAllUsers(filters: FiltersType) {
  return User.find(filters);
}

function findUserByCode(code: string) {

}

function findUserByEmail(email: string) {
  return User.findOne({ email: email });
}

function createUser(newUser: UserType) {
  const NewUser = User(newUser);

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
