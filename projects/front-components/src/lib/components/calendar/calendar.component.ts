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
import { FIRST_DAY, LAST_DAY } from './constans';
import { CalendarDay, CalendarMonth } from './models';
import { calendarImports } from './calendar.imports';
import { ButtonType, ExtraSize, IconPosition, IconType, TextType } from '../../shared/models';

/**
 * Параметры:
 *
 * [value]: CalendarDay | null - Выбранная дата. По умолчанию: `'null'`
 *
 * [min]: CalendarDay | null - Минимальная дата для выбора. По умолчанию: `FIRST_DAY = (01.01.текущий год - 100)`
 *
 * [max]: CalendarDay | null - Максимальная дата для выбора. По умолчанию: `LAST_DAY = (31.12.текущий год + 100)`
 *
 * (dayClick): CalendarDay | null - Событие выбора даты
 */
@Component({
    selector: 'ss-lib-calendar',
    standalone: true,
    imports: [calendarImports],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
    public value = input<CalendarDay | null>(null);
    public min = input<CalendarDay | null, CalendarDay>(FIRST_DAY, {
        transform: (value: CalendarDay | null): CalendarDay => {
            return value && value.daySameOrAfter(FIRST_DAY) ? value : FIRST_DAY;
        }
    });
    public max = input<CalendarDay | null, CalendarDay>(LAST_DAY, {
        transform: (value: CalendarDay | null): CalendarDay => {
            return value && value.daySameOrBefore(LAST_DAY) ? value : LAST_DAY;
        }
    });
    public dayClick = output<CalendarDay | null>();

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
        if (day && this.value() && day.daySame(this.value()!)) {
            this.dayClick.emit(null);

            return;
        }

        this.dayClick.emit(day);
    }

    private updateViewedMonth(month: CalendarMonth): void {
        if (this.month().monthSame(month)) {
            return;
        }

        this.month.set(month);
    }
}
