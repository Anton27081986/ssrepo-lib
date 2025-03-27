import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	DatepickerComponent,
	FormFieldComponent,
} from '../../../lib/components';
import { FieldCtrlDirective } from '../../../lib/core/directives';
import {
	FIRST_NATIVE_DAY,
	LAST_NATIVE_DAY,
} from '../../../lib/components/calendar/constans';

@Component({
	selector: 'ss-lib-datepicker-wrapper',
	standalone: true,
	imports: [
		DatepickerComponent,
		ReactiveFormsModule,
		FormFieldComponent,
		FieldCtrlDirective,
	],
	template: `
		<ss-lib-form-field
			[label]="'Datepicker'"
			[hint]="'Подсказка'"
			[errorText]="'Неверно заполнено'"
			[showValidationFieldIcon]="true"
		>
			<ss-lib-datepicker
				fieldCtrl
				[formControl]="datepickerCtrl"
				[min]="min()"
				[max]="max()"
			></ss-lib-datepicker>
		</ss-lib-form-field>
	`,
})
export class DatepickerWrapperComponent {
	public datepickerCtrl = new FormControl<Date | null>(null);
	public min = input<Date>(FIRST_NATIVE_DAY);
	public max = input<Date>(LAST_NATIVE_DAY);
}
