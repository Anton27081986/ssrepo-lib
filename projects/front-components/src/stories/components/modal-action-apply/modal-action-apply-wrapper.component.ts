import { Component, input } from '@angular/core';
import { ModalActionApplyComponent } from '../../../lib/components/modal-action-apply/modal-action-apply.component';
import { ModalRef } from '../../../lib/shared/models';

/**
 * Обертка для компонента ModalActionApply.
 *
 * @description
 * Компонент-обертка для демонстрации
 * ModalActionApply в Storybook.
 */
@Component({
	selector: 'ss-lib-modal-action-apply-wrapper',
	standalone: true,
	imports: [ModalActionApplyComponent],
	template: `
		<div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
			<ss-lib-modal-action-apply
				[applyText]="applyText()"
				[applyDisabled]="applyDisabled()"
				[cancelText]="cancelText()"
				(applyEvent)="onApply()"
			></ss-lib-modal-action-apply>
		</div>
	`,
	providers: [
		{
			provide: ModalRef,
			useValue: {
				close: () => {
					// Обработка закрытия модального окна
				},
			},
		},
	],
})
export class ModalActionApplyWrapperComponent {
	/**
	 * Текст кнопки подтверждения.
	 *
	 * @default 'Применить'
	 * @description
	 * Текст, отображаемый на кнопке
	 * подтверждения действия.
	 */
	public readonly applyText = input<string>('Применить');

	/**
	 * Флаг блокировки кнопки подтверждения.
	 *
	 * @default false
	 * @description
	 * Определяет, можно ли нажать
	 * кнопку подтверждения.
	 */
	public readonly applyDisabled = input<boolean>(false);

	/**
	 * Текст кнопки отмены.
	 *
	 * @default 'Отмена'
	 * @description
	 * Текст, отображаемый на кнопке
	 * отмены действия.
	 */
	public readonly cancelText = input<string | undefined>('Отмена');

	/**
	 * Обработчик нажатия кнопки подтверждения.
	 *
	 * @description
	 * Обрабатывает нажатие кнопки
	 * подтверждения.
	 */
	public onApply(): void {
		// Обработка нажатия кнопки подтверждения
	}
}
