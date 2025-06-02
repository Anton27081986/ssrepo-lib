import { Component } from '@angular/core';
import {
	DropdownItemComponent,
	FormFieldComponent,
	InputComponent,
} from '../../../../front-components/src/lib/components';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldCtrlDirective } from '../../../../front-components/src/lib/core/directives';

@Component({
	selector: 'app-example-filter-1',
	standalone: true,
	imports: [
		InputComponent,
		ReactiveFormsModule,
		FormFieldComponent,
		FieldCtrlDirective,
		DropdownItemComponent,
	],
	providers: [],
	templateUrl: 'example-filter-1.component.html',
})
export class ExampleFilter1Component {
	public controlQuery: FormControl<null | string> = new FormControl('');
}
