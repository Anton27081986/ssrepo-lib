import { CalendarDay } from '../models';
import { MAX_YEAR } from './max-year';
import { MAX_MONTH } from './max-month';

export const LAST_DAY = new CalendarDay(MAX_YEAR, MAX_MONTH, 31);
