import {
	Component,
	computed,
	forwardRef,
	input,
	model,
	ModelSignal,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import { Colors, IconType, TextType, TextWeight } from '../../shared/models';

/**
 * Компонент чекбокса с поддержкой различных типов и состояний
 *
 * @example
 * ```html
 * Параметры:
 *
 * [label]: string - Основная подпись - необязательный,
 * по умолчанию: ''
 *
 * [description]: string - Второстепенный текст - необязательный,
 * по умолчанию: ''
 *
 * <ss-lib-checkbox
 *   [(ngModel)]="isChecked"
 *   [label]="'Согласен с условиями'"
 *   [description]="'Подробнее в пользовательском соглашении'"
 * ></ss-lib-checkbox>
 * ```
 */

@Component({
	selector: 'ss-lib-checkbox',
	standalone: true,
	templateUrl: './checkbox.component.html',
	imports: [IconComponent, NgIf, TextComponent],
	styleUrl: './checkbox.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CheckboxComponent),
			multi: true,
		},
	],
})
export class CheckboxComponent implements ControlValueAccessor {
	public readonly label = input<string>('');
	public readonly description = input<string>('');

	/** Флаг отключения чекбокса извне (через атрибут [disabled]) */
	public readonly disabled = input<boolean>(false);

	protected readonly checked: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isDisabled: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isHover: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isFocus: WritableSignal<boolean> =
		signal<boolean>(false);

	public readonly indeterminate: ModelSignal<boolean> = model(false);

	protected readonly iconComputed: Signal<IconType> = computed(() => {
		if (this.indeterminate()) {
			return IconType.Minus;
		}

		return IconType.Check;
	});

	public onChange!: (value: boolean | null) => void;
	public onTouched = (): void => {};

	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;

	/** Доступно из шаблона */
	public isComponentDisabled(): boolean {
		return this.isDisabled() || this.disabled();
	}

	public writeValue(value: boolean | null): void {
		if (value !== null) {
			this.checked.set(value);
		}
	}

	public registerOnChange(fn: (value: boolean | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	protected onLabelClick(event: MouseEvent): void {
		if (this.isComponentDisabled()) {
			event.preventDefault();
			event.stopPropagation();

			return;
		}

		this.toggleCheckbox();
	}

	protected toggleCheckbox(): void {
		if (this.isComponentDisabled()) {
			return;
		}

		const newValue = !this.checked();

		this.checked.set(newValue);

		this.indeterminate.set(false);

		if (this.onChange) {
			this.onChange(newValue);
		}

		this.onTouched();
	}

	protected onMouseEnter(): void {
		this.isHover.set(true);
	}

	protected onMouseLeave(): void {
		this.isHover.set(false);
	}

	protected onFocus(): void {
		this.isFocus.set(true);
	}

	protected onBlur(): void {
		this.isFocus.set(false);
		this.onTouched();
	}
}
