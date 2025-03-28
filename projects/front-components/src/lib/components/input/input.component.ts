import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	forwardRef,
	input,
	signal,
	viewChild,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import {
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { MaskitoDirective } from '@maskito/angular';
import {
	maskitoDateOptionsGenerator,
	maskitoNumberOptionsGenerator,
	maskitoTimeOptionsGenerator,
} from '@maskito/kit';
import { Align, InputType } from '../../shared/models';

/**
 * Компонент поля ввода.
 *
 * Предоставляет универсальное поле ввода с поддержкой различных типов,
 * масок, валидации и интеграции с Angular Forms. Реализует ControlValueAccessor
 * для работы с формами.
 *
 * @example
 * ```html
 * <ss-lib-input
 *   [type]="InputType.Text"
 *   [placeholder]="'Введите текст'"
 *   [readOnly]="false"
 *   [align]="Align.Start"
 *   [(ngModel)]="value"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-input',
	standalone: true,
	imports: [ReactiveFormsModule, MaskitoDirective],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
})
export class InputComponent implements ControlValueAccessor {
	/**
	 * Ссылка на DOM-элемент поля ввода.
	 *
	 * @description
	 * Используется для программного управления
	 * фокусом поля ввода.
	 */
	private readonly inputField = viewChild('inputField', {
		read: ElementRef<HTMLInputElement>,
	});

	/**
	 * Тип поля ввода.
	 *
	 * @default InputType.Text
	 * @description
	 * Определяет тип и поведение поля ввода.
	 * Поддерживает различные типы: текст, число,
	 * дата, время и другие.
	 */
	public readonly type = input<InputType>(InputType.Text);

	/**
	 * Текст подсказки.
	 *
	 * @default ''
	 * @description
	 * Отображается, когда поле ввода пусто.
	 */
	public readonly placeholder = input<string>('');

	/**
	 * Флаг режима только для чтения.
	 *
	 * @default false
	 * @description
	 * Определяет, доступно ли поле для редактирования.
	 */
	public readonly readOnly = input<boolean>(false);

	/**
	 * Выравнивание текста.
	 *
	 * @default Align.Start
	 * @description
	 * Определяет выравнивание текста в поле ввода.
	 */
	public readonly align = input<Align>(Align.Start);

	/**
	 * Минимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Минимально допустимое значение для числовых
	 * полей или дат.
	 */
	public readonly min = input<unknown | undefined>(undefined);

	/**
	 * Максимальное значение.
	 *
	 * @default undefined
	 * @description
	 * Максимально допустимое значение для числовых
	 * полей или дат.
	 */
	public readonly max = input<unknown | undefined>(undefined);

	/**
	 * Форм-контрол для управления значением.
	 *
	 * @description
	 * Используется для управления состоянием поля
	 * и интеграции с Angular Forms.
	 */
	public readonly inputCtrl = new FormControl();

	/**
	 * Флаг отключения поля.
	 *
	 * @description
	 * Определяет, доступно ли поле для взаимодействия.
	 */
	public readonly disabled = signal<boolean>(false);

	/**
	 * Маска ввода.
	 *
	 * @description
	 * Вычисляемое свойство, определяющее маску ввода
	 * в зависимости от типа поля.
	 */
	public readonly inputMask = computed(() => {
		switch (this.type()) {
			case InputType.Number:
				return maskitoNumberOptionsGenerator({
					min: this.min() as number,
					max: this.max() as number,
					precision: 2,
					decimalSeparator: ',',
					thousandSeparator: '',
				});

			case InputType.Date:
				return maskitoDateOptionsGenerator({
					mode: 'dd/mm/yyyy',
					separator: '/',
					min: this.min() as Date,
					max: this.max() as Date,
				});

			case InputType.Time:
				return maskitoTimeOptionsGenerator({
					mode: 'HH:MM',
				});

			default:
				return null;
		}
	});

	/**
	 * Callback для обновления значения.
	 */
	private onChange!: (value: string | null) => void;

	/**
	 * Callback для обработки события касания.
	 */
	private onTouched!: () => void;

	/**
	 * Создает экземпляр компонента.
	 *
	 * @description
	 * Инициализирует компонент и настраивает
	 * обработку изменений значения с debounce.
	 */
	constructor() {
		toSignal(
			this.inputCtrl.valueChanges.pipe(
				debounceTime(300),
				tap((value) => this.onChange(value)),
			),
		);
	}

	/**
	 * Записывает значение в компонент.
	 *
	 * @param value - Значение для установки
	 */
	public writeValue(value: string | null): void {
		this.inputCtrl.setValue(value, { emitEvent: false });
	}

	/**
	 * Регистрирует callback для обновления значения.
	 *
	 * @param fn - Функция обратного вызова
	 */
	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	/**
	 * Регистрирует callback для обработки касания.
	 *
	 * @param fn - Функция обратного вызова
	 */
	public registerOnTouched(fn: () => string): void {
		this.onTouched = fn;
	}

	/**
	 * Устанавливает состояние disabled.
	 *
	 * @param isDisabled - Флаг отключения
	 */
	public setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);

		isDisabled
			? this.inputCtrl.disable()
			: this.inputCtrl.enable({ emitEvent: false });
	}

	/**
	 * Обновляет состояние поля при потере фокуса.
	 *
	 * @param event - Событие потери фокуса
	 */
	public updateInputStateOnFocusout(event: FocusEvent): void {
		const relatedTarget = event.relatedTarget as HTMLElement;

		if (
			relatedTarget &&
			event.currentTarget &&
			(event.currentTarget as HTMLElement).contains(relatedTarget)
		) {
			return;
		}
	}

	/**
	 * Устанавливает фокус на поле ввода.
	 *
	 * @description
	 * Программно устанавливает фокус на поле ввода.
	 */
	public setFocus(): void {
		this.inputField()?.nativeElement.focus();
	}
}
