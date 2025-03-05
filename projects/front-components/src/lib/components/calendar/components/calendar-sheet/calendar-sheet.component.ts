import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FIRST_DAY, LAST_DAY, WEEK_DAYS_SHORT } from '../../constans';
import { CalendarDay, CalendarMonth } from '../../models';
import { CalendarSheetPipe } from '../../pipes';
import { MapperPipe, RepeatTimesPipe } from '../../../../core/pipes';
import { ButtonComponent } from '../../../buttons';
import { ButtonType } from '../../../../shared/models';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';

@Component({
    selector: 'ss-lib-calendar-sheet',
    standalone: true,
    imports: [
        CalendarSheetPipe,
        RepeatTimesPipe,
        MapperPipe,
        ButtonComponent,
        CalendarCellComponent,
    ],
    templateUrl: './calendar-sheet.component.html',
    styleUrl: './calendar-sheet.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSheetComponent {
    private readonly today = CalendarDay.currentLocal();

    public month = input<CalendarMonth>(CalendarMonth.currentLocal());
    public value = input<CalendarDay | null>(null);
    public readonly min = input<CalendarDay | null>(FIRST_DAY);
    public readonly max = input<CalendarDay | null>(LAST_DAY);
    protected readonly dayClick = output<CalendarDay>();

    public readonly WEEK_DAYS_SHORT = WEEK_DAYS_SHORT;
    protected readonly ButtonType = ButtonType;

    protected onItemClick(day: CalendarDay): void {
        this.dayClick.emit(day);
    }

    protected itemIsToday(item: CalendarDay): boolean {
        return this.today.daySame(item);
    }

    protected dayTypeHandler(item: CalendarDay): 'weekend' | 'weekday' {
        return item.isWeekend ? 'weekend' : 'weekday';
    }

    protected itemIsActive(item: CalendarDay): boolean {
        if (!this.value()) {
            return false;
        }

        return this.value()!.daySame(item);
    }

    protected itemIsUnavailable(item: CalendarDay): boolean {
        return !this.month().monthSame(item);
    }

    protected itemIsDisabled(item: CalendarDay): boolean {
        return item.dayBefore(this.min()!) || item.dayAfter(this.max()!);
    }

    protected setToday(): void {
        this.dayClick.emit(CalendarDay.currentLocal());
    }
}
