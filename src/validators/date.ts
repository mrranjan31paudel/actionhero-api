import { validateStringType } from './string';

import { isStandardDateFormat, isValidDate } from '../utils/date';

/**
 * Validate date
 * @param value Date value to validate
 */
export default function validateDate(value: string) {
  validateStringType(value, 'date');

  if (!isStandardDateFormat(value)) {
    throw new Error("date should be in 'YYYY-MM-DD' format");
  }

  if (!isValidDate(value)) {
    throw new Error('Invalid date');
  }
}
