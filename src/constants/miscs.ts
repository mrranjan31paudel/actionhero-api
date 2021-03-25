export const STANDARD_DATE_FORMAT = "YYYY-MM-DD";

export const ALLOWED_UNITS = ["KG", "LTR", "PACK"];
export const USER_ROLES = ["ADMIN", "SALES_PERSON"];

export const DATE_REGEXP = /^\d\d\d\d-\d\d-\d\d$/;
export const EMAIL_REGEXP = /^[a-z]([a-z]|[0-9]){2,100}@[a-z]{2,100}\.com$/;

const UserRolesConst = [...USER_ROLES] as const;
export type ROLE_TYPE = typeof UserRolesConst[number];
