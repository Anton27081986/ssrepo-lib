import type { InputSignal, TemplateRef } from '@angular/core';
import { Component, input } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Align, IconType } from "../../shared/models";
import { ExtraSize, TextType, TextWeight } from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { TextComponent } from '../text/text.component';
import { DividerComponent } from '../divider/divider.component';

/**
 * Компонент для отображения пустого состояния с иконкой и описанием
 *
 * @example
 * ```html
 * Параметры:
 *
 * [headerTitle]: string - Заголовок в шапке - обязательный
 *
 * [actionRef]: TemplateRef - Шаблон кнопок действий - обязательный
 *
 * [icon]: IconType - Иконка пустого состояния - обязательный
 *
 * [title]: string - Заголовок пустого состояния - обязательный
 *
 * [description]: string | null - Описание пустого состояния -
 * необязательный, по умолчанию: null
 *
 * <ss-lib-empty-state
 *   [headerTitle]="'Пустое состояние'"
 *   [actionRef]="actionTemplate"
 *   [icon]="IconType.EmptyState"
 *   [title]="'Нет данных'"
 *   [description]="'Добавьте данные для отображения'"
 * ></ss-lib-empty-state>
 * ```
 */
@Component({
	selector: 'ss-lib-empty-state',
	standalone: true,
	imports: [
		BadgeComponent,
		TextComponent,
		NgIf,
		DividerComponent,
		NgTemplateOutlet,
	],
	templateUrl: './empty-state.component.html',
	styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
	public readonly headerTitle: InputSignal<string> = input.required<string>();
	public readonly actionRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly icon: InputSignal<IconType> = input.required<IconType>();
	public readonly title: InputSignal<string> = input.required();
	public readonly description: InputSignal<string | null> = input<
		string | null
	>(null);

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly ExtraSize = ExtraSize;
	protected readonly Align = Align;
}
