import {
	ChangeDetectionStrategy,
	Component,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType, IconType } from '../../../shared/models';

/**
 * Кнопка предварительного просмотра
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: ButtonType.Preview - Тип кнопки - необязательный,
 * по умолчанию: ButtonType.Preview
 *
 * [icon]: IconType - Название иконки - необязательный, по умолчанию: IconType.Close
 *
 * <ss-lib-preview-button
 *   [type]="ButtonType.Preview"
 *   [icon]="IconType.Close"
 * ></ss-lib-preview-button>
 * ```
 */
@Component({
	selector: 'ss-lib-preview-button',
	standalone: true,
	imports: [BaseButtonComponent],
	template: `
		<ss-lib-base-button
			[type]="type()"
			[icon]="icon()"
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
	public override readonly type = input<ButtonType.Preview>(
		ButtonType.Preview,
	);

	public override icon = input<IconType | null>(IconType.Close);

	public readonly ButtonType = ButtonType;
}
