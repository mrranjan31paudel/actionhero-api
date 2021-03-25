import * as moment from "moment";

import { DATE_REGEXP, STANDARD_DATE_FORMAT } from "../constants/miscs";

/**
 * Check the date format to be standard
 * @param value String date format
 */
export function isStandardDateFormat(value: string) {
  if (!DATE_REGEXP.test(value)) {
    return false;
  }

  return true;
}

/**
 * Check if the date is valid
 * @param value Date
 */
export function isValidDate(value: string | moment.Moment) {
  if (!moment(value, STANDARD_DATE_FORMAT).isValid()) {
    return false;
  }

  return true;
}
