import { EMAIL_REGEXP } from "../constants/miscs";

/**
 * Check type of value to be string
 * @param value Value to validate for string type
 */
export function isString(value: any) {
  if (typeof value !== "string") {
    return false;
  }

  return true;
}

/**
 * Check email format
 * @param value Email to validate
 */
export function isvalidEmail(value: string) {
  if (!EMAIL_REGEXP.test(value)) {
    return false;
  }

  return true;
}
