import { MonthNumber } from './month-number';
import { CalendarYear } from './calendar-year';
import type { CalendarMonthLike } from './types';
import {
	MAX_MONTH,
	MIN_MONTH,
	MONTHS_IN_YEAR,
	MONTHS_LONG,
	MONTHS_SHORT,
} from '../constans';
import { normalizeToIntNumber } from '../../../core/utils';

export class CalendarMonth extends CalendarYear implements CalendarMonthLike {
	/**
	 * @param year
	 * @param month (starting with 0)
	 */
	constructor(
		year: number,
		public readonly month: number,
	) {
		super(year);
	}

	public static getMonthDaysCount(
		month: number,
		isLeapYear: boolean,
	): number {
		switch (month) {
			case MonthNumber.April:
			case MonthNumber.June:
			case MonthNumber.November:
			case MonthNumber.September:
				return 30;
			case MonthNumber.February:
				return isLeapYear ? 29 : 28;
			default:
				return 31;
		}
	}

	/**
	 * Returns current month and year based on local time zone
	 */
	public static currentLocal(): CalendarMonth {
		const nativeDate = new Date();

		return new CalendarMonth(
			nativeDate.getFullYear(),
			nativeDate.getMonth(),
		);
	}

	/**
	 * Normalizes number by clamping it between min and max month
	 */
	public static normalizeMonthPart(month: number): number {
		return normalizeToIntNumber(month, MIN_MONTH, MAX_MONTH);
	}

	public get daysCount(): number {
		return CalendarMonth.getMonthDaysCount(this.month, this.isLeapYear);
	}

	public get formattedMonthYear(): string {
		return `${this.formattedMonthLong} ${this.formattedYear}`;
	}

	public get formattedMonthShort(): string {
		return MONTHS_SHORT[this.month] || MONTHS_SHORT[0];
	}

	public get formattedMonthLong(): string {
		return MONTHS_LONG[this.month] || MONTHS_LONG[0];
	}

	public get formattedMonthPart(): string {
		return String(this.month + 1).padStart(2, '0');
	}

	/**
	 * Immutably alters current month and year by passed offset
	 *
	 * @param offset
	 * @return new month and year object as a result of offsetting current
	 */
	public override append({
		year = 0,
		month = 0,
	}: CalendarMonthLike): CalendarMonth {
		const totalMonths =
			(this.year + year) * MONTHS_IN_YEAR + this.month + month;

		return new CalendarMonth(
			Math.floor(totalMonths / MONTHS_IN_YEAR),
			totalMonths % MONTHS_IN_YEAR,
		);
	}

	public override toString(): string {
		return `${this.formattedMonthPart}.${this.formattedYear}`;
	}

	public monthSame(another: CalendarMonth): boolean {
		return this.yearSame(another) && this.month === another.month;
	}

	/**
	 * Returns native {@link Date} based on local time zone
	 */
	public toLocalNativeDate(): Date {
		return new Date(this.year, this.month);
	}

	/**
	 * Passed month and year are after or the same as current
	 */
	public monthSameOrBefore(another: CalendarMonth): boolean {
		return (
			this.yearBefore(another) ||
			(this.yearSame(another) && this.month <= another.month)
		);
	}

	/**
	 * Passed month and year are either before or equal to current
	 */
	public monthSameOrAfter(another: CalendarMonth): boolean {
		return (
			this.yearAfter(another) ||
			(this.yearSame(another) && this.month >= another.month)
		);
	}

	/**
	 * Passed month and year are after current
	 */
	public monthBefore(another: CalendarMonth): boolean {
		return (
			this.yearBefore(another) ||
			(this.yearSame(another) && this.month < another.month)
		);
	}

	/**
	 * Passed month and year are before current
	 */
	public monthAfter(another: CalendarMonth): boolean {
		return (
			this.yearAfter(another) ||
			(this.yearSame(another) && this.month > another.month)
		);
	}
}
