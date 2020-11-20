import { Action } from "actionhero"

class UserAction extends Action {
  constructor() {
    super();

    this.name = 'userAction';
  }

  async run() {
    // Get current user details
    // If user is ADMIN then allow other services
  }
}
