import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NumberPickerComponent } from '../../../lib/components/number-picker/number-picker.component';

@Component({
	selector: 'ss-lib-number-picker-wrapper',
	standalone: true,
	imports: [NumberPickerComponent, ReactiveFormsModule],
	template: `
		<ss-lib-number-picker
			[formControl]="control"
			[min]="min()"
			[max]="max()"
			[step]="step()"
		></ss-lib-number-picker>
	`,
})
export class NumberPickerWrapperComponent {
	control = new FormControl<number | null>(null);
	min = input<number | undefined>(undefined);
	max = input<number | undefined>(undefined);
	step = input<number>(1);
}
