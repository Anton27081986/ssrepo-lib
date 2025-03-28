import { Component, input, TemplateRef } from '@angular/core';
import { ModalComponent } from '../../../lib/components/modal/modal.component';
import { IBadgeProps } from '../../../lib/shared/models';

/**
 * Обертка для компонента Modal.
 *
 * @description
 * Компонент-обертка для демонстрации
 * Modal в Storybook.
 */
@Component({
	selector: 'ss-lib-modal-wrapper',
	standalone: true,
	imports: [ModalComponent],
	template: `
		<ss-lib-modal
			[titleHeader]="titleHeader()"
			[descriptionHeader]="descriptionHeader()"
			[actionsRef]="actionsRef()"
			[contentRef]="contentRef()"
			[badgeProps]="badgeProps()"
		></ss-lib-modal>
	`,
})
export class ModalWrapperComponent {
	/**
	 * Заголовок модального окна.
	 *
	 * @description
	 * Обязательный параметр, отображаемый в верхней
	 * части модального окна.
	 */
	public readonly titleHeader = input.required<string>();

	/**
	 * Описание модального окна.
	 *
	 * @description
	 * Обязательный параметр, отображаемый под
	 * заголовком модального окна.
	 */
	public readonly descriptionHeader = input.required<string>();

	/**
	 * Шаблон действий модального окна.
	 *
	 * @description
	 * Обязательный параметр, содержащий шаблон
	 * с кнопками действий в нижней части окна.
	 */
	public readonly actionsRef = input.required<TemplateRef<{}> | null>();

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
}
