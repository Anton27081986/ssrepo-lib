import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType } from '../../../shared/models';

type RegularButtonType =
	| ButtonType.Primary
	| ButtonType.Secondary
	| ButtonType.Ghost
	| ButtonType.Text;

/**
 * Базовая кнопка с поддержкой различных типов, размеров и иконок
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: ButtonType.Primary | ButtonType.Secondary | ButtonType.Ghost | ButtonType.Text -
 * Тип кнопки - необязательный, по умолчанию: ButtonType.Primary
 *
 * [size]: ExtraSize - Размер кнопки - необязательный, по умолчанию: ExtraSize.md
 *
 * [text]: string - Текст в кнопке - необязательный, по умолчанию: ''
 *
 * [icon]: IconType | null - Название иконки - необязательный, по умолчанию: null
 *
 * [iconPosition]: IconPosition - Положение иконки в кнопке - необязательный,
 * по умолчанию: IconPosition.Start
 *
 * [disabled]: boolean - Блокировка кнопки - необязательный, по умолчанию: false
 *
 * <ss-lib-button
 *   [type]="ButtonType.Primary"
 *   [size]="ExtraSize.md"
 *   [text]="'Нажми меня'"
 *   [icon]="'edit'"
 *   [iconPosition]="IconPosition.Start"
 *   [disabled]="false"
 * ></ss-lib-button>
 * ```
 */
@Component({
	selector: 'ss-lib-button',
	standalone: true,
	imports: [BaseButtonComponent],
	template: `
		<ss-lib-base-button
			[type]="type()"
			[size]="size()"
			[text]="text()"
			[icon]="icon()"
			[iconPosition]="iconPosition()"
			[disabled]="disabled()"
			[justifyContent]="justifyContent()"
		>
			<ng-content></ng-content>
		</ss-lib-base-button>
	`,
	styleUrl: './button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends BaseButtonComponent<RegularButtonType> {
	public override readonly type: InputSignal<RegularButtonType> =
		input<RegularButtonType>(ButtonType.Primary);

	public readonly ButtonType = ButtonType;
}
