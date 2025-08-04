import {
	afterNextRender,
	Component,
	computed,
	inject,
	Inject,
	Injector,
	input,
	model,
	ModelSignal,
	OnInit,
	runInInjectionContext,
	Self,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import { type ControlValueAccessor, NgControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, tap } from 'rxjs';
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
})
export class CheckboxComponent implements OnInit {
	private readonly injector = inject(Injector);

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

	constructor(
		@Self()
		@Inject(NgControl)
		public ngControl: NgControl,
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		this.checkParentCtrlStatus();
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

	protected toggleCheckbox(): void {
		if (!this.isDisabled()) {
			this.checked.set(!this.checked());
			this.indeterminate.set(false);
			this.onChange(this.checked());
			this.onTouched();
		}
	}

	private checkParentCtrlStatus(): void {
		runInInjectionContext(this.injector, () => {
			toSignal(
				this.ngControl.control!.statusChanges.pipe(
					distinctUntilChanged(),
					tap((status) =>
						this.isError.set(
							status === 'INVALID' &&
								(this.ngControl.touched! ||
									this.ngControl.dirty!),
						),
					),
				),
			);
		});
	}
}
