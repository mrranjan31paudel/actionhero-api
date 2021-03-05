import { Action } from 'actionhero';

import validateDate from '../validators/date';
import validateEmail from '../validators/email';
import {
  validateStringType,
  validateStringLength
} from '../validators/string';

import * as userService from '../services/user';

export class ReadAllUsers extends Action {
  constructor() {
    super();

    this.name = 'getAllUsersAction';
    this.description = 'Get all users. Only available for ADMIN.'
  }

  async run() {
    const users = await userService.readAllUsers();

    return { data: users };
  }
}

export class ReadUser extends Action {
  constructor() {
    super();

    this.name = 'getUserAction';
    this.description = 'Get single user. Only available for ADMIN and owner.';
    this.inputs = {
      code: {
        required: true,
        validator: val => validateStringType(val, 'code')
      }
    }
  }

  async run(request) {
    const user = await userService.readUserByCode(`${request.params.code}`);

    return { data: user };
  }
}

export class CreateUser extends Action {
  constructor() {
    super();

    this.name = 'createUserAction';
    this.description = 'Creates new user. Only available for ADMIN';
    this.inputs = {
      email: {
        required: true,
        validator: validateEmail
      },
      name: {
        required: true,
        validator: val => validateStringLength(val, 3, 'name')
      },
      dob: {
        required: true,
        validator: validateDate
      },
      address: {
        required: true,
        validator: val => validateStringLength(val, 3, 'address')
      }
    }
  }

  async run(request) {
    const result = await userService.createUser(request.params);

    return { data: result };
  }
}
