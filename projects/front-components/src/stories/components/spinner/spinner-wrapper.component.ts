import { Component, input } from '@angular/core';
import { SpinnerComponent } from '../../../lib/components/spinner/spinner.component';

/**
 * Компонент-обертка для демонстрации SpinnerComponent в Storybook.
 *
 * Предоставляет интерактивный пример использования спиннера загрузки
 * с возможностью отображения текста. Компонент обернут в контейнер
 * с фиксированными размерами и центрированием для лучшей визуализации.
 */
@Component({
	selector: 'ss-lib-spinner-wrapper',
	standalone: true,
	imports: [SpinnerComponent],
	template: `
		<div
			style="
				padding: 20px;
				background: #f3f4f6;
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				min-height: 200px;
			"
		>
			<ss-lib-spinner
				[displaySpinnerText]="displaySpinnerText()"
			></ss-lib-spinner>
		</div>
	`,
})
export class SpinnerWrapperComponent {
	/**
	 * Флаг, определяющий, отображать ли текст под спиннером.
	 *
	 * @default false
	 * @description
	 * - true: отображает текст "Загрузка..." под спиннером
	 * - false: показывает только анимированный спиннер
	 */
	public readonly displaySpinnerText = input<boolean>(false);
}
