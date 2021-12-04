import { validateStringType } from "./string";

import { isStandardDateFormat, isValidDate } from "../utils/date";

/**
 * Validate date
 * @param value Date value to validate
 * @param key Date key or type: dob, created_date etc.
 */
export default function validateDate(value: string, key?: string) {
  validateStringType(value, "date");

  if (!isStandardDateFormat(value)) {
    throw new Error("Date should be in 'YYYY-MM-DD' format");
  }

  if (!isValidDate(value)) {
    throw new Error(`Invalid date ${key}`);
  }
}
