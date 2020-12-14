import { Action } from "actionhero"
const moment = require('moment');

import * as userService from "../services/user"
import { stringHasValidLength } from "../utils/string"

export class ReadAllUsersAction extends Action {
  constructor() {
    super();

    this.name = 'readAllUsersAction';
    this.description = 'Read all users. Only available for ADMIN.'
  }

  async run() {
    const users = await userService.readAllUsers();

    return { data: users };
  }
}

export class ReadUserAction extends Action {
  constructor() {
    super();

    this.name = 'readUserAction';
    this.description = 'Read single user. Only available for ADMIN and owner.';
    this.inputs = {
      code: {
        required: true
      }
    }
  }

  async run(request) {
    const user = await userService.readUserByCode(`${request.params.code}`);

    return { data: user };
  }
}

export class CreateUserAction extends Action {
  constructor() {
    super();

    this.name = 'createUserAction';
    this.description = 'Creates new user. Only available for ADMIN';
    this.inputs = {
      email: {
        required: true,
        validator: this.emailValidator
      },
      name: {
        required: true,
        validator: this.nameValidator
      },
      dob: {
        required: true,
        validator: this.dateValidator
      },
      address: {
        required: true,
        validator: this.addressValidator
      }
    }
  }

  emailValidator(email) {
    const emailRegex = /^[a-z]([a-z]|[0-9]){2,100}@[a-z]{2,100}\.com$/;

    if (!emailRegex.test(email)) {
      throw new Error(`Invalid 'email' format.`);
    }
  }

  dateValidator(date) {
    const dateRegex = /^\d\d\d\d-\d\d-\d\d$/;

    if (!dateRegex.test(date)) {
      throw new Error(`'dob' should be in 'YYYY-MM-DD' format.`);
    }

    if (!moment(date).isValid()) {
      throw new Error(`Invalid date value for 'dob' param.`);
    }
  }

  nameValidator(name) {
    if (!stringHasValidLength(name)) {
      throw new Error(`'name' should be minimum 3 characters.`);
    }
  }

  addressValidator(address) {
    if (!stringHasValidLength(address)) {
      throw new Error(`'address' should be minimum 3 characters.`);
    }
  }

  async run(request) {
    const result = await userService.createUser(request.params);

    return { data: result };
  }
}
