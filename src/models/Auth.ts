import { api } from "actionhero";

export interface AuthType {
  email?: string;
  password?: string;
}

/**
 * Create a record of user's code and password when a new user is created
 * @param authData New set of userCode and password
 * @returns {object}
 */
function createAuthRecord(authData: AuthType) {
  const newAuthRecord = api.colls.auth(authData);

  return newAuthRecord.save();
}

/**
 * Read a user's auth record. Used for user auth validation while logging in.
 * @param userCode User's code
 * @returns {object}
 */
function readAuthRecord(email: string): AuthType {
  return api.colls.auth.findOne({ email: email }).lean().exec();
}

/**
 * Update user's password
 * @param authData
 * @returns
 */
function updateAuthRecord(authData: AuthType) {
  return api.colls.auth
    .updateOne({ email: authData.email }, { password: authData.password })
    .lean()
    .exec();
}

/**
 * Delete an auth record. Used when a user is deleted.
 * @param userCode
 * @returns
 */
function deleteAuthRecord(email: string) {
  return api.colls.auth.deleteOne({ email: email }).lean().exec();
}

export default {
  createAuthRecord,
  readAuthRecord,
  updateAuthRecord,
  deleteAuthRecord,
};
