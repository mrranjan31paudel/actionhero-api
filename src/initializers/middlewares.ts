import { Initializer, action, api } from "actionhero";
const jwt = require("jsonwebtoken");

import { verifyToken } from "../services/auth";
import UserModel from "../models/User";
import { AuthenticationError, ForbiddenError } from "../utils/errors";

export class AuthenticationMiddleware extends Initializer {
  constructor() {
    super();

    this.name = "auth";
  }

  async initialize() {
    const authMiddleware = {
      name: this.name,
      global: true,
      preProcessor: async (data) => {
        let authorizationHeader: string =
          data.connection.rawConnection.req.headers.authorization;
        let requestedAction = data.params.action;

        if (["login", "refreshTokens"].includes(requestedAction)) return;

        if (!authorizationHeader || !authorizationHeader.includes("Bearer "))
          throw new ForbiddenError();

        let accessToken = authorizationHeader.replace("Bearer ", "");

        if (accessToken.length === 0) throw new AuthenticationError();

        let user = null;
        try {
          let payload = await verifyToken(accessToken);

          delete payload.exp;
          delete payload.iat;

          user = await UserModel.findUserByCode(payload.code);
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError)
            throw new AuthenticationError("Token Expired");

          throw new AuthenticationError();
        }

        if (user === null) throw new AuthenticationError();

        data.params.authUser = user;
      },
    };

    action.addMiddleware(authMiddleware);
  }
}
