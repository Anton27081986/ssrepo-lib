import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { FieldCtrlDirective } from '../../core/directives';
import { MapperPipe, RepeatTimesPipe } from '../../core/pipes';
import { TextComponent } from '../text/text.component';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from '../buttons';

export const otpInputImports = [
	ReactiveFormsModule,
	FormFieldComponent,
	InputComponent,
	FieldCtrlDirective,
	RepeatTimesPipe,
	TextComponent,
	IconComponent,
	LinkComponent,
	MapperPipe,
];
