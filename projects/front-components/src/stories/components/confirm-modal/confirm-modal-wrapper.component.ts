import { Component, input } from '@angular/core';
import { ConfirmModalComponent } from '../../../lib/components/confirm-modal/confirm-modal.component';
import { IConfirmData } from '../../../lib/shared/models';

/**
 * Обертка для компонента ConfirmModal.
 *
 * @description
 * Компонент-обертка для демонстрации
 * ConfirmModal в Storybook.
 */
@Component({
	selector: 'ss-lib-confirm-modal-wrapper',
	standalone: true,
	imports: [ConfirmModalComponent],
	template: `
		<ss-lib-confirm-modal
			[title]="data().title"
			[description]="data().description"
			[badgeProps]="data().badgeProps"
			[apply]="data().apply"
			[cancelText]="data().cancelText"
		></ss-lib-confirm-modal>
	`,
})
export class ConfirmModalWrapperComponent {
	/**
	 * Данные модального окна подтверждения.
	 *
	 * @description
	 * Обязательные данные для отображения
	 * модального окна подтверждения.
	 */
	public readonly data = input.required<IConfirmData>();
}
