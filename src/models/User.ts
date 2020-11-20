export interface UserType {
  _id: number,
  email: string,
  name: string,
  address: string,
  dob: Date,
  type: 'ADMIN' | 'SALES_PERSON'
};

export class User {
  constructor() {

  }

  static readAllUsers = () => {

  }

  static readUser = (_id: number) => {

  }

  static createUser = (newUser: UserType, currentUser: UserType) => {
    if (currentUser.type !== 'ADMIN') {
      throw new Error('')
    }
  }

  static updateUser = (user: UserType) => {

  }

  static deleteUser = (_id: number) => {

  }
}
