import type { Injector } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	contentChild,
	Inject,
	input,
	Optional,
	runInInjectionContext,
	afterNextRender,
	Self,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import type { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import type { IDictionaryItemDto } from '../../shared/models';

/**
 * Параметры:
 *
 * [placeholder]: string - Placeholder. Обязательное поле.
 * По умолчанию: `Выберите из списка`.
 */
@Component({
	selector: 'ss-lib-select',
	standalone: true,
	imports: [InputComponent, ReactiveFormsModule],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
	private readonly dropdownList = contentChild.required(
		DropdownListComponent,
	);

	public placeholder = input<string>('Выберите из списка');

	public selectCtrl = new FormControl<string | null>(null);

	constructor(
		@Optional() @Self() @Inject(NgControl) public ngControl: NgControl,
		@Optional() public readonly formField: FormFieldComponent,
		private readonly injector: Injector,
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}

		afterNextRender(() => {
			runInInjectionContext(this.injector, () => {
				toSignal(
					outputToObservable(this.dropdownList().value).pipe(
						tap((data) => this.onSelectOption(data)),
					),
				);
			});
		});
	}

	private onChange!: (value: IDictionaryItemDto | null) => void;
	private onTouched!: () => void;

	public writeValue(value: IDictionaryItemDto): void {
		this.selectCtrl.setValue(value?.name || '', { emitEvent: false });
	}

	public registerOnChange(
		fn: (value: IDictionaryItemDto | null) => void,
	): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => IDictionaryItemDto): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		isDisabled ? this.selectCtrl.disable() : this.selectCtrl.enable();
	}

	public onSelectOption(item: IDictionaryItemDto | null): void {
		if (item) {
			this.selectCtrl.setValue(item.name, { emitEvent: false });
			this.updateValue(item);
		}
	}

	private updateValue(item: IDictionaryItemDto | null): void {
		this.onChange(item);
		this.onTouched();
	}
}
