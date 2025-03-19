import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { FieldCtrlDirective } from '../../core/directives';
import { FormFieldComponent } from '../form-field/form-field.component';

export const dateTimePickerImports = [
	DatepickerComponent,
	TimepickerComponent,
	ReactiveFormsModule,
	FieldCtrlDirective,
	FormFieldComponent,
];
