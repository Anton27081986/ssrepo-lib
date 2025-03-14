import { ReactiveFormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';
import { DatepickerCalendarComponent } from './datepicker-calendar/datepicker-calendar.component';
import { InputComponent } from '../input/input.component';
import { PopoverTriggerForDirective } from '../../core/directives';

export const datepickerImports = [
	ReactiveFormsModule,
	MaskitoDirective,
	InputComponent,
	PopoverTriggerForDirective,
	DatepickerCalendarComponent,
];
