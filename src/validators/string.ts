import { isString } from "../utils/string";

/**
 * Validate string type
 * @param value Value to validate
 * @param label Label or key of value
 */
export function validateStringType(value: any, label: string) {
  if (!isString(value)) {
    throw new Error(`'${label}' should be of 'string' type!`);
  }
}

/**
 * Validate length of a string
 * @param value String to validate
 * @param length Threshold length
 * @param label Label or key of value
 */
export function validateMinStringLength(
  value: string,
  length: number,
  label: string
) {
  validateStringType(value, label);

  if (value.length < length) {
    throw new Error(`'${label}' should be minimum of ${length} characters.`);
  }
}
