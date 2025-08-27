import { computed, InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import {
	Align,
	IBadgeProps,
	IconPosition,
	ITagProps,
	Orientation,
} from '../../shared/models';
import {
	ButtonType,
	Colors,
	ExtraSize,
	IconType,
	TextType,
	TextWeight,
} from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { TextComponent } from '../text/text.component';
import { CloseButtonComponent } from '../buttons';
import { TagComponent } from '../tag/tag.component';

/**
 * Компонент для отображения информационного бейджа с заголовком и описанием
 *
 * @example
 * ```html
 * Параметры:
 *
 * [title]: string - Заголовок информационного бейджа - обязательный
 *
 * [description]: string - Описание информационного бейджа - обязательный
 *
 * [orientation]: Orientation - Ориентация информационного бейджа -
 * необязательный, по умолчанию: Orientation.Horizontal
 *
 * [viewClose]: boolean - Флаг отображения кнопки закрытия -
 * необязательный, по умолчанию: true
 *
 * [badge]: IBadgeProps - Свойства бейджа - обязательный
 *
 * [tags]: ITagProps[] - Свойства тегов - необязательный
 *
 * (closeEvent): void - Событие закрытия бейджа
 *
 * <ss-lib-dialog-header
 *   [title]="'Заголовок'"
 *   [description]="'Описание бейджа'"
 *   [viewClose]="true"
 *   [badge]="{ text: 'Новый', color: Colors.Primary }"
 *   (closeEvent)="onClose()"
 * ></ss-lib-badge-info>
 * ```
 */
@Component({
	selector: 'ss-lib-dialog-header',
	standalone: true,
	imports: [
		BadgeComponent,
		TextComponent,
		CloseButtonComponent,
		TagComponent,
	],
	templateUrl: './dialog-header.component.html',
	styleUrl: './dialog-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeaderComponent {
	public title: InputSignal<string> = input.required<string>();
	public description: InputSignal<string> = input.required<string>();
	public tags = input<ITagProps[]>([]);
	public viewClose: InputSignal<boolean> = input<boolean>(true);
	public orientation: InputSignal<Orientation> = input<Orientation>(
		Orientation.Horizontal,
	);

	public badge: InputSignal<IBadgeProps | null> = input<IBadgeProps | null>(
		null,
	);

	public closeEvent = output<void>();

	protected textAlign = computed(() => {
		return this.orientation() === Orientation.Vertical
			? Align.Center
			: Align.Start;
	});

	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly Align = Align;
	protected readonly IconPosition = IconPosition;
}
