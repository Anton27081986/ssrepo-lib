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
import { FIRST_DAY, LAST_DAY } from './constans';
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
    public min = input<CalendarDay | null, CalendarDay>(new CalendarDay(2023, 4, 1), {
        transform: (value: CalendarDay | null): CalendarDay => {
            return value && value.daySameOrAfter(FIRST_DAY) ? value : FIRST_DAY;
        }
    });
    public max = input<CalendarDay | null, CalendarDay>(new CalendarDay(2027, 4, 1), {
        transform: (value: CalendarDay | null): CalendarDay => {
            return value && value.daySameOrBefore(LAST_DAY) ? value : LAST_DAY;
        }
    });
    protected readonly dayClick = output<CalendarDay | null>();

    public readonly isMonthView = signal<boolean>(true);
    public readonly ButtonType = ButtonType;
    public readonly IconPosition = IconPosition;
    public readonly IconType = IconType;
    public readonly ExtraSize = ExtraSize;
    public readonly TextType = TextType;

    private month: WritableSignal<CalendarMonth | CalendarDay> = signal<CalendarMonth>(CalendarMonth.currentLocal());

    constructor() {
        effect(() => {
            if (
                this.value() instanceof CalendarDay &&
                this.value()!.daySameOrBefore(LAST_DAY)
            ) {
                this.month.set(this.value()!);
            }
        });
    }

    public get currentMonth(): Signal<CalendarMonth | CalendarDay> {
        return this.month.asReadonly();
    }

    public onPickerMonthClick(month: CalendarMonth): void {
        this.isMonthView.set(true);
        this.updateViewedMonth(month);
    }

    public onPaginationMonthChange(month: CalendarMonth): void {
        this.updateViewedMonth(month);
    }

    public onDayClick(day: CalendarDay): void {
        this.dayClick.emit(day);
    }

    private updateViewedMonth(month: CalendarMonth): void {
        if (this.month().monthSame(month)) {
            return;
        }

        this.month.set(month);
    }
}
