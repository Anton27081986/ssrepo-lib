import type { CalendarYearLike } from './types';
import { normalizeToIntNumber } from '../../../core/utils';
import { MAX_YEAR, MIN_YEAR } from '../constans';

export class CalendarYear implements CalendarYearLike {
	constructor(public readonly year: number) {}

	/**
	 * Check if passed year is a leap year
	 */
	public static isLeapYear(year: number): boolean {
		return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
	}

	/**
	 * Normalizes year by clamping it between min and max years
	 */
	public static normalizeYearPart(year: number): number {
		return normalizeToIntNumber(year, MIN_YEAR, MAX_YEAR);
	}

	public get isLeapYear(): boolean {
		return CalendarYear.isLeapYear(this.year);
	}

	public get formattedYear(): string {
		return String(this.year).padStart(4, '0');
	}

	/**
	 * Passed year is the same as current
	 */
	public yearSame({ year }: CalendarYear): boolean {
		return this.year === year;
	}

	/**
	 * Passed year is before current
	 */
	public yearAfter({ year }: CalendarYear): boolean {
		return this.year > year;
	}

	/**
	 * Passed year is the same or after current
	 */
	public yearSameOrBefore({ year }: CalendarYear): boolean {
		return this.year <= year;
	}

	/**
	 * Passed year is either the same of before the current
	 */
	public yearSameOrAfter({ year }: CalendarYear): boolean {
		return this.year >= year;
	}

	/**
	 * Immutably offsets year
	 */
	public append({ year = 0 }: CalendarYearLike): CalendarYear {
		const resultYear = this.year + year;

		return new CalendarYear(resultYear);
	}

	/**
	 * Passed year is after current
	 */
	public yearBefore({ year }: CalendarYear): boolean {
		return this.year < year;
	}
}
