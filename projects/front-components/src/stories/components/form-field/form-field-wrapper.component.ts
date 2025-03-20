import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../lib/components/form-field/form-field.component';
import { InputComponent } from '../../../lib/components/input/input.component';

@Component({
	selector: 'ss-lib-form-field-wrapper',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, InputComponent],
	template: `
		<ss-lib-form-field
			[label]="label()"
			[hint]="hint()"
			[showValidation]="showValidation()"
			[showValidationFieldIcon]="showValidationFieldIcon()"
			[errorText]="errorText()"
		>
			<ss-lib-input
				[formControl]="control"
				[placeholder]="'Введите значение'"
			></ss-lib-input>
		</ss-lib-form-field>
	`,
})
export class FormFieldWrapperComponent {
	control = new FormControl('', { validators: [] });
	label = input<string>('');
	hint = input<string>('');
	showValidation = input<boolean>(true);
	showValidationFieldIcon = input<boolean>(false);
	errorText = input<string>('');
}
