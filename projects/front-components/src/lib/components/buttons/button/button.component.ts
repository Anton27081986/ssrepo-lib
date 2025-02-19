import { ChangeDetectionStrategy, Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType } from '../../../shared/models';

@Component({
    selector: 'ss-lib-button',
    standalone: true,
    imports: [
        BaseButtonComponent
    ],
    template: `
        <ss-lib-base-button
            [type]="restrictedType()"
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
export class ButtonComponent extends BaseButtonComponent {
    public restrictedType: InputSignal<ButtonType.Primary | ButtonType.Secondary | ButtonType.Ghost | ButtonType.Text> = input<ButtonType.Primary | ButtonType.Secondary | ButtonType.Ghost | ButtonType.Text>(ButtonType.Primary);

    public readonly ButtonType = ButtonType;

    constructor() {
        super();

        this.restrictedType = this.type as InputSignal<ButtonType.Primary | ButtonType.Secondary | ButtonType.Ghost | ButtonType.Text>;
    }
}
