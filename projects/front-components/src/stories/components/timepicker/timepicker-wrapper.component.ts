import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TimepickerComponent } from '../../../lib/components/timepicker/timepicker.component';

@Component({
	selector: 'ss-lib-timepicker-wrapper',
	standalone: true,
	imports: [TimepickerComponent, ReactiveFormsModule],
	template: `
		<ss-lib-timepicker
			[formControl]="control"
			[disabled]="disabled()"
		></ss-lib-timepicker>
	`,
})
export class TimepickerWrapperComponent {
	control = new FormControl<string | null>(null);
	disabled = input<boolean>(false);
}
