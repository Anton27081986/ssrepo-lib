import { Injector } from '@angular/core';
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
	inject,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { DropdownListComponent } from '../dropdown';
import type { IDictionaryItemDto } from '../../shared/models';

/**
 * Компонент выпадающего списка с поддержкой строковых значений и объектов
 *
 * @example
 * ```html
 * Параметры:
 *
 * [placeholder]: string - Текст подсказки - необязательный, по умолчанию: 'Выберите из списка'
 *
 * [(ngModel)]: T | string - Значение выбранного элемента - обязательный
 *
 * [formControl]: FormControl<T | string | null> - Контрол формы - обязательный
 *
 * [disabled]: boolean - Блокировка компонента - необязательный, по умолчанию: false
 *
 * <ss-lib-select
 *   [placeholder]="'Выберите значение'"
 *   [(ngModel)]="selectedValue"
 * >
 *   <ss-lib-dropdown-list [items]="items"></ss-lib-dropdown-list>
 * </ss-lib-select>
 *
 * <ss-lib-select
 *   [formControl]="selectControl"
 *   [disabled]="false"
 * >
 *   <ss-lib-dropdown-list [items]="items"></ss-lib-dropdown-list>
 * </ss-lib-select>
 * ```
 *
 * @param T - Тип элемента списка, должен реализовывать IDictionaryItemDto
 */
@Component({
	selector: 'ss-lib-select',
	standalone: true,
	imports: [InputComponent, ReactiveFormsModule],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T extends IDictionaryItemDto = IDictionaryItemDto>
	implements ControlValueAccessor
{
	public readonly placeholder = input<string>('Выберите из списка');
	public readonly selectCtrl = new FormControl<string | null>(null);
	private readonly dropdownList = contentChild.required(
		DropdownListComponent<T>,
	);

	private onChange:
		| ((value: T | string | null | IDictionaryItemDto) => void)
		| undefined;

	private onTouched: (() => void) | undefined;

	constructor(
		@Optional()
		@Self()
		@Inject(NgControl)
		public ngControl: NgControl,
		@Optional() public formField: FormFieldComponent,
		private readonly injector: Injector = inject(Injector),
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

	public writeValue(value: T | string): void {
		const displayValue =
			typeof value === 'string' ? value : value?.name || '';

		this.selectCtrl.setValue(displayValue, { emitEvent: false });
	}

	public registerOnChange(
		fn: (value: T | string | null | IDictionaryItemDto) => void,
	): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		isDisabled ? this.selectCtrl.disable() : this.selectCtrl.enable();
	}

	public onSelectOption(item: T | string | null | IDictionaryItemDto): void {
		if (item !== null) {
			const displayValue = typeof item === 'string' ? item : item.name;

			this.selectCtrl.setValue(displayValue, { emitEvent: false });
			this.updateValue(item);
		}
	}

	private updateValue(item: T | string | null | IDictionaryItemDto): void {
		this.onChange?.(item);
		this.onTouched?.();
	}
}
