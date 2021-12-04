import { Action } from "actionhero";

import * as authService from "../services/auth";

import {
  validateMinStringLength,
  validateStringType,
} from "../validators/string";
import validateEmail from "../validators/email";

export class GenerateUserCredential extends Action {
  constructor() {
    super();

    this.name = "registerUserCredentialAction";
    this.inputs = {
      email: {
        required: true,
        validator: validateEmail,
      },
      password: {
        required: true,
        validator: (val) => validateMinStringLength(val, 8, "password"),
      },
    };
    this.description =
      "Generate login credential for any user. Set of email and password.";
  }

  async run(data) {
    await authService.generateUserCredentials(data.params);

    return { data: "Generated credential for the user." };
  }
}

export class UpdateUserCredential extends Action {
  constructor() {
    super();

    this.name = "updateUserCredentialAction";
    this.inputs = {
      email: {
        required: true,
        validator: validateEmail,
      },
      password: {
        required: true,
        validator: (val) => validateMinStringLength(val, 8, "password"),
      },
    };
    this.description = "Update login credential of a user.";
  }

  async run(data) {
    await authService.changeUserPassword(data.params);

    return { data: "Updated credential of the user." };
  }
}

export class DeleteUserCredential extends Action {
  constructor() {
    super();

    this.name = "deleteUserCredentialAction";
    this.inputs = {
      email: {
        required: true,
        validator: validateEmail,
      },
    };
    this.description = "Delete login credential of a user.";
  }

  async run(data) {
    await authService.deleteUserCredential(data.params.email);

    return { data: "Deleted credential of the user." };
  }
}

export class LogIn extends Action {
  constructor() {
    super();

    this.name = "loginAction";
    this.inputs = {
      email: {
        required: true,
        validator: validateEmail,
      },
      password: {
        required: true,
        validator: (val) => validateMinStringLength(val, 8, "password"),
      },
    };
    this.description = "Login as a user";
  }

  async run(data) {
    const tokens = await authService.login(data.params);

    return { data: tokens };
  }
}

export class RefreshTokens extends Action {
  constructor() {
    super();

    this.name = "refreshTokensAction";
    this.inputs = {
      accessToken: {
        required: true,
        validator: (val) => validateStringType(val, "accessToken"),
      },
      refreshToken: {
        required: true,
        validator: (val) => validateStringType(val, "refreshToken"),
      },
    };
    this.description = "Refresh tokens";
  }

  async run(data) {
    const refreshedTokens = await authService.refreshTokens(data.params);

    return { data: refreshedTokens };
  }
}
