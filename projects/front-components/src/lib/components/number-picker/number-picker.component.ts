import {
    ChangeDetectionStrategy,
    Component,
    forwardRef, inject, Injector,
    input,
    OnInit,
    runInInjectionContext,
    signal
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ButtonType, Direction, IconPosition, IconType } from '../../shared/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'ss-lib-number-picker',
    standalone: true,
    imports: [
        ButtonComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './number-picker.component.html',
    styleUrl: './number-picker.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberPickerComponent),
            multi: true,
        },
    ],
})
export class NumberPickerComponent implements ControlValueAccessor, OnInit {
    private readonly injector = inject(Injector);

    public min = input<number>(0);
    public max = input<number>(100);
    public step = input<number>(1);

    public numberPickerCtrl = new FormControl();
    public isDisabled = signal<boolean>(false);

    public readonly ButtonType = ButtonType;
    public readonly IconType = IconType;
    public readonly Direction = Direction;
    public readonly IconPosition = IconPosition;

    ngOnInit() {
        runInInjectionContext(this.injector, () => {
            toSignal(
                this.numberPickerCtrl.valueChanges.pipe(
                    debounceTime(300),
                    tap(value => this.inputChecking(value))
                )
            )
        });
    }

    onChange = (value: number | null) => {
    };
    onTouched = () => {
    };

    public writeValue(value: number | null): void {
        if (value) {
            const numberValue = this.checkNumberValue(+value || 0);

            return this.numberPickerCtrl.setValue(numberValue, {emitEvent: false});
        }
    }

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
    }

    private checkNumberValue(value: number): number {
        if (value && value < this.min()) {
            return this.min();
        }

        if (value && value > this.max()) {
            return this.max();
        }

        return value;
    }

    public changeNumberValueByStep(direction: Direction): void {
        const currentValue = +this.numberPickerCtrl.value || 0;

        let value: number | null = direction === Direction.Next
            ? +(currentValue + this.step()).toFixed(2)
            : +(currentValue - this.step()).toFixed(2);

        value = this.checkNumberValue(value);

        this.numberPickerCtrl.setValue(value);
        this.onChange(value);
    }

    public inputChecking(value: string): void {
        if (!value) {
            this.onChange(null);

            return;
        }

        let numberValue = this.checkNumberValue(+value || 0);

        if (numberValue !== +value) {
            this.numberPickerCtrl.setValue(numberValue);
        }

        this.onChange(numberValue);
    }
}