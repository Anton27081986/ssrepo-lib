import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	input,
	output,
	signal,
	viewChildren,
} from '@angular/core';
import { calendarYearImports } from './calendar-year.imports';
import { LIMIT_YEARS, MONTHS_SHORT, MIN_YEAR } from '../../constans';
import { CalendarMonth } from '../../models';
import { ScrollbarComponent } from '../../../scrollbar/scrollbar.component';

@Component({
	selector: 'ss-lib-calendar-year',
	standalone: true,
	imports: [calendarYearImports, ScrollbarComponent],
	templateUrl: './calendar-year.component.html',
	styleUrl: './calendar-year.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarYearComponent {
	public month = input<CalendarMonth>(CalendarMonth.currentLocal());
	public monthClick = output<CalendarMonth>();

	public readonly rows = signal(LIMIT_YEARS * 2 + 1);
	public readonly monthsShort = MONTHS_SHORT;

	private readonly yearRows = viewChildren('yearRow', {
		read: ElementRef,
	});

	private readonly monthToday = signal(CalendarMonth.currentLocal());

	constructor() {
		afterNextRender(() => {
			this.scrollToYear(this.month().year);
		});
	}

	public getYear(rowIndex: number): number {
		return rowIndex + MIN_YEAR;
	}

	public getMonth(month: number, year: number): CalendarMonth {
		return new CalendarMonth(year, month);
	}

	public itemIsToday(item: CalendarMonth): boolean {
		return this.monthToday().monthSame(item);
	}

	public onItemClick(item: CalendarMonth): void {
		this.monthClick.emit(item);
	}

	private scrollToYear(targetYear: number): void {
		const targetIndex = targetYear - MIN_YEAR - 1;

		if (targetIndex >= 0 && this.yearRows()[targetIndex]) {
			this.yearRows()[targetIndex].nativeElement.scrollIntoView({
				behavior: 'instant',
				block: 'start',
			});
		}
	}
}
