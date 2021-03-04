import { ALLOWED_UNITS } from '../constants/miscs';

/**
 * Validate the unit to be on of allowed values
 * @param unit Unit value to validate
 */
export default function isValidUnit(unit: string) {
  if (typeof unit !== 'string') {
    throw new Error(`'unit' should be of 'string' type!`);
  }

  if (!ALLOWED_UNITS.includes(unit)) {
    throw new Error(`'unit' should be one of: ${ALLOWED_UNITS.join(', ')}!`);
  }
}
