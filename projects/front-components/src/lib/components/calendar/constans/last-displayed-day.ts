import { CalendarDay } from '../models';
import { MAX_MONTH } from './max-month';
import { MAX_DISPLAYED_YEAR } from './max-displayed-year';

export const LAST_DISPLAYED_DAY = new CalendarDay(MAX_DISPLAYED_YEAR, MAX_MONTH, 31);