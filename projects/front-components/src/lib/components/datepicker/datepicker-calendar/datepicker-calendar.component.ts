import type { TemplateRef } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
	viewChild,
} from '@angular/core';
import type { CalendarDay } from '../../calendar/models';
import { CalendarComponent } from '../../calendar/calendar.component';
import { fromControlValue } from '../../calendar/utils';
import type { PopoverContent } from '../../../shared/models';
import { FIRST_DAY, LAST_DAY } from '../../../shared/constants';

@Component({
	selector: 'ss-lib-datepicker-calendar',
	standalone: true,
	imports: [CalendarComponent],
	templateUrl: './datepicker-calendar.component.html',
	styleUrl: './datepicker-calendar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerCalendarComponent implements PopoverContent {
	public readonly templateRef = viewChild.required<TemplateRef<{}>>(
		'datepickerCalendarTemplate',
	);

	public selectedDate = input<CalendarDay | null>(null);
	public min = input<CalendarDay | null, Date | undefined>(undefined, {
		transform: (value: Date | undefined): CalendarDay | null => {
			return value ? fromControlValue(value) : FIRST_DAY;
		},
	});

	public max = input<CalendarDay | null, Date | undefined>(undefined, {
		transform: (value: Date | undefined): CalendarDay | null => {
			return value ? fromControlValue(value) : LAST_DAY;
		},
	});

	public closed = output<void>();
	public value = output<CalendarDay | null>();

	public onDayClick(day: CalendarDay | null): void {
		this.value.emit(day);
		this.closed.emit();
	}

	public onTodaySelected(day: CalendarDay | null): void {
		this.value.emit(day);
	}
}
