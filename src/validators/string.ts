/**
 * Validate length of a string
 * @param value String to validate
 * @param length Threshold length
 * @param label Label or key of value
 */
export function isValidLengthString(value: string, length: number, label: string) {
  if (typeof value !== 'string') {
    throw new Error(`'${label}' should be of 'string' type!`);
  }

  if (value.length !== length) {
    throw new Error(`'${label}' should be minimum of ${length} characters.`);
  }
}
