export const STANDARD_DATE_FORMAT = "YYYY-MM-DD";

export const ALLOWED_UNITS = ["KG", "LTR", "PACK"];
export const ALLOWED_GENDERS = ["F", "M", "O"];
export const USER_ROLES = ["ADMIN", "SALES_PERSON"];

export const DATE_REGEXP = /^\d\d\d\d-\d\d-\d\d$/;
export const EMAIL_REGEXP = /^[a-z]([a-z]|[0-9]){2,100}@[a-z]{2,100}\.com$/;

export const DEFAULT_PAGE_NUM = 0;
export const DEFAULT_RECORDS_PER_PAGE = 25;

const UserRolesConst = [...USER_ROLES] as const;
export type ROLE_TYPE = typeof UserRolesConst[number];
