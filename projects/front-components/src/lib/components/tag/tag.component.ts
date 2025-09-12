import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
	Colors,
	TagType,
	TextType,
	TextWeight,
	ITagColorConfig,
} from '../../shared/models';
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
 * [colorConfig]: ITagColorConfig - Конфигурация цветов для тега (точка, граница, текст).
 *    Все поля необязательные, по умолчанию:
 *      dotColor: Colors.IconBody2
 *      borderColor: Colors.BorderPrimary
 *      textColor: Colors.TextBody2
 *
 * <ss-lib-tag
 *   [type]="TagType.Dot"
 *   [text]="'Example Tag'"
 *   [colorConfig]="{ dotColor: 'var(--custom-color)' }"
 * ></ss-lib-tag>
 * ```
 */
@Component({
	selector: 'ss-lib-tag',
	imports: [TextComponent],
	standalone: true,
	templateUrl: './tag.component.html',
	styleUrl: './tag.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
	public readonly type = input<TagType>(TagType.Default);
	public text = input.required<string>();
	public colorConfig = input<ITagColorConfig | undefined, ITagColorConfig>(
		{
			dotColor: Colors.IconBody2,
			borderColor: Colors.BorderPrimary,
			textColor: Colors.TextBody2,
		},
		{
			transform: this.setDefaultTagColor,
		},
	);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly TagType = TagType;

	public setDefaultTagColor(
		colorConfig: ITagColorConfig | undefined,
	): ITagColorConfig {
		return {
			...colorConfig,
			dotColor: colorConfig?.dotColor ?? Colors.IconBody2,
			borderColor: colorConfig?.borderColor ?? Colors.BorderPrimary,
			textColor: colorConfig?.textColor ?? Colors.TextBody2,
		};
	}
}
