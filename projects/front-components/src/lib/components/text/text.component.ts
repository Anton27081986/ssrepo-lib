import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Align, Colors, TextType, TextWeight } from '../../shared/models';

/**
 * Компонент для отображения текста с настраиваемыми стилями
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: TextType - Размерность шрифта - необязательный, по умолчанию: TextType.BodyMd
 *
 * [weight]: TextWeight - Толщина шрифта - необязательный, по умолчанию: TextWeight.Regular
 *
 * [color]: Colors - Цвет текста - необязательный, по умолчанию: Colors.TextHeadings
 *
 * [align]: Align - Выравнивание текста - необязательный, по умолчанию: Align.Start
 **
 * [lineClampCount]: number - количество строк для ограничения line-clamp -
 * необязательный, по умолчанию: 2
 *
 * [isLineClamp]: boolean - Ограничить количество строк текста -
 * необязательный, по умолчанию: false
 *
 * [isUnderline]: boolean - Добавлять подчеркивание -
 * необязательный, по умолчанию: false
 *
 * <ss-lib-text
 *   [type]="TextType.BodyMd"
 *   [weight]="TextWeight.Regular"
 *   [color]="Colors.TextHeadings"
 *   [isEllipsis]="false"
 *   [isUnderline]="false"
 * >Текст для отображения</ss-lib-text>
 * ```
 */
@Component({
	selector: 'ss-lib-text',
	templateUrl: './text.component.html',
	styleUrls: ['./text.component.scss'],
	imports: [NgClass],
	standalone: true,
})
export class TextComponent {
	public readonly type = input<TextType>(TextType.BodyMd);
	public readonly weight = input<TextWeight>(TextWeight.Regular);
	public readonly color = input<Colors>(Colors.TextHeadings);
	public readonly align = input<Align>(Align.Start);
	public readonly lineClampCount = input<number>(2);
	public readonly isLineClamp = input<boolean>(false);
	public readonly isEllipsis = input<boolean>(false);
	public readonly isUnderline = input<boolean>(false);
	public readonly isNoWrap = input<boolean>(false);

	public readonly getLineClampCount = computed(() =>
		this.isLineClamp() ? this.lineClampCount() : 'none',
	);
}
