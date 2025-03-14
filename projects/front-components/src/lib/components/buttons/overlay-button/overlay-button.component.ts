import {
	ChangeDetectionStrategy,
	Component,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { IconType, ButtonType } from '../../../shared/models';
import { BaseButtonComponent } from '../base-button/base-button.component';

@Component({
	selector: 'ss-lib-overlay-button',
	imports: [BaseButtonComponent],
	standalone: true,
	template: `
		<ss-lib-base-button
			[type]="type()"
			[icon]="restrictedIcon()"
			[iconSize]="'24'"
			[iconPosition]="IconPosition.OnlyIcon"
		>
			<ng-content></ng-content>
		</ss-lib-base-button>
	`,
	styleUrl: './overlay-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class OverlayButtonComponent extends BaseButtonComponent<ButtonType.Overlay> {
	public override type = input<ButtonType.Overlay>(ButtonType.Overlay);
	public restrictedIcon = input<IconType>(IconType.Close);

	public readonly ButtonType = ButtonType;
}
