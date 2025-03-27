import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../lib/components/input/input.component';
import { InputType, Align } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-input-wrapper',
	standalone: true,
	imports: [InputComponent, ReactiveFormsModule],
	template: `
		<ss-lib-input
			[formControl]="control"
			[type]="type()"
			[placeholder]="placeholder()"
			[readOnly]="readOnly()"
			[align]="align()"
			[min]="min()"
			[max]="max()"
		></ss-lib-input>
	`,
})
export class InputWrapperComponent {
	control = new FormControl<string | null>(null);
	type = input<InputType>(InputType.Text);
	placeholder = input<string>('');
	readOnly = input<boolean>(false);
	align = input<Align>(Align.Start);
	min = input<unknown | undefined>(undefined);
	max = input<unknown | undefined>(undefined);
}
