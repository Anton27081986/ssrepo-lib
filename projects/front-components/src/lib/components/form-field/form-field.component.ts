import type { AfterContentInit } from '@angular/core';
import {
	Component,
	ContentChild,
	inject,
	Injector,
	input,
	runInInjectionContext,
	signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { Validators } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import { FieldCtrlDirective } from '../../core/directives';
import {
	Colors,
	ControlState,
	IconType,
	TextType,
	TextWeight,
} from '../../shared/models';

/**
 * Компонент поля формы.
 *
 * Предоставляет универсальное поле формы с поддержкой
 * валидации, отображения ошибок и подсказок. Интегрируется
 * с Angular Forms для управления состоянием поля.
 *
 * @example
 * ```html
 * <ss-lib-form-field
 *   [label]="'Имя'"
 *   [hint]="'Введите ваше имя'"
 *   [showValidation]="true"
 *   [showValidationFieldIcon]="false"
 *   [errorText]="'Обязательное поле'"
 * >
 *   <input ss-lib-field-ctrl [(ngModel)]="name" />
 * </ss-lib-form-field>
 * ```
 */
@Component({
	selector: 'ss-lib-form-field',
	standalone: true,
	imports: [TextComponent, NgClass, IconComponent],
	templateUrl: './form-field.component.html',
	styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements AfterContentInit {
	/**
	 * Ссылка на директиву управления полем.
	 *
	 * @description
	 * Используется для доступа к контролю формы
	 * и управления его состоянием.
	 */
	@ContentChild(FieldCtrlDirective)
	public fieldCtrl?: FieldCtrlDirective;

	/**
	 * Заголовок поля.
	 *
	 * @default ''
	 * @description
	 * Текст, отображаемый над полем ввода.
	 */
	public readonly label = input<string>('');

	/**
	 * Подсказка для поля.
	 *
	 * @default ''
	 * @description
	 * Текст подсказки, отображаемый под полем.
	 */
	public readonly hint = input<string>('');

	/**
	 * Флаг отображения валидации.
	 *
	 * @default true
	 * @description
	 * Определяет, отображать ли состояние
	 * валидации поля.
	 */
	public readonly showValidation = input<boolean>(true);

	/**
	 * Флаг отображения иконки валидации.
	 *
	 * @default false
	 * @description
	 * Определяет, отображать ли иконку
	 * состояния валидации.
	 */
	public readonly showValidationFieldIcon = input<boolean>(false);

	/**
	 * Текст ошибки.
	 *
	 * @default ''
	 * @description
	 * Текст, отображаемый при ошибке
	 * валидации.
	 */
	public readonly errorText = input<string>('');

	/**
	 * Флаг наличия валидаторов.
	 *
	 * @description
	 * Определяет, есть ли у поля валидаторы.
	 */
	public readonly existValidators = signal<boolean>(false);

	/**
	 * Флаг обязательности поля.
	 *
	 * @description
	 * Определяет, является ли поле
	 * обязательным для заполнения.
	 */
	public readonly isRequired = signal<boolean>(false);

	/**
	 * Состояние контроля поля.
	 *
	 * @description
	 * Текущее состояние валидации
	 * поля.
	 */
	public readonly fieldCtrlState = signal<ControlState>(ControlState.Touched);

	/**
	 * Текущее состояние поля.
	 *
	 * @description
	 * Актуальное состояние поля,
	 * учитывающее фокус.
	 */
	public readonly currentFieldCtrlState = signal<ControlState>(
		ControlState.Touched,
	);

	/**
	 * Константы для типов текста.
	 */
	public readonly TextType = TextType;

	/**
	 * Константы для весов текста.
	 */
	public readonly TextWeight = TextWeight;

	/**
	 * Константы для цветов.
	 */
	public readonly Colors = Colors;

	/**
	 * Константы для типов иконок.
	 */
	public readonly IconType = IconType;

	/**
	 * Инжектор Angular.
	 */
	private readonly injector = inject(Injector);

	/**
	 * Инициализация после инициализации содержимого.
	 *
	 * @description
	 * Настраивает состояние валидации
	 * после инициализации содержимого.
	 */
	public ngAfterContentInit(): void {
		if (this.showValidation()) {
			this.initFieldCtrlState();
		}
	}

	/**
	 * Обновляет состояние поля при потере фокуса.
	 *
	 * @description
	 * Обновляет текущее состояние поля
	 * при потере фокуса.
	 */
	public updateFormFieldStateOnFocusout(): void {
		this.currentFieldCtrlState.set(this.fieldCtrlState());
	}

	/**
	 * Инициализирует состояние контроля поля.
	 *
	 * @description
	 * Настраивает обработчики валидации
	 * и отслеживание состояния поля.
	 * @private
	 */
	private initFieldCtrlState(): void {
		if (this.fieldCtrl?.ngControl.control) {
			this.fieldCtrl!.ngControl.control!.markAllAsTouched = () => {
				const initState =
					this.fieldCtrl!.ngControl.control!.status === 'VALID'
						? ControlState.Valid
						: ControlState.Invalid;

				this.fieldCtrlState.set(initState);
				this.currentFieldCtrlState.set(initState);
			};

			if (
				this.fieldCtrl?.ngControl.control.hasValidator(
					Validators.required,
				)
			) {
				this.isRequired.set(true);
			}

			if (
				this.fieldCtrl?.ngControl.control!.validator ||
				this.fieldCtrl?.ngControl.control!.asyncValidator
			) {
				this.existValidators.set(true);
			}
		}

		runInInjectionContext(this.injector, () => {
			toSignal(
				this.fieldCtrl!.ngControl.control!.statusChanges.pipe(
					filter((_) => this.existValidators()),
					map((status) =>
						status === 'VALID'
							? ControlState.Valid
							: ControlState.Invalid,
					),
					tap((status) => {
						if (this.fieldCtrlState() === ControlState.Invalid) {
							this.currentFieldCtrlState.set(ControlState.Valid);
						}

						this.fieldCtrlState.set(status);
					}),
				),
			);
		});
	}
}
