import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    input,
    output,
    viewChildren
} from '@angular/core';
import { FIRST_DAY, LAST_DAY, MAX_YEAR, MIN_YEAR, MONTHS_SHORT } from '../../constans';
import { CalendarMonth } from '../../models';
import { RepeatTimesPipe } from '../../../../core/pipes';
import { CalendarCellComponent } from '../calendar-cell/calendar-cell.component';

@Component({
    selector: 'ss-lib-calendar-year',
    imports: [
        CalendarCellComponent,
        RepeatTimesPipe,
    ],
    templateUrl: './calendar-year.component.html',
    styleUrl: './calendar-year.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarYearComponent {
    private readonly yearRows = viewChildren('yearRow', {
        read: ElementRef
    });
    private readonly monthToday = CalendarMonth.currentLocal();

    public readonly month = input<CalendarMonth>(CalendarMonth.currentLocal());
    public readonly limit = input<number>(10);
    public readonly min = input<CalendarMonth | null>(FIRST_DAY);
    public readonly max = input<CalendarMonth | null>(LAST_DAY);
    protected readonly monthClick = output<CalendarMonth>();

    public readonly MONTHS_SHORT = MONTHS_SHORT;

    constructor() {
        afterNextRender(() => {
            this.scrollToYear(this.month().year);
        });
    }

    public get rows(): number {
        return Math.ceil((this.calculatedMaxYear - this.calculatedMinYear));
    }

    private get calculatedMinYear(): number {
        const initial = this.month().year - this.limit();
        const min = this.min()!.year ?? MIN_YEAR;

        return min > initial ? min : initial;
    }

    private get calculatedMaxYear(): number {
        const initial = this.month().year + this.limit();
        const max = this.max()!.year ?? MAX_YEAR;

        return max < initial ? max + 1 : initial;
    }

    protected getYear(rowIndex: number): number {
        return rowIndex + this.calculatedMinYear;
    }

    protected getMonth(month: number, year: number): CalendarMonth {
        return new CalendarMonth(year, month);
    }

    protected itemIsToday(item: CalendarMonth): boolean {
        return this.monthToday.monthSame(item)
    }

    public isDisabledYear(year: number): boolean {
        return (this.max()!.year < year) || (this.min()!.year > year);
    }

    public isDisabledMonth(month: CalendarMonth): boolean {
        return month.monthSameOrAfter(this.max()!) || month.monthSameOrBefore(this.min()!);
    }

    public onItemClick(item: CalendarMonth): void {
        this.monthClick.emit(item);
    }

    private scrollToYear(targetYear: number): void {
        const targetIndex = targetYear - this.calculatedMinYear - 1;

        if (targetIndex >= 0 && this.yearRows()[targetIndex]) {
            this.yearRows()[targetIndex].nativeElement.scrollIntoView({
                behavior: 'instant',
                block: 'start'
            });
        }
    }
}
