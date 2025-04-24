import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Align, IBadgeProps } from '../../shared/models';
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
 * [viewClose]: boolean - Флаг отображения кнопки закрытия -
 * необязательный, по умолчанию: true
 *
 * [badge]: IBadgeProps - Свойства бейджа - обязательный
 *
 * (closeEvent): void - Событие закрытия бейджа
 *
 * <ss-lib-badge-info
 *   [title]="'Заголовок'"
 *   [description]="'Описание бейджа'"
 *   [viewClose]="true"
 *   [badge]="{ text: 'Новый', color: Colors.Primary }"
 *   (closeEvent)="onClose()"
 * ></ss-lib-badge-info>
 * ```
 */
@Component({
	selector: 'ss-lib-badge-info',
	standalone: true,
	imports: [BadgeComponent, TextComponent, CloseButtonComponent, NgIf],
	templateUrl: './badge-info.component.html',
	styleUrl: './badge-info.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeInfoComponent {
	public title: InputSignal<string> = input.required<string>();
	public description: InputSignal<string> = input.required<string>();
	public viewClose: InputSignal<boolean> = input<boolean>(true);
	public badge: InputSignal<IBadgeProps | null> = input<IBadgeProps | null>(
		null,
	);

	public closeEvent = output<void>();

	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly Align = Align;
}
