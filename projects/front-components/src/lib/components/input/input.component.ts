import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    input,
    signal,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';

/**
 * Параметры:
 *
 * [placeholder]: string - Placeholder. По умолчанию: `''`
 */
@Component({
    selector: 'ss-lib-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
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
    public placeholder = input<string>('');

    public inputCtrl = new FormControl();
    public disabled = signal<boolean>(false);

    private onChange!: (value: string | null) => void;
    private onTouched!: () => void;

    constructor() {
        toSignal(
            this.inputCtrl.valueChanges.pipe(
                debounceTime(300),
                tap(value => this.onChange(value))
            )
        )
    }

    public writeValue(value: string | null): void {
        this.inputCtrl.setValue(value, {emitEvent: false});
    }

    public registerOnChange(fn: (value: string | null) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => string): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);

        isDisabled ? this.inputCtrl.disable() : this.inputCtrl.enable({emitEvent: false});
    }

    public updateInputStateOnFocusout(event: FocusEvent): void {
        const relatedTarget = event.relatedTarget as HTMLElement;

        if (relatedTarget && event.currentTarget && (event.currentTarget as HTMLElement).contains(relatedTarget)) {
            return;
        }
    }
}
