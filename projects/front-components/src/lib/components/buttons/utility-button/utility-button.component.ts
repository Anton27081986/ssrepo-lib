import { ChangeDetectionStrategy, Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType, IconType } from '../../../shared/models';


/**
 * Параметры:
 *
 * [icon]: IconType - Название иконки.  По умолчанию: `IconType.KebabMenuDots`
 */
@Component({
    selector: 'ss-lib-utility-button',
    standalone: true,
    imports: [
        BaseButtonComponent
    ],
    template: `
        <ss-lib-base-button
            [type]="restrictedType()"
            [icon]="restrictedIcon()"
            [iconPosition]="IconPosition.OnlyIcon"
        >
            <ng-content></ng-content>
        </ss-lib-base-button>
    `,
    styleUrl: './utility-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class UtilityButtonComponent extends BaseButtonComponent {
    public restrictedType: InputSignal<ButtonType.Utility> = input<ButtonType.Utility>(ButtonType.Utility);
    public restrictedIcon = input<IconType>(IconType.KebabMenuDots);

    public readonly ButtonType = ButtonType;

    constructor() {
        super();

        this.restrictedType = this.type as InputSignal<ButtonType.Utility>;
    }
}
