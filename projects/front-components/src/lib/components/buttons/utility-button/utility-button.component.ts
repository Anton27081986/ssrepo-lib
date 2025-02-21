import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType, IconType } from '../../../shared/models';


/**
 * Параметры:
 *
 * [type]: ButtonType.Utility - Тип кнопки`
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
            [type]="type()"
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
export class UtilityButtonComponent extends BaseButtonComponent<ButtonType.Utility> {
    public override type = input<ButtonType.Utility>(ButtonType.Utility);
    public restrictedIcon = input<IconType>(IconType.KebabMenuDots);

    public readonly ButtonType = ButtonType;

    constructor() {
        super();
    }
}
