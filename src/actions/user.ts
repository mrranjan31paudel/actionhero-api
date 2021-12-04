import { Action } from "actionhero";

import validateDate from "../validators/date";
import validateEmail from "../validators/email";
import validateGender from "../validators/gender";
import {
  validateStringType,
  validateMinStringLength,
} from "../validators/string";

import * as userService from "../services/user";

export class ReadAllUsers extends Action {
  constructor() {
    super();

    this.name = "getAllUsersAction";
    this.description = "Get all users. Only available for ADMIN.";
  }

  async run() {
    const users = await userService.readAllUsers();

    return { data: users };
  }
}

export class ReadUser extends Action {
  constructor() {
    super();

    this.name = "getUserAction";
    this.description = "Get single user. Only available for ADMIN and owner.";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateStringType(val, "code"),
      },
    };
  }

  async run(request) {
    const user = await userService.readUserByCode(`${request.params.code}`);

    return { data: user };
  }
}

export class CreateUser extends Action {
  constructor() {
    super();

    this.name = "createUserAction";
    this.description = "Creates new user. Only available for ADMIN";
    this.inputs = {
      email: {
        required: true,
        validator: validateEmail,
      },
      name: {
        required: true,
        validator: (val) => validateMinStringLength(val, 3, "name"),
      },
      dob: {
        required: true,
        validator: validateDate,
      },
      gender: {
        required: true,
        validator: validateGender,
      },
      address: {
        required: true,
        validator: (val) => validateMinStringLength(val, 3, "address"),
      },
    };
  }

  async run(request) {
    const result = await userService.createUser(request.params);

    return { data: result };
  }
}

export class UpdateUser extends Action {
  constructor() {
    super();

    this.name = "updateUserAction";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateStringType(val, "code"),
      },
      name: {
        required: false,
        validator: (val) => validateMinStringLength(val, 3, "name"),
      },
      dob: {
        required: false,
        validator: validateDate,
      },
      address: {
        required: false,
        validator: (val) => validateMinStringLength(val, 3, "address"),
      },
    };
    this.description = "Updates specified user, only for ADMIN!";
  }

  async run(request) {
    const result = await userService.updateUser(request.params);

    return { data: result };
  }
}

export class DeleteUser extends Action {
  constructor() {
    super();

    this.name = "deleteUserAction";
    this.inputs = {
      code: {
        required: true,
        validator: (val) => validateStringType(val, "code"),
      },
    };
    this.description = "Deletes specified user, only for ADMIN!";
  }

  async run(request) {
    const result = await userService.deleteUser(request.params.code);

    return { data: result };
  }
}
