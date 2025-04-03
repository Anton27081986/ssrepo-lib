import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	model,
	output,
} from '@angular/core';
import { calendarControlsImports } from './calendar-controls.imports';
import type { CalendarMonthLike, CalendarYearLike } from '../../models';
import { CalendarMonth } from '../../models';
import {
	ButtonType,
	ExtraSize,
	Extremum,
	IconPosition,
	IconType,
} from '../../../../shared/models';
import { FIRST_DAY, LAST_DAY } from '../../../../shared/constants';

@Component({
	selector: 'ss-lib-calendar-controls',
	standalone: true,
	imports: [calendarControlsImports],
	templateUrl: './calendar-controls.component.html',
	styleUrl: './calendar-controls.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarControlsComponent {
	public isMonthView = model<boolean>(true);
	public value = input<CalendarMonth>(CalendarMonth.currentLocal());
	public valueChange = output<CalendarMonth>();

	public readonly ButtonType = ButtonType;
	public readonly ExtraSize = ExtraSize;
	public readonly IconType = IconType;
	public readonly IconPosition = IconPosition;
	public readonly Extremum = Extremum;

	public switchYearIcon = computed(() => {
		return this.isMonthView() ? IconType.ChevronDown : IconType.ChevronUp;
	});

	public append(date: CalendarMonthLike | CalendarYearLike): void {
		const value = this.value().append(date);

		this.updateMonthValue(value);
		this.isMonthView.set(true);
	}

	public isMonthDisabled(value: CalendarMonth, extremum: Extremum): boolean {
		return extremum === Extremum.Min
			? value.monthSameOrBefore(FIRST_DAY)
			: value.monthSameOrAfter(LAST_DAY);
	}

	public isYearDisabled(value: CalendarMonth, extremum: Extremum): boolean {
		return extremum === Extremum.Min
			? value.yearSameOrBefore(FIRST_DAY)
			: value.yearSameOrAfter(LAST_DAY);
	}

	public switchView(): void {
		this.isMonthView.set(!this.isMonthView());
	}

	private updateMonthValue(value: CalendarMonth): void {
		if (this.value().monthSame(value)) {
			return;
		}

		this.valueChange.emit(value);
	}
}
