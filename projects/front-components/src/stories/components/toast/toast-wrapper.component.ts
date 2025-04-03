import { Component, input } from '@angular/core';
import { ToastComponent } from '../../../lib/components/toast/toast.component';
import { Toast } from '../../../lib/shared/models';

/**
 * Компонент-обертка для демонстрации ToastComponent в Storybook.
 * Предоставляет интерактивный пример использования компонента уведомлений
 * с поддержкой различных типов и кнопок действий.
 */
@Component({
	selector: 'ss-lib-toast-wrapper',
	standalone: true,
	imports: [ToastComponent],
	template: `
		<ss-lib-toast
			[type]="toast().type"
			[text]="toast().text"
			[mainButton]="toast().mainButton"
			[secondaryButton]="toast().secondaryButton"
		></ss-lib-toast>
	`,
})
export class ToastWrapperComponent {
	/**
	 * Объект с данными для отображения тоста.
	 * Содержит тип уведомления, текст сообщения и конфигурацию кнопок.
	 */
	public readonly toast = input.required<Toast>();
}
