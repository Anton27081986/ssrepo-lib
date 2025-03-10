import { CalendarDay } from '../models';
import { LIMIT_YEARS } from './limit-years';

export const MIN_YEAR = CalendarDay.currentLocal().year - LIMIT_YEARS;