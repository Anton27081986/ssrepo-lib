import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Colors, TagType, TextType, TextWeight } from '../../shared/models';
import { TextComponent } from '../text/text.component';

/**
 * Компонент для отображения тега с настраиваемым стилем и опциональной точкой-индикатором
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: TagType - Тип тега (обычный или с точкой) - необязательный, по умолчанию: TagType.Default
 *
 * [text]: string - Текст, отображаемый в теге - обязательный
 *
 * [dotColor]: string - Цвет точки (для типа TagType.Dot) - необязательный, по умолчанию: 'var(--icon-body-2)'
 *
 * <ss-lib-tag
 *   [type]="TagType.Dot"
 *   [text]="'Example Tag'"
 *   [dotColor]="'var(--custom-color)'"
 * ></ss-lib-tag>
 * ```
 */
@Component({
	selector: 'ss-lib-tag',
	imports: [TextComponent],
	templateUrl: './tag.component.html',
	styleUrl: './tag.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
	public readonly type = input<TagType>(TagType.Default);
	public text = input.required<string>();
	public dotColor = input<Colors>(Colors.IconBody2);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly TagType = TagType;
}
