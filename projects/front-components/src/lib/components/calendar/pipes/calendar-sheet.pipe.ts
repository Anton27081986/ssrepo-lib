import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { CalendarMonth, CalendarDay } from '../models';
import { getDayFromMonthRowCol } from '../utils';
import { CALENDAR_ROWS_COUNT, DAYS_IN_WEEK } from '../constans';

@Pipe({
	standalone: true,
	name: 'calendarSheet',
})
export class CalendarSheetPipe implements PipeTransform {
	private currentMonth: CalendarMonth | null = null;
	private currentSheet: ReadonlyArray<readonly CalendarDay[]> = [];

	public transform(
		month: CalendarMonth,
	): ReadonlyArray<readonly CalendarDay[]> {
		if (this.currentMonth?.monthSame(month)) {
			return this.currentSheet;
		}

		const sheet: Array<readonly CalendarDay[]> = [];

		for (let rowIndex = 0; rowIndex < CALENDAR_ROWS_COUNT; rowIndex++) {
			const row: CalendarDay[] = [];

			for (let colIndex = 0; colIndex < DAYS_IN_WEEK; colIndex++) {
				const day = getDayFromMonthRowCol({
					month,
					rowIndex,
					colIndex,
				});

				row.push(day);
			}

			sheet.push(row);
		}

		this.currentSheet = sheet.filter((row) => row.length);
		this.currentMonth = month;

		return this.currentSheet;
	}
}
