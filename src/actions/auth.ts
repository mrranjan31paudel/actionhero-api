import { Action } from "actionhero";

export class LogIn extends Action {
  constructor() {
    super();

    this.name = "login";
    this.inputs = {
      email: { required: true },
      password: { required: true },
    };
    this.description = "Login as a user";
  }

  async run(data) {}
}
