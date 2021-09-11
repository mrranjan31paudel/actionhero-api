import { Initializer, action } from "actionhero";

export class AuthenticationMiddleware extends Initializer {
  constructor() {
    super();

    this.name = "auth";
  }

  async initialize() {
    const authMiddleware = {
      name: this.name,
      global: true,
      preProcessor: async (data) => {},
    };

    action.addMiddleware(authMiddleware);
  }
}
