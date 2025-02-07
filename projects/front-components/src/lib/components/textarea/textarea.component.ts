import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    inject,
    input,
    OnDestroy,
    Renderer2,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, skip, tap } from 'rxjs';

export const TEXTAREA_MIN_HEIGHT = 130;

/**
 * Параметры:
 *
 * [maxLength]: <number | null> - Ограничение по длине текста. По умолчанию: `null`
 */
@Component({
    selector: 'ss-lib-textarea',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
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

export class TextareaComponent implements ControlValueAccessor, OnDestroy {
    @ViewChild('resizeContainer') resizeContainer!: ElementRef<HTMLElement>;
    @ViewChild('resizeContainerPseudo') resizeContainerPseudo!: ElementRef<HTMLElement>;

    private readonly renderer = inject(Renderer2);

    maxLength = input<number | null>(null);

    textareaCtrl = new FormControl('');

    public readonly TEXTAREA_MIN_HEIGHT = TEXTAREA_MIN_HEIGHT;

    private onChange: (value: string | null) => void = () => {
    };
    private onTouched: () => void = () => {
    };

    private mouseMoveListener: () => void = () => {
    };
    private mouseUpListener: () => void = () => {
    };

    constructor() {
        toSignal(
            this.textareaCtrl.valueChanges.pipe(
                skip(1),
                debounceTime(300),
                distinctUntilChanged(),
                tap(value => this.onChange(value))
            )
        )
    }

    ngOnDestroy(): void {
        this.removeEventListeners();
    }

    writeValue(value: string): void {
        const fittedValue = value ? value.slice(0, this.maxLength() || Infinity) : '';
        this.textareaCtrl.setValue(fittedValue, {emitEvent: false});
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

    startResize(event: MouseEvent): void {
        event.preventDefault();
        const startY = event.clientY;
        const startHeight = this.resizeContainer.nativeElement.getBoundingClientRect().height;

        this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
            const dy = e.clientY - startY;
            const newHeight = Math.max(TEXTAREA_MIN_HEIGHT, startHeight + dy);
            this.resizeContainer.nativeElement.style.height = `${newHeight}px`;
            this.resizeContainerPseudo.nativeElement.style.height = `${newHeight}px`;
        });

        this.mouseUpListener = this.renderer.listen('document', 'mouseup', () => {
            this.removeEventListeners();
        });
    }

    private removeEventListeners(): void {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
        }
        if (this.mouseUpListener) {
            this.mouseUpListener();
        }
    }
}