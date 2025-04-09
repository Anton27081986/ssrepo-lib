import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType, IconType } from '../../../shared/models';
import { PopoverTriggerForDirective } from '../../../core/directives';

/**
 * Кнопка утилит с поддержкой выпадающего меню
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: ButtonType.Utility - Тип кнопки - необязательный,
 * по умолчанию: ButtonType.Utility
 *
 * [icon]: IconType - Название иконки - необязательный,
 * по умолчанию: IconType.KebabMenuDots
 *
 * <ss-lib-utility-button
 *   [type]="ButtonType.Utility"
 *   [icon]="IconType.KebabMenuDots"
 * ></ss-lib-utility-button>
 * ```
 */
@Component({
	selector: 'ss-lib-utility-button',
	standalone: true,
	imports: [BaseButtonComponent],
	template: `
		<ss-lib-base-button
			[class.hovered]="this.popoverDirective?.isPopoverOpen() || false"
			[isActive]="this.popoverDirective?.isPopoverOpen() || false"
			[type]="type()"
			[icon]="icon()"
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
	public popoverDirective = inject(PopoverTriggerForDirective, {
		optional: true,
		self: true,
	});

	public override type = input<ButtonType.Utility>(ButtonType.Utility);
	public override icon = input<IconType | null>(IconType.KebabMenuDots);

	public readonly ButtonType = ButtonType;
}
