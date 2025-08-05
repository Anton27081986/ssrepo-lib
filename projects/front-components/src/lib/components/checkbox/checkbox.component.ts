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
import {
	type ControlValueAccessor,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import {
	Colors,
	IconType,
	TextWeight,
	TextType,
	calcStrokeWidth,
} from '../../shared/models';
import { SCALE_SVG } from '../../shared/constants';
import { MapperPipe } from '../../core/pipes';
import { CUSTOM_SCALE_STROKE } from './constants/custom-scale-stroke';
import { TextComponent } from '../text/text.component';

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
	imports: [IconComponent, MapperPipe, TextComponent],
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

	protected readonly checked: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isDisabled: WritableSignal<boolean> =
		signal<boolean>(false);

	protected readonly isError: WritableSignal<boolean> =
		signal<boolean>(false);

	public readonly indeterminate: ModelSignal<boolean> = model(false);

	protected readonly hasLabel = computed(
		() => this.label() || this.description(),
	);

	protected readonly iconComputed: Signal<IconType> = computed(() => {
		if (this.indeterminate()) {
			return IconType.Minus;
		}

		return IconType.Check;
	});

	protected readonly iconColorComputed: Signal<Colors> = computed(() => {
		if (this.isDisabled()) {
			return Colors.IconOnDisabled;
		}

		if (this.isError()) {
			return Colors.IconError;
		}

		return Colors.IconOnAction;
	});

	public onChange!: (value: boolean | null) => void;
	public onTouched = (): void => {};

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly customScaleStroke = CUSTOM_SCALE_STROKE;
	protected readonly scaleSvg = SCALE_SVG;
	protected readonly calcStrokeWidth = calcStrokeWidth;

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

	protected toggleCheckbox(): void {
		if (!this.isDisabled()) {
			this.checked.set(!this.checked());
			this.indeterminate.set(false);
			this.onChange(this.checked());
			this.onTouched();
		}
	}
}
