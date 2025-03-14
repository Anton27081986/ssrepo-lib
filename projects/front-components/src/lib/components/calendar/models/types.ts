/**
 * Optionally has year and/or month and/or day
 */
export interface CalendarDayLike extends CalendarMonthLike {
	readonly day?: number;
}

/**
 * Optionally has year and/or month
 */
export interface CalendarMonthLike extends CalendarYearLike {
	readonly month?: number;
}

/**
 * Optionally has year
 */
export interface CalendarYearLike {
	readonly year?: number;
}
