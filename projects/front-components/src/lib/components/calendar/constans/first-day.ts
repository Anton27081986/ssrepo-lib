import { CalendarDay } from '../models';
import { MIN_YEAR } from './min-year';
import { MIN_DAY } from './min-day';
import { MIN_MONTH } from './min-month';

export const FIRST_DAY = new CalendarDay(MIN_YEAR, MIN_MONTH, MIN_DAY);
