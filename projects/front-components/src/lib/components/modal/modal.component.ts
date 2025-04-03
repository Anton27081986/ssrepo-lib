import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
	TemplateRef,
	inject,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import type { IBadgeProps } from '../../shared/models';
import { ModalRef } from '../../shared/models';
import { BadgeInfoComponent } from '../badge-info/badge-info.component';
import { DividerComponent } from '../divider/divider.component';

/**
 * Компонент модального окна с заголовком, описанием и действиями
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
 * <ss-lib-modal
 *   [titleHeader]="'Заголовок'"
 *   [descriptionHeader]="'Описание'"
 *   [badgeProps]="{ type: 'info', text: 'Статус' }"
 *   [actionsRef]="actionsTemplate"
 *   [contentRef]="contentTemplate"
 *   (closeEmit)="onClose()"
 * ></ss-lib-modal>
 * ```
 */
@Component({
	selector: 'ss-lib-modal',
	standalone: true,
	imports: [NgIf, BadgeInfoComponent, DividerComponent, NgTemplateOutlet],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	/**
	 * Заголовок модального окна.
	 *
	 * @description
	 * Обязательный параметр, отображаемый в верхней
	 * части модального окна.
	 */
	public readonly titleHeader = input<string>('');

	/**
	 * Описание модального окна.
	 *
	 * @description
	 * Обязательный параметр, отображаемый под
	 * заголовком модального окна.
	 */
	public readonly descriptionHeader = input<string>('');

	/**
	 * Шаблон действий модального окна.
	 *
	 * @description
	 * Обязательный параметр, содержащий шаблон
	 * с кнопками действий в нижней части окна.
	 */
	public readonly actionsRef = input.required<TemplateRef<unknown>>();

	/**
	 * Шаблон содержимого модального окна.
	 *
	 * @default null
	 * @description
	 * Опциональный параметр, содержащий шаблон
	 * с основным содержимым модального окна.
	 */
	public readonly contentRef = input<TemplateRef<{}> | null>(null);

	/**
	 * Свойства бейджа.
	 *
	 * @description
	 * Обязательный параметр, определяющий внешний вид
	 * и содержимое бейджа в модальном окне.
	 */
	public readonly badgeProps = input.required<IBadgeProps>();

	public readonly closeEmit = output<void>();

	/**
	 * Ссылка на модальное окно.
	 *
	 * @description
	 * Используется для управления состоянием
	 * и закрытия модального окна.
	 */
	private readonly popoverRef = inject(ModalRef);

	/**
	 * Обработчик закрытия модального окна.
	 *
	 * @description
	 * Закрывает модальное окно при вызове.
	 */
	public onCloseEvent(): void {
		this.closeEmit.emit();
	}
}
