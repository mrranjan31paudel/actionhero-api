import { validateStringType } from "./string";

import { ALLOWED_GENDERS } from "../constants/miscs";

/**
 * Validate the gender to be on of allowed values
 * @param gender Gender value to validate
 */
export default function validateGender(gender: string) {
  validateStringType(gender, "gender");

  if (!ALLOWED_GENDERS.includes(gender)) {
    throw new Error(
      `'gender' should be one of: ${ALLOWED_GENDERS.join(", ")}!`
    );
  }
}
