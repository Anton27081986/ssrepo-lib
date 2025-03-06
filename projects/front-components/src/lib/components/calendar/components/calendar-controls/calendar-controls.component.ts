import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { CalendarMonth, CalendarMonthLike, CalendarYearLike } from '../../models';
import { ButtonComponent } from '../../../buttons';
import { ButtonType, ExtraSize, IconPosition, IconType } from '../../../../shared/models';
import { FIRST_DAY, LAST_DAY } from '../../constans';

@Component({
    selector: 'ss-lib-calendar-controls',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './calendar-controls.component.html',
    styleUrl: './calendar-controls.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarControlsComponent {
    public isMonthView = model<boolean>(true);
    public value = input<CalendarMonth>(CalendarMonth.currentLocal());
    protected readonly valueChange = output<CalendarMonth>();

    protected readonly ButtonType = ButtonType;
    protected readonly ExtraSize = ExtraSize;
    protected readonly IconType = IconType;
    protected readonly IconPosition = IconPosition;
    protected readonly LAST_DAY = LAST_DAY;
    protected readonly FIRST_DAY = FIRST_DAY;

    protected switchYearIcon = computed(() => {
        return this.isMonthView() ? IconType.ChevronDown : IconType.ChevronUp;
    })

    protected append(date: CalendarMonthLike | CalendarYearLike): void {
        const value = this.value().append(date);

        this.updateMonthValue(value);
        this.isMonthView.set(true);
    }

    protected switchView(): void {
        this.isMonthView.set(!this.isMonthView());
    }

    private updateMonthValue(value: CalendarMonth): void {
        if (this.value().monthSame(value)) {
            return;
        }

        this.valueChange.emit(value);
    }
}
