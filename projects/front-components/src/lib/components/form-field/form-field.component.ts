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
import { NgClass, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { Validators } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import { FieldCtrlDirective } from '../../core/directives';
import {
	Colors,
	ControlState,
	HintType,
	IconType,
	TextType,
	TextWeight,
} from '../../shared/models';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import { HintComponent } from '../help-hint/hint.component';

/**
 * Компонент поля формы с поддержкой валидации, состояний и отображения ошибок
 *
 * @example
 * ```html
 * Параметры:
 *
 * [label]: string - Заголовок поля - необязательный, по умолчанию: ''
 *
 * [hint]: string - Подсказка для поля - необязательный, по умолчанию: ''
 *
 * [showValidation]: boolean - Флаг отображения валидации - необязательный,
 * по умолчанию: true
 *
 * [showValidationFieldIcon]: boolean - Флаг отображения иконки валидации -
 * необязательный, по умолчанию: false
 *
 * [errorText]: string - Текст ошибки - необязательный, по умолчанию: ''
 *
 * Директивы:
 * ss-lib-field-ctrl - Директива для связи с FormControl
 *
 * <ss-lib-form-field
 *   [label]="'Имя пользователя'"
 *   [hint]="'Введите ваше имя'"
 *   [showValidation]="true"
 *   [showValidationFieldIcon]="true"
 *   [errorText]="'Поле обязательно для заполнения'"
 * >
 *   <input
 *     ss-lib-field-ctrl
 *     [(ngModel)]="username"
 *     required
 *   />
 * </ss-lib-form-field>
 * ```
 */
@Component({
	selector: 'ss-lib-form-field',
	standalone: true,
	imports: [
		TextComponent,
		NgClass,
		IconComponent,
		NgIf,
		TooltipDirective,
		HintComponent,
	],
	templateUrl: './form-field.component.html',
	styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements AfterContentInit {
	@ContentChild(FieldCtrlDirective)
	public fieldCtrl?: FieldCtrlDirective;

	public readonly label = input<string>('');
	public readonly hint = input<string>('');
	public readonly showValidation = input<boolean>(true);
	public readonly showValidationFieldIcon = input<boolean>(false);
	public readonly errorText = input<string>('');
	public readonly icon = input<IconType | null>(null);
	public readonly tooltipInfoText = input<string | null>(null);

	public readonly existValidators = signal<boolean>(false);
	public readonly isRequired = signal<boolean>(false);
	public readonly fieldCtrlState = signal<ControlState>(ControlState.Touched);
	public readonly colorIcon = signal<Colors>(Colors.IconDisabled);

	public readonly currentFieldCtrlState = signal<ControlState>(
		ControlState.Touched,
	);

	public readonly TextType = TextType;
	public readonly TextWeight = TextWeight;
	public readonly Colors = Colors;

	public readonly IconType = IconType;

	private readonly injector = inject(Injector);

	protected readonly HelpHintType = HintType;
	protected readonly ControlState = ControlState;

	public get getColorIcon(): Colors {
		const control = this.fieldCtrl?.ngControl.control;

		return this.calcColorIcon(control!.value, this.currentFieldCtrlState());
	}

	public ngAfterContentInit(): void {
		if (this.showValidation()) {
			this.initFieldCtrlState();
		}
	}

	public updateFormFieldStateOnFocusout(): void {
		this.currentFieldCtrlState.set(this.fieldCtrlState());
	}

	private initFieldCtrlState(): void {
		if (this.fieldCtrl?.ngControl.control) {
			this.fieldCtrl!.ngControl.control!.markAllAsTouched = () => {
				if (this.fieldCtrl!.ngControl.control!.disabled) {
					return;
				}

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
					map((status) => {
						if (status === 'DISABLED') {
							return ControlState.Disabled;
						}

						return status === 'VALID'
							? ControlState.Valid
							: ControlState.Invalid;
					}),
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

	private calcColorIcon(value: string | null, status: ControlState): Colors {
		if (status !== ControlState.Disabled) {
			if (status === ControlState.Invalid) {
				return Colors.IconError;
			}

			if (value && value.trim().length > 0) {
				return Colors.IconAction2;
			}

			return Colors.IconDisabled;
		}

		return Colors.IconOnDisabled;
	}
}
