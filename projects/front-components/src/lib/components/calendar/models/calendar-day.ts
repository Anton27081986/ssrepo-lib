import { CalendarMonth } from './calendar-month';
import { DAY_OF_WEEK } from '../constans';
import { DateFormat } from './date-format';
import { CalendarYear } from './calendar-year';
import { normalizeToIntNumber } from '../../../core/utils';

export class CalendarDay extends CalendarMonth {
	/**
	 * @param year
	 * @param month (starting with 0)
	 * @param day
	 */
	constructor(
		year: number,
		month: number,
		public readonly day: number,
	) {
		super(year, month);
	}

	/**
	 * Creates {@link CalendarDay} from native {@link Date} based on local time zone
	 */
	public static fromLocalNativeDate(date: Date): CalendarDay {
		return new CalendarDay(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
		);
	}

	/**
	 * Current day based on local time zone
	 */
	public static override currentLocal(): CalendarDay {
		const nativeDate = new Date();
		const year = nativeDate.getFullYear();
		const month = nativeDate.getMonth();
		const day = nativeDate.getDate();

		return new CalendarDay(year, month, day);
	}

	public static parseRawDateString(
		date: string,
		dateMode: DateFormat = DateFormat.DMY,
	): { day: number; month: number; year: number } {
		switch (dateMode) {
			case 'MDY':
				return {
					day: parseInt(date.slice(3, 5), 10),
					month: parseInt(date.slice(0, 2), 10) - 1,
					year: parseInt(date.slice(6, 10), 10),
				};

			case 'YMD':
				return {
					day: parseInt(date.slice(8, 10), 10),
					month: parseInt(date.slice(5, 7), 10) - 1,
					year: parseInt(date.slice(0, 4), 10),
				};

			case 'DMY':
			default:
				return {
					day: parseInt(date.slice(0, 2), 10),
					month: parseInt(date.slice(3, 5), 10) - 1,
					year: parseInt(date.slice(6, 10), 10),
				};
		}
	}

	/**
	 * Parsing a string with date with normalization
	 *
	 * @param rawDate date string
	 * @param dateMode date format of the date string (DMY | MDY | YMD)
	 * @return normalized date
	 */
	public static normalizeParse(
		rawDate: string,
		dateMode: DateFormat = DateFormat.DMY,
	): CalendarDay {
		const { day, month, year } = this.parseRawDateString(rawDate, dateMode);

		return CalendarDay.normalizeOf(year, month, day);
	}

	/**
	 * Calculates {@link CalendarDay} normalizing year, month and day. {@link NaN} is turned into minimal value.
	 *
	 * @param year any year value, including invalid
	 * @param month any month value, including invalid (months start with 0)
	 * @param day any day value, including invalid
	 * @return normalized date
	 */
	public static normalizeOf(
		year: number,
		month: number,
		day: number,
	): CalendarDay {
		const normalizedYear = CalendarYear.normalizeYearPart(year);
		const normalizedMonth = CalendarMonth.normalizeMonthPart(month);
		const normalizedDay = CalendarDay.normalizeDayPart(
			day,
			normalizedMonth,
			normalizedYear,
		);

		return new CalendarDay(normalizedYear, normalizedMonth, normalizedDay);
	}

	public static normalizeDayPart(
		day: number,
		month: number,
		year: number,
	): number {
		const monthDaysCount = CalendarMonth.getMonthDaysCount(
			month,
			CalendarYear.isLeapYear(year),
		);

		return normalizeToIntNumber(day, 1, monthDaysCount);
	}

	public get isWeekend(): boolean {
		const dayOfWeek = this.dayOfWeek(false);

		return (
			dayOfWeek === DAY_OF_WEEK.Saturday ||
			dayOfWeek === DAY_OF_WEEK.Sunday
		);
	}

	public get formattedDayPart(): string {
		return String(this.day).padStart(2, '0');
	}

	/**
	 * Returns native {@link Date} based on local time zone
	 */
	public override toLocalNativeDate(): Date {
		return new Date(this.year, this.month, this.day);
	}

	public override toString(
		dateFormat: DateFormat = DateFormat.DMY,
		separator = '.',
	): string {
		return this.getFormattedDay(dateFormat, separator);
	}

	/**
	 * Returns formatted whole date
	 */
	public getFormattedDay(dateFormat: DateFormat, separator: string): string {
		const dd = this.formattedDayPart;
		const mm = this.formattedMonthPart;
		const yyyy = this.formattedYear;

		switch (dateFormat) {
			case DateFormat.MDY:
				return `${mm}${separator}${dd}${separator}${yyyy}`;
			case DateFormat.YMD:
				return `${yyyy}${separator}${mm}${separator}${dd}`;
			case DateFormat.DMY:
			default:
				return `${dd}${separator}${mm}${separator}${yyyy}`;
		}
	}

	/**
	 * Returns day of week
	 *
	 * @param startFromMonday whether week starts from Monday and not from Sunday
	 * @return day of week (from 0 to 6)
	 */
	public dayOfWeek(startFromMonday = true): number {
		const dayOfWeek = startFromMonday
			? this.toLocalNativeDate().getDay() - 1
			: this.toLocalNativeDate().getDay();

		return dayOfWeek < 0 ? 6 : dayOfWeek;
	}

	/**
	 * Passed date is the same as current
	 */
	public daySame(another: CalendarDay): boolean {
		return this.monthSame(another) && this.day === another.day;
	}

	/**
	 * Passed date is after current
	 */
	public dayBefore(another: CalendarDay): boolean {
		return (
			this.monthBefore(another) ||
			(this.monthSame(another) && this.day < another.day)
		);
	}

	/**
	 * Passed date is before current
	 */
	public dayAfter(another: CalendarDay): boolean {
		return (
			this.monthAfter(another) ||
			(this.monthSame(another) && this.day > another.day)
		);
	}

	/**
	 * Passed date is after or equals to current
	 */
	public daySameOrBefore(another: CalendarDay): boolean {
		return (
			this.monthBefore(another) ||
			(this.monthSame(another) && this.day <= another.day)
		);
	}

	/**
	 * Passed date is either before or the same as current
	 */
	public daySameOrAfter(another: CalendarDay): boolean {
		return (
			this.monthAfter(another) ||
			(this.monthSame(another) && this.day >= another.day)
		);
	}
}
