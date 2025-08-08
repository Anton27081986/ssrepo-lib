import type { InputSignal } from '@angular/core';
import { Component, input } from '@angular/core';
import { Align, type IBadgeProps } from '../../shared/models';
import { ExtraSize, TextType, TextWeight, Colors } from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { TextComponent } from '../text/text.component';

/**
 * Компонент для отображения пустого состояния с иконкой и описанием
 *
 * @example
 * ```html
 * Параметры:
 *
 * [badge]: IBadgeProps - badge - обязательный
 *
 * [title]: string - Заголовок пустого состояния - обязательный
 *
 * [description]: string | null - Описание пустого состояния -
 * необязательный, по умолчанию: null
 *
 * <ss-lib-empty-state
 *   [badge]="{ icon: IconType.EmptyState}"
 *   [title]="'Нет данных'"
 *   [description]="'Добавьте данные для отображения'"
 * ></ss-lib-empty-state>
 * ```
 */
@Component({
	selector: 'ss-lib-empty-state',
	standalone: true,
	imports: [BadgeComponent, TextComponent],
	templateUrl: './empty-state.component.html',
	styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
	public readonly title: InputSignal<string> = input.required();
	public readonly badge: InputSignal<IBadgeProps> =
		input.required<IBadgeProps>();

	public readonly description: InputSignal<string | null> = input<
		string | null
	>(null);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Align = Align;
	protected readonly Colors = Colors;
}
