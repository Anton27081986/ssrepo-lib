import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { WEEK_DAYS_SHORT, TODAY_LABEL } from '../../constans';
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

    public min = input.required<CalendarDay>();
    public max = input.required<CalendarDay>();
    public dayClick = output<CalendarDay>();

    public readonly WEEK_DAYS_SHORT = WEEK_DAYS_SHORT;
    public readonly ButtonType = ButtonType;
    public readonly TODAY_LABEL = TODAY_LABEL;

    public onItemClick(day: CalendarDay): void {
        this.dayClick.emit(day);
    }

    public itemIsToday(item: CalendarDay): boolean {
        return this.today.daySame(item);
    }

    public dayTypeHandler(item: CalendarDay): 'weekend' | 'weekday' {
        return item.isWeekend ? 'weekend' : 'weekday';
    }

    public itemIsActive(item: CalendarDay): boolean {
        if (!this.value()) {
            return false;
        }

        return this.value()!.daySame(item);
    }

    public itemIsUnavailable(item: CalendarDay): boolean {
        return !this.month().monthSame(item);
    }

    public itemIsDisabled(item: CalendarDay): boolean {
        return item.dayBefore(this.min()!) || item.dayAfter(this.max()!);
    }

    public setToday(): void {
        this.dayClick.emit(CalendarDay.currentLocal());
    }
}
