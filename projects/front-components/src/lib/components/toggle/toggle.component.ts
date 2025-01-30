import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ss-lib-toggle',
    standalone: true,
    imports: [],
    templateUrl: './toggle.component.html',
    styleUrl: './toggle.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ]
})
export class ToggleComponent implements ControlValueAccessor {
    public isDisabled = signal<boolean>(false);
    public checked = signal<boolean>(false);

    private onChange: (value: boolean) => void = () => {
    };
    private onTouched: () => void = () => {
    };

    writeValue(value: boolean | null): void {
        this.checked.set(value ?? false);
    }

    registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
    }

    toggleChecked(): void {
        this.checked.set(!this.checked());
        this.onChange(this.checked());
        this.onTouched();
    }
}
