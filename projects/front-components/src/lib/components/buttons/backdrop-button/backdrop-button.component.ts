import {
	ChangeDetectionStrategy,
	Component,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { IconType, ButtonType } from '../../../shared/models';
import { BaseButtonComponent } from '../base-button/base-button.component';

/**
 * Компонент оверлей-кнопки с фиксированным размером иконки и позиционированием
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: ButtonType.Overlay - Тип кнопки - необязательный,
 * по умолчанию: ButtonType.Overlay
 *
 * [icon]: IconType - Иконка кнопки - необязательный,
 * по умолчанию: IconType.Close
 *
 * Наследует все свойства от BaseButtonComponent<ButtonType.Overlay>
 *
 * <ss-lib-backdrop-button
 *   [type]="ButtonType.Overlay"
 *   [icon]="IconType.Close"
 * >
 *   Контент кнопки
 * </ss-lib-backdrop-button>
 * ```
 */
@Component({
	selector: 'ss-lib-backdrop-button',
	imports: [BaseButtonComponent],
	standalone: true,
	template: `
		<ss-lib-base-button
			[type]="type()"
			[icon]="icon()"
			[iconSize]="'24'"
			[iconPosition]="IconPosition.OnlyIcon"
		>
			<ng-content></ng-content>
		</ss-lib-base-button>
	`,
	styleUrl: './backdrop-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class BackdropButtonComponent extends BaseButtonComponent<ButtonType.Backdrop> {
	public override type = input<ButtonType.Backdrop>(ButtonType.Backdrop);
	public override icon = input<IconType | null>(IconType.Close);

	public readonly ButtonType = ButtonType;
}
