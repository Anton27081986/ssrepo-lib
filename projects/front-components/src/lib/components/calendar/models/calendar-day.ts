import { CalendarMonth } from './calendar-month';
import { DAY_OF_WEEK } from '../constans';

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
     * Creates {@link TuiDay} from native {@link Date} based on local time zone
     */
    public static fromLocalNativeDate(date: Date): CalendarDay {
        return new CalendarDay(date.getFullYear(), date.getMonth(), date.getDate());
    }


    /**
     * Returns native {@link Date} based on local time zone
     */
    public override toLocalNativeDate(): Date {
        return new Date(this.year, this.month, this.day);
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

    public get isWeekend(): boolean {
        const dayOfWeek = this.dayOfWeek(false);

        return dayOfWeek === DAY_OF_WEEK.Saturday || dayOfWeek === DAY_OF_WEEK.Sunday;
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