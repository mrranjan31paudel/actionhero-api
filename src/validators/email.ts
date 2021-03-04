import { EMAIL_REGEXP } from '../constants/miscs';

/**
 * Validate email format
 * @param value Email to validate
 */
export default function isvalidEmail(value: string) {
  if (!EMAIL_REGEXP.test(value)) {
    throw new Error('Invalid email format');
  }
} 
