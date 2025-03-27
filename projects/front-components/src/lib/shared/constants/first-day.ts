import { CalendarDay } from '../../components/calendar/models';
import {
	MIN_DAY,
	MIN_MONTH,
	MIN_YEAR,
} from '../../components/calendar/constans';

export const FIRST_DAY = new CalendarDay(MIN_YEAR, MIN_MONTH, MIN_DAY);
