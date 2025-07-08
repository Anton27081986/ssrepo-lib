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
import { tap } from 'rxjs';
import { MaskitoDirective } from '@maskito/angular';
import {
	maskitoDateOptionsGenerator,
	maskitoNumberOptionsGenerator,
	maskitoTimeOptionsGenerator,
} from '@maskito/kit';
import { Align, ExtraSize, InputType } from '../../shared/models';
import { CloseButtonComponent } from '../buttons';
import { NgClass } from '@angular/common';

/**
 * Компонент поля ввода с поддержкой различных типов и масок
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: InputType - Тип поля ввода - необязательный, по умолчанию: InputType.Text
 *
 * [placeholder]: string - Текст подсказки - необязательный, по умолчанию: ''
 *
 * [readOnly]: boolean - Флаг режима только для чтения -
 * необязательный, по умолчанию: false
 *
 * [clearButton]: boolean - Флаг на показ иконки крестика в input -
 * необязательный, по умолчанию: false
 *
 * [align]: Align - Выравнивание текста - необязательный, по умолчанию: Align.Start
 *
 * [min]: unknown | undefined - Минимальное значение -
 * необязательный, по умолчанию: undefined
 *
 * [max]: unknown | undefined - Максимальное значение -
 * необязательный, по умолчанию: undefined
 *
 * <ss-lib-input
 *   [type]="InputType.Text"
 *   [placeholder]="'Введите текст'"
 *   [readOnly]="false"
 *   [align]="Align.Start"
 *   [(ngModel)]="value"
 * ></ss-lib-input>
 * ```
 */
@Component({
	selector: 'ss-lib-input',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MaskitoDirective,
		CloseButtonComponent,
		NgClass,
	],
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
	private readonly inputField = viewChild('inputField', {
		read: ElementRef<HTMLInputElement>,
	});

	public readonly type = input<InputType>(InputType.Text);
	public readonly size = input<ExtraSize>(ExtraSize.md);
	public readonly placeholder = input<string>('');
	public readonly readOnly = input<boolean>(false);
	public readonly clearButton = input<boolean>(false);
	public readonly align = input<Align>(Align.Start);
	public readonly min = input<unknown | undefined>(undefined);
	public readonly max = input<unknown | undefined>(undefined);
	public readonly inputCtrl = new FormControl();
	public readonly disabled = signal<boolean>(false);

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

	private onChange!: (value: string | null) => void;
	protected readonly ExtraSize = ExtraSize;
	private onTouched!: () => void;

	constructor() {
		toSignal(
			this.inputCtrl.valueChanges.pipe(
				tap((value) => {
					this.onChange(value);
				}),
			),
		);
	}

	protected get viewClearButton(): boolean {
		return (
			this.clearButton() &&
			!this.disabled() &&
			this.inputCtrl.value &&
			this.inputCtrl.value.trim().length > 0
		);
	}

	public writeValue(value: string | null): void {
		this.inputCtrl.setValue(value, { emitEvent: false });
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => string): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
		isDisabled
			? this.inputCtrl.disable()
			: this.inputCtrl.enable({ emitEvent: false });
	}

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

	public setFocus(): void {
		this.inputField()?.nativeElement.focus();
	}

	protected clearControl(): void {
		this.inputCtrl.setValue(null);
	}
}
