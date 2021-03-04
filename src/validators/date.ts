import * as moment from 'moment';

import { DATE_REGEXP } from '../constants/miscs';

/**
 * Validate date
 * @param value Date value to validate
 */
export default function isValidDate(value: string) {
  if (typeof value !== 'string') {
    throw new Error(`'date' should be of 'string' type!`);
  }

  if (!DATE_REGEXP.test(value)) {
    throw new Error("date should be in 'YYYY-MM-DD' format");
  }

  if (!moment(value).isValid()) {
    throw new Error('Invalid date');
  }
}
