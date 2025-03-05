import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaskitoDirective } from '@maskito/angular';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { debounceTime, tap } from 'rxjs';
import { Align, InputType } from '../../shared/models';

/**
 * Параметры:
 *
 * [type]: InputType - Тип. По умолчанию: `InputType.Text`
 *
 * [placeholder]: string - Placeholder. По умолчанию: `''`
 *
 * [readOnly]: boolean - Только для чтения. По умолчанию: `false`
 *
 * [align]: Align - Выравнивание. По умолчанию: `Align.Start`
 *
 * [min]: number | undefined - Мин значение. По умолчанию: `undefined`
 *
 * [max]: number | undefined - Максимальное значение. По умолчанию: `undefined`
 */
@Component({
    selector: 'ss-lib-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MaskitoDirective,
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
    public type = input<InputType>(InputType.Text);
    public placeholder = input<string>('');
    public readOnly = input<boolean>(false);
    public align = input<Align>(Align.Start);
    public min = input<number | undefined>(undefined);
    public max = input<number | undefined>(undefined);

    public inputCtrl = new FormControl();
    public disabled = signal<boolean>(false);
    public inputMask = computed(() => {
        if (this.type() === InputType.Number) {
            return maskitoNumberOptionsGenerator({
                min: this.min(),
                max: this.max(),
                precision: 2,
                decimalSeparator: ',',
                thousandSeparator: ''
            })
        }

        return null;
    });

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
