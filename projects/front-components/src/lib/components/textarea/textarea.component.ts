import type { ElementRef } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	forwardRef,
	inject,
	input,
	signal,
	ViewChild,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import {
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
	debounceTime,
	distinctUntilChanged,
	fromEvent,
	map,
	skip,
	takeUntil,
	tap,
} from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { Colors, IconType } from '../../shared/models';
import { MapperPipe } from '../../core/pipes';

export const TEXTAREA_MIN_HEIGHT = 128;

/**
 * Параметры:
 *
 * [maxLength]: <number | null> - Ограничение по длине текста. По умолчанию: `null`
 *
 */
@Component({
	selector: 'ss-lib-textarea',
	standalone: true,
	imports: [ReactiveFormsModule, IconComponent, MapperPipe],
	templateUrl: './textarea.component.html',
	styleUrl: './textarea.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true,
		},
	],
})
export class TextareaComponent implements ControlValueAccessor {
	@ViewChild('resizeContainer')
	public readonly resizeContainer!: ElementRef<HTMLElement>;

	@ViewChild('resizeContainerPseudo')
	public readonly resizeContainerPseudo!: ElementRef<HTMLElement>;

	public maxLength = input<number | null>(null);

	public textareaCtrl = new FormControl('');
	public textareaHeight = signal(TEXTAREA_MIN_HEIGHT);

	protected readonly textareaMinHeight = TEXTAREA_MIN_HEIGHT;
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;

	private readonly destroyRef = inject(DestroyRef);

	public onChange: (value: string | null) => void = () => {};
	public onTouched: () => void = () => {};
	constructor() {
		toSignal(
			this.textareaCtrl.valueChanges.pipe(
				skip(1),
				debounceTime(300),
				distinctUntilChanged(),
				tap((value) => this.onChange(value)),
			),
		);
	}

	public writeValue(value: string): void {
		const fittedValue = value
			? value.slice(0, this.maxLength() || Infinity)
			: '';

		this.textareaCtrl.setValue(fittedValue, { emitEvent: false });
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		isDisabled ? this.textareaCtrl.disable() : this.textareaCtrl.enable();
	}

	public startResize(event: MouseEvent): void {
		event.preventDefault();
		const startY = event.clientY;
		const startHeight = this.resizeContainer.nativeElement.offsetHeight;

		const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
		const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

		mousemove$
			.pipe(
				// eslint-disable-next-line rxjs/no-unsafe-takeuntil
				takeUntil(mouseup$),
				takeUntilDestroyed(this.destroyRef),
				map((e) => e.clientY - startY),
				tap((dy) => {
					const newHeight = Math.max(
						this.textareaMinHeight,
						startHeight + dy,
					);

					this.textareaHeight.set(newHeight);
				}),
			)
			.subscribe();
	}

	public getResizeIconColor(isDisabled: boolean): Colors {
		return isDisabled ? Colors.SurfaceDisabled : Colors.SurfacePrimary;
	}

	public cursorType(isDisabled: boolean): 'default' | 'ns-resize' {
		return isDisabled ? 'default' : 'ns-resize';
	}
}
