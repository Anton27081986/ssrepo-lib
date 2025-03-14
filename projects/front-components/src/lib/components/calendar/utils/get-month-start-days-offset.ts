import { DAYS_IN_WEEK } from '../constans';
import type { CalendarMonth } from '../models';

/**
 * Computes day of week offset of the beginning of the month
 */
export function getMonthStartDaysOffset(
	month: CalendarMonth,
	firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
): number {
	const startMonthOffsetFromSunday = new Date(
		month.year,
		month.month,
		1,
	).getDay();

	return startMonthOffsetFromSunday >= firstDayOfWeek
		? startMonthOffsetFromSunday - firstDayOfWeek
		: DAYS_IN_WEEK - (firstDayOfWeek - startMonthOffsetFromSunday);
}
