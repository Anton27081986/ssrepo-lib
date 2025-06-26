import {
	ChangeDetectionStrategy,
	Component,
	input,
	InputSignal,
	model,
	ModelSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { FieldCtrlDirective } from '../../core/directives';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DropdownFilterItemComponent } from '../dropdown-filter-item/dropdown-filter-item.component';
import { TextComponent } from '../text/text.component';
import { Align, Colors, IconType, IDictionaryItemDto, TextType, TextWeight } from '../../shared/models';

@Component({
	selector: 'ss-lib-checkbox-filter-context',
	standalone: true,
	imports: [
		FormFieldComponent,
		InputComponent,
		FieldCtrlDirective,
		SpinnerComponent,
		NgIf,
		DropdownFilterItemComponent,
		NgFor,
		TextComponent,
		AsyncPipe,
		ReactiveFormsModule,
	],
	templateUrl: './checkbox-filter-context.component.html',
	styleUrl: './checkbox-filter-context.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [],
})
export class CheckboxFilterContextComponent {
	public controlsMap: InputSignal<{
		[id: number]: FormControl<boolean | null>;
	}> = input.required();

	public items: InputSignal<IDictionaryItemDto[]> = input.required();
	public isLoader: InputSignal<boolean> = input.required();
	public controlClearAll: InputSignal<FormControl<boolean | null>> =
		input.required();

	public queryControl: InputSignal<FormControl<string | null>> =
		input.required();

	public indeterminate: ModelSignal<boolean> = model(false);
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Align = Align;

	protected get trueCheckControlMap(): boolean {
		return (
			Object.values(this.controlsMap()).some(
				(control) => control.value === true,
			) && this.indeterminate()
		);
	}
}
