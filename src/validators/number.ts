/**
 * Validate a number
 * @param value Number to validate
 * @param label Label or key of the number
 */
export default function isNumber(value: number, label: string) {
  if (isNaN(value)) {
    throw new Error(`'${label}' should be a numerical value!`);
  }
}
