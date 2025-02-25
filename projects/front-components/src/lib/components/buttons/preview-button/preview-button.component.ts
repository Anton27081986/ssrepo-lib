import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType, IconType, Shape } from '../../../shared/models';

/**
 * Параметры:
 *
 * [type]: ButtonType.Preview - Тип. По умолчанию: `ButtonType.Preview`
 *
 * [shape]: Shape - Форма кнопки. По умолчанию: `Shape.Round`
 *
 * [icon]: IconType - Название иконки.  По умолчанию: `IconType.Close`
 */
@Component({
    selector: 'ss-lib-preview-button',
    standalone: true,
    imports: [
        BaseButtonComponent,
        NgClass
    ],
    template: `
        <ss-lib-base-button
            [ngClass]="['shape-button-' + shape()]"
            [type]="type()"
            [icon]="restrictedIcon()"
            [size]="size()"
            [iconSize]="'16'"
            [iconPosition]="IconPosition.OnlyIcon"
        >
            <ng-content></ng-content>
        </ss-lib-base-button>
    `,
    styleUrl: './preview-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class PreviewButtonComponent extends BaseButtonComponent<ButtonType.Preview> {
    public override type = input<ButtonType.Preview>(ButtonType.Preview);
    public shape  = input<Shape>(Shape.Round);
    public restrictedIcon = input<IconType>(IconType.Close);

    public readonly ButtonType = ButtonType;

    constructor() {
        super();
    }
}
