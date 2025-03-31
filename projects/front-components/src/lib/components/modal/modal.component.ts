import type { InputSignal, TemplateRef } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import type { IBadgeProps } from '../../shared/models';
import { ModalRef } from '../../shared/models';
import { BadgeInfoComponent } from '../badge-info/badge-info.component';
import { DividerComponent } from '../divider/divider.component';

/**
 * Компонент модального окна.
 *
 * Предоставляет модальное окно с заголовком, описанием,
 * содержимым и действиями. Поддерживает кастомизацию
 * через шаблоны и бейджи.
 *
 * @example
 * ```html
 * <ss-lib-modal
 *   [titleHeader]="'Заголовок'"
 *   [descriptionHeader]="'Описание'"
 *   [badgeProps]="{ type: 'info', text: 'Статус' }"
 *   [actionsRef]="actionsTemplate"
 *   [contentRef]="contentTemplate"
 * />
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
	public titleHeader: InputSignal<string> = input.required<string>();

	/**
	 * Описание модального окна.
	 *
	 * @description
	 * Обязательный параметр, отображаемый под
	 * заголовком модального окна.
	 */
	public descriptionHeader: InputSignal<string> = input.required<string>();

	/**
	 * Шаблон действий модального окна.
	 *
	 * @description
	 * Обязательный параметр, содержащий шаблон
	 * с кнопками действий в нижней части окна.
	 */
	public actionsRef: InputSignal<TemplateRef<{}> | null> = input.required();

	/**
	 * Шаблон содержимого модального окна.
	 *
	 * @default null
	 * @description
	 * Опциональный параметр, содержащий шаблон
	 * с основным содержимым модального окна.
	 */
	public contentRef: InputSignal<TemplateRef<{}> | null> =
		input<TemplateRef<{}> | null>(null);

	/**
	 * Свойства бейджа.
	 *
	 * @description
	 * Обязательный параметр, определяющий внешний вид
	 * и содержимое бейджа в модальном окне.
	 */
	public badgeProps: InputSignal<IBadgeProps> = input.required<IBadgeProps>();

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
		this.popoverRef.close();
	}
}
