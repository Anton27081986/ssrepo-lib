import {
    AfterContentInit,
    Component,
    ContentChild,
    inject,
    Injector,
    input,
    runInInjectionContext,
    signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import { FieldCtrlDirective } from '../../core/directives';
import { Colors, ControlState, IconType, TextType, TextWeight } from '../../shared/models';
import { Validators } from '@angular/forms';

/**
 * Параметры:*
 * [label]: string - Заголовок. По умолчанию: `''`
 *
 * [errorText]: string - Текст ошибки. По умолчанию: `''`
 *
 * [showValidation]: boolean - Отображать валидацию. По умолчанию: `true`
 *
 * [showValidationFieldIcon]: boolean - Отображать иконку валидации в . По умолчанию: `true`
 */
@Component({
    selector: 'ss-lib-form-field',
    standalone: true,
    imports: [
        TextComponent,
        NgClass,
        IconComponent,
    ],
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements AfterContentInit {
    @ContentChild(FieldCtrlDirective) fieldCtrl?: FieldCtrlDirective;

    private readonly injector = inject(Injector);

    public label = input<string>('');
    public hint = input<string>('');
    public showValidation = input<boolean>(true);
    public showValidationFieldIcon = input<boolean>(true);
    public errorText = input<string>('');

    public existValidators = signal<boolean>(false);
    public isRequired = signal<boolean>(false);
    public fieldCtrlState = signal<ControlState>(ControlState.Touched);
    public currentFieldCtrlState = signal<ControlState>(ControlState.Touched);

    public readonly TextType = TextType;
    public readonly TextWeight = TextWeight;
    public readonly Colors = Colors;
    public readonly IconType = IconType;

    ngAfterContentInit() {
        if (this.showValidation()) {
            this.initFieldCtrlState();
        }
    }

    public updateFormFieldStateOnFocusout(): void {
        this.currentFieldCtrlState.set(this.fieldCtrlState());
    }

    private initFieldCtrlState(): void {
        if (this.fieldCtrl?.ngControl.control) {
            this.fieldCtrl!.ngControl.control!.markAllAsTouched = () => {
                const initState = this.fieldCtrl!.ngControl.control!.status === 'VALID'
                    ? ControlState.Valid
                    : ControlState.Invalid;

                this.fieldCtrlState.set(initState);
                this.currentFieldCtrlState.set(initState)

            };

            if (this.fieldCtrl?.ngControl.control.hasValidator(Validators.required)) {
                this.isRequired.set(true)
            }

            if (this.fieldCtrl?.ngControl.control!.validator || this.fieldCtrl?.ngControl.control!.asyncValidator) {
                this.existValidators.set(true);
            }
        }

        runInInjectionContext(this.injector, () => {
            toSignal(
                this.fieldCtrl!.ngControl.control!.statusChanges.pipe(
                    filter(_ => this.existValidators()),
                    map(status => status === 'VALID' ? ControlState.Valid : ControlState.Invalid),
                    tap(status => {
                        if (this.fieldCtrlState() === ControlState.Invalid) {
                            this.currentFieldCtrlState.set(ControlState.Valid)
                        }

                        this.fieldCtrlState.set(status)
                    }),
                )
            )
        });
    }
}
