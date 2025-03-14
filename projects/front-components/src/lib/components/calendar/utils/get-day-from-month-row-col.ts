import { DAYS_IN_WEEK, FIRST_DAY_OF_WEEK } from '../constans';
import { getMonthStartDaysOffset } from './get-month-start-days-offset';
import type { CalendarMonth } from '../models';
import { CalendarDay } from '../models';

/**
 * Calculated day on a calendar grid
 * @return resulting day on these coordinates (could exceed passed month)
 */
export function getDayFromMonthRowCol({
	month,
	rowIndex,
	colIndex,
}: {
	month: CalendarMonth;
	colIndex: number;
	rowIndex: number;
}): CalendarDay {
	let day =
		rowIndex * DAYS_IN_WEEK +
		colIndex -
		getMonthStartDaysOffset(month, FIRST_DAY_OF_WEEK) +
		1;

	if (day > month.daysCount) {
		day -= month.daysCount;
		month = month.append({ month: 1 });
	}

	if (day <= 0) {
		month = month.append({ month: -1 });
		day = month.daysCount + day;
	}

	return new CalendarDay(month.year, month.month, day);
}
