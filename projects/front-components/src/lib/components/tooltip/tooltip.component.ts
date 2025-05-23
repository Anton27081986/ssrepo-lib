import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
	TooltipPosition,
	Colors,
	TextType,
	TextWeight,
} from '../../shared/models';
import { TextComponent } from '../text/text.component';

/**
 * Компонент всплывающей подсказки с анимацией
 *
 * @example
 * ```html
 * Параметры:
 *
 * [position]: TooltipPosition - Позиция подсказки -
 * необязательный, по умолчанию: TooltipPosition.Bottom
 *
 * [text]: string | null - Текст подсказки -
 * необязательный, по умолчанию: ''
 *
 * [left]: number - Позиция по горизонтали -
 * необязательный, по умолчанию: 0
 *
 * [top]: number - Позиция по вертикали -
 * необязательный, по умолчанию: 0
 *
 * [visible]: boolean - Флаг видимости подсказки -
 * необязательный, по умолчанию: false
 *
 * <ss-lib-tooltip
 *   [position]="TooltipPosition.Bottom"
 *   [text]="'Подсказка'"
 *   [left]="100"
 *   [top]="100"
 *   [visible]="true"
 * ></ss-lib-tooltip>
 * ```
 */
@Component({
	standalone: true,
	imports: [NgClass, TextComponent],
	template: `
		@if (text()) {
			<div
				class="tooltip"
				[ngClass]="['tooltip--' + position(), 'tooltip--dark']"
				[class.tooltip--visible]="visible()"
				[style.left.px]="left()"
				[style.top.px]="top()"
			>
				@if (text()) {
					<ss-lib-text
						[type]="TextType.BodyXs"
						[color]="Colors.TextBodyOnColor"
						[weight]="TextWeight.Semibold"
					>
						{{ text() }}
					</ss-lib-text>
				}
			</div>
		}
	`,
	styleUrl: './tooltip.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
	public readonly position = signal<TooltipPosition>(TooltipPosition.Bottom);
	public readonly text = signal<string | null>('');
	public readonly left = signal<number>(0);
	public readonly top = signal<number>(0);
	public readonly visible = signal<boolean>(false);

	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly TextWeight = TextWeight;
}
