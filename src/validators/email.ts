import { validateStringType } from "./string";

import { isvalidEmail } from "../utils/string";

/**
 * Validate email format
 * @param value Email to validate
 */
export default function validateEmail(value: string) {
  validateStringType(value, "email");

  if (!isvalidEmail(value)) {
    throw new Error("Invalid email format");
  }
}
