import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import type { CalendarDay, CalendarMonth } from '../../models';

@Component({
	selector: 'ss-lib-calendar-cell',
	standalone: true,
	template: `
		<div
			tabindex="0"
			class="calendar-cell"
			[attr.data-type]="type()"
			[class.calendar-cell_today]="isToday()"
			[class.calendar-cell_active]="isActive()"
			[class.calendar-cell_unavailable]="isUnavailable()"
			[class.calendar-cell_disabled]="isDisabled()"
			(click)="clickItem.emit(item())">
			{{ displayValue() }}
		</div>
	`,
	styleUrl: './calendar-cell.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCellComponent {
	public displayValue = input.required<string | number>();
	public item = input.required<CalendarDay | CalendarMonth>();
	public type = input<'weekend' | 'weekday' | 'default'>('default');
	public isToday = input.required<boolean>();
	public isActive = input<boolean>(false);
	public isUnavailable = input<boolean>(false);
	public isDisabled = input<boolean>(false);

	public clickItem = output<CalendarDay | CalendarMonth>();
}
