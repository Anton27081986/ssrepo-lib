import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
	TemplateRef,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { IBadgeProps, IconPosition } from '../../shared/models';
import { BadgeInfoComponent } from '../badge-info/badge-info.component';
import { DividerComponent } from '../divider/divider.component';

/**
 * Компонент правого  окна с заголовком, описанием и действиями
 *
 * @example
 * ```html
 * Параметры:
 *
 * [titleHeader]: string - Заголовок модального окна - необязательный, по умолчанию: ''
 *
 * [descriptionHeader]: string - Описание модального окна - необязательный, по умолчанию: ''
 *
 * [actionsRef]: TemplateRef - Шаблон действий - обязательный
 *
 * [contentRef]: TemplateRef | null - Шаблон содержимого -
 * необязательный, по умолчанию: null
 *
 * [badgeProps]: IBadgeProps - Свойства бейджа - обязательный
 *
 * (closeEmit): void - Событие закрытия модального окна
 *
 * <ss-lib-right-side-page-popup
 *   [titleHeader]="'Заголовок'"
 *   [descriptionHeader]="'Описание'"
 *   [badgeProps]="{ type: 'info', text: 'Статус' }"
 *   [actionsRef]="actionsTemplate"
 *   [contentRef]="contentTemplate"
 *   (closeEmit)="onClose()"
 * ></ss-lib-right-side-page-popup>
 * ```
 */
@Component({
	selector: 'ss-lib-right-side-page-popup',
	standalone: true,
	imports: [NgIf, BadgeInfoComponent, DividerComponent, NgTemplateOutlet],
	templateUrl: './right-side-page-popup.component.html',
	styleUrl: './right-side-page-popup.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidePagePopupComponent {
	public readonly titleHeader = input<string>('');
	public readonly descriptionHeader = input<string>('');
	public readonly actionsRef = input.required<TemplateRef<unknown>>();
	public readonly contentRef = input<TemplateRef<{}> | null>(null);
	public readonly badgeProps = input<IBadgeProps | null>(null);
	public readonly closePosition = input<
		IconPosition.Start | IconPosition.End
	>(IconPosition.Start);

	public readonly closeEmit = output<void>();

	public onCloseEvent(): void {
		this.closeEmit.emit();
	}
}
