import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { calendarSheetImports } from './calendar-sheet.imports';
import { WEEK_DAYS_SHORT, TODAY_LABEL } from '../../constans';
import { CalendarDay, CalendarMonth } from '../../models';
import { ButtonType } from '../../../../shared/models';

@Component({
	selector: 'ss-lib-calendar-sheet',
	standalone: true,
	imports: [calendarSheetImports],
	templateUrl: './calendar-sheet.component.html',
	styleUrl: './calendar-sheet.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSheetComponent {
	public month = input<CalendarMonth>(CalendarMonth.currentLocal());
	public value = input<CalendarDay | null>(null);
	public min = input.required<CalendarDay>();
	public max = input.required<CalendarDay>();
	public todaySelected = output<CalendarDay>();
	public dayClick = output<CalendarDay>();

	public readonly CalendarDay = CalendarDay;
	public readonly weekDaysShort = WEEK_DAYS_SHORT;
	public readonly ButtonType = ButtonType;
	public readonly todayLabel = TODAY_LABEL;

	private readonly today = CalendarDay.currentLocal();

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
		this.todaySelected.emit(CalendarDay.currentLocal());
	}
}
