import { ChangeDetectionStrategy, Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType } from '../../../shared/models';


type RegularButtonType = ButtonType.Primary | ButtonType.Secondary | ButtonType.Ghost | ButtonType.Text;

/**
 * Параметры:
 *
 * [type]: ButtonType.Primary | ButtonType.Secondary | ButtonType.Ghost | ButtonType.Text - Тип кнопки. По умолчанию 'ButtonType.Primary'
 *
 * [size]: ExtraSize - Размер кнопки. По умолчанию: `ExtraSize.md`
 *
 * [text]: string - Текст в кнопке
 *
 * [icon]: IconType | null - Название иконки.  По умолчанию: `null`
 *
 * [iconPosition]: IconPosition - Положение иконки в кнопке. По умолчанию: `IconPosition.Start`
 *
 * [disabled]: boolean - Блокировка кнопки. По умолчанию: `false`
 */
@Component({
    selector: 'ss-lib-button',
    standalone: true,
    imports: [
        BaseButtonComponent
    ],
    template: `
        <ss-lib-base-button
            [type]="type()"
            [size]="size()"
            [text]="text()"
            [icon]="icon()"
            [iconPosition]="iconPosition()"
            [disabled]="disabled()"
        >
            <ng-content></ng-content>
        </ss-lib-base-button>
    `,
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends BaseButtonComponent<RegularButtonType> {
    public override type: InputSignal<RegularButtonType> = input<RegularButtonType>(ButtonType.Primary);

    public readonly ButtonType = ButtonType;

    constructor() {
        super();
    }
}
