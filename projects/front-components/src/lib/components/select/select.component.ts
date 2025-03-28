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
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import type { IDictionaryItemDto } from '../../shared/models';

/**
 * Компонент выпадающего списка.
 *
 * Реализует ControlValueAccessor для интеграции с Angular Forms.
 * Поддерживает работу как со строковыми значениями, так и с объектами,
 * реализующими интерфейс IDictionaryItemDto.
 *
 * @example
 * ```html
 * <ss-lib-select
 *   [placeholder]="'Выберите значение'"
 *   [(ngModel)]="selectedValue"
 * />
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
	/**
	 * Текст подсказки в поле ввода.
	 *
	 * @default 'Выберите из списка'
	 * @description
	 * Отображается, когда значение не выбрано.
	 */
	public readonly placeholder = input<string>('Выберите из списка');

	/**
	 * Форм-контрол для управления значением.
	 *
	 * @description
	 * Используется для управления состоянием поля ввода
	 * и интеграции с Angular Forms.
	 */
	public readonly selectCtrl = new FormControl<string | null>(null);

	/**
	 * Ссылка на компонент выпадающего списка.
	 *
	 * @description
	 * Используется для взаимодействия с компонентом списка
	 * и получения выбранных значений.
	 */
	private readonly dropdownList = contentChild.required(
		DropdownListComponent<T>,
	);

	/**
	 * Callback для обновления значения.
	 */
	private onChange!: (value: T | string | null) => void;

	/**
	 * Callback для обработки события касания.
	 */
	private onTouched!: () => void;

	/**
	 * Создает экземпляр компонента.
	 *
	 * @param ngControl - Контрол формы, если компонент используется в форме
	 * @param formField - Родительский компонент поля формы
	 * @param injector - Инжектор для создания контекста
	 */
	constructor(
		@Optional()
		@Self()
		@Inject(NgControl)
		public readonly ngControl: NgControl,
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

	/**
	 * Записывает значение в компонент.
	 *
	 * @param value - Значение для установки
	 * @description
	 * Преобразует значение в строку для отображения
	 * и устанавливает его в форм-контрол.
	 */
	public writeValue(value: T | string): void {
		const displayValue =
			typeof value === 'string' ? value : value?.name || '';

		this.selectCtrl.setValue(displayValue, { emitEvent: false });
	}

	/**
	 * Регистрирует callback для обновления значения.
	 *
	 * @param fn - Функция обратного вызова
	 */
	public registerOnChange(fn: (value: T | string | null) => void): void {
		this.onChange = fn;
	}

	/**
	 * Регистрирует callback для обработки касания.
	 *
	 * @param fn - Функция обратного вызова
	 */
	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 * Устанавливает состояние disabled.
	 *
	 * @param isDisabled - Флаг отключения
	 */
	public setDisabledState?(isDisabled: boolean): void {
		isDisabled ? this.selectCtrl.disable() : this.selectCtrl.enable();
	}

	/**
	 * Обрабатывает выбор значения из списка.
	 *
	 * @param item - Выбранное значение
	 * @description
	 * Обновляет отображаемое значение и вызывает
	 * соответствующие callbacks.
	 */
	public onSelectOption(item: T | string | null): void {
		if (item !== null) {
			const displayValue = typeof item === 'string' ? item : item.name;

			this.selectCtrl.setValue(displayValue, { emitEvent: false });
			this.updateValue(item);
		}
	}

	/**
	 * Обновляет значение компонента.
	 *
	 * @param item - Новое значение
	 * @private
	 */
	private updateValue(item: T | string | null): void {
		this.onChange(item);
		this.onTouched();
	}
}
