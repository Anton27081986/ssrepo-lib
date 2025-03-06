import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    output,
    Signal,
    signal,
    WritableSignal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FIRST_DAY, LAST_DAY, LAST_DISPLAYED_DAY } from './constans';
import { CalendarDay, CalendarMonth } from './models';
import { CalendarControlsComponent, CalendarSheetComponent, CalendarYearComponent } from './components';
import { ButtonType, ExtraSize, IconPosition, IconType, TextType } from '../../shared/models';


@Component({
    selector: 'ss-lib-calendar',
    standalone: true,
    imports: [
        NgClass,
        CalendarControlsComponent,
        CalendarSheetComponent,
        CalendarYearComponent
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
    public value = input<CalendarDay | null>(null);
    protected readonly dayClick = output<CalendarDay | null>();

    // public readonly min = input<CalendarDay | null>(FIRST_DAY);
    // public readonly max = input<CalendarDay | null>(LAST_DAY);

    public readonly min = input<CalendarDay | null>(new CalendarDay(2024, 11, 15));
    public readonly max = input<CalendarDay | null>(new CalendarDay(2026, 4, 12));

    // public readonly minViewedMonth = input<CalendarMonth | null>(FIRST_DAY);
    // public readonly maxViewedMonth = input<CalendarMonth | null>(LAST_DAY);

    public readonly minViewedMonth = input<CalendarMonth | null>(new CalendarMonth(2020, 5));
    public readonly maxViewedMonth = input<CalendarMonth | null>(new CalendarMonth(2030, 10));

    public isMonthView = signal<boolean>(true);
    private day: WritableSignal<CalendarDay | null> = signal<CalendarDay | null>(null);
    private month: WritableSignal<CalendarMonth | CalendarDay> = signal<CalendarMonth>(CalendarMonth.currentLocal());

    public readonly ButtonType = ButtonType;
    public readonly IconPosition = IconPosition;
    public readonly IconType = IconType;
    public readonly ExtraSize = ExtraSize;
    public readonly TextType = TextType;

    constructor() {
        effect(() => {
            this.day.set(this.value());

            if (
                this.value() instanceof CalendarDay &&
                this.value()!.daySameOrBefore(LAST_DISPLAYED_DAY)
            ) {
                this.month.set(this.value()!);
            }
        });
    }

    public get currentMonth(): Signal<CalendarMonth | CalendarDay> {
        return this.month.asReadonly();
    }

    public get currentValue(): Signal<CalendarDay | null> {
        return this.day.asReadonly();
    }

    protected get computedMin(): CalendarDay {
        return this.min() ?? FIRST_DAY;
    }

    protected get computedMax(): CalendarDay {
        return this.max() ?? LAST_DAY;
    }

    protected get computedMinViewedMonth(): CalendarMonth {
        debugger
        const min = this.computedMin;
        const minViewed = this.minViewedMonth() ?? FIRST_DAY;

        return minViewed.monthSameOrBefore(min) ? minViewed : min;
    }

    protected get computedMaxViewedMonth(): CalendarMonth {
        debugger
        const max = this.computedMax;
        const maxViewed = this.maxViewedMonth() ?? LAST_DAY;

        return maxViewed.monthSameOrAfter(max) ? maxViewed : max;
    }

    public onDayClick(day: CalendarDay): void {
        this.dayClick.emit(day);
    }

    public onPaginationMonthChange(month: CalendarMonth): void {
        this.updateViewedMonth(month);
    }

    private updateViewedMonth(month: CalendarMonth): void {
        if (this.month().monthSame(month)) {
            return;
        }

        this.month.set(month);
    }
}
