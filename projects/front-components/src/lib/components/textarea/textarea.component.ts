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
	resizeContainer!: ElementRef<HTMLElement>;

	@ViewChild('resizeContainerPseudo')
	resizeContainerPseudo!: ElementRef<HTMLElement>;

	private readonly destroyRef = inject(DestroyRef);

	maxLength = input<number | null>(null);

	textareaCtrl = new FormControl('');
	textareaHeight = signal(TEXTAREA_MIN_HEIGHT);

	readonly TEXTAREA_MIN_HEIGHT = TEXTAREA_MIN_HEIGHT;
	readonly IconType = IconType;
	readonly Colors = Colors;

	private onChange: (value: string | null) => void = () => {};
	private onTouched: () => void = () => {};

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

	writeValue(value: string): void {
		const fittedValue = value
			? value.slice(0, this.maxLength() || Infinity)
			: '';

		this.textareaCtrl.setValue(fittedValue, { emitEvent: false });
	}

	registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
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
				takeUntil(mouseup$),
				takeUntilDestroyed(this.destroyRef),
				map((e) => e.clientY - startY),
				tap((dy) => {
					const newHeight = Math.max(
						this.TEXTAREA_MIN_HEIGHT,
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
