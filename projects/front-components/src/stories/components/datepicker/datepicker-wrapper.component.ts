import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../lib/components/datepicker/datepicker.component';

@Component({
	selector: 'ss-lib-datepicker-wrapper',
	standalone: true,
	imports: [DatepickerComponent, ReactiveFormsModule],
	template: `
		<ss-lib-datepicker
			[formControl]="control"
			[min]="min()"
			[max]="max()"
		></ss-lib-datepicker>
	`,
})
export class DatepickerWrapperComponent {
	control = new FormControl<Date | null>(null);
	min = input<Date>(new Date(1900, 0, 1));
	max = input<Date>(new Date(2100, 11, 31));
}
