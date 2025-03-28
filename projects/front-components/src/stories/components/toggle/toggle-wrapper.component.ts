import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from '../../../lib/components/toggle/toggle.component';

/**
 * Компонент-обертка для демонстрации ToggleComponent в Storybook.
 * Предоставляет интерактивный пример использования переключателя с возможностью управления состоянием
 * и отображением текущего значения.
 */
@Component({
	selector: 'ss-lib-toggle-wrapper',
	standalone: true,
	imports: [ToggleComponent, ReactiveFormsModule],
	template: `
		<div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
			<ss-lib-toggle [formControl]="toggleControl"></ss-lib-toggle>
			<div style="margin-top: 10px; color: #666;">
				Текущее значение: {{ toggleControl.value }}
			</div>
		</div>
	`,
})
export class ToggleWrapperComponent {
	/**
	 * Начальное значение переключателя.
	 * Определяет состояние переключателя при инициализации компонента.
	 */
	public readonly initialValue = input<boolean>(false);

	/**
	 * Флаг, указывающий, отключен ли переключатель.
	 * В отключенном состоянии компонент недоступен для взаимодействия.
	 */
	public readonly disabled = input<boolean>(false);

	/**
	 * Контрол формы для управления состоянием переключателя.
	 * Позволяет отслеживать и изменять состояние переключателя.
	 */
	public readonly toggleControl = new FormControl<boolean>(false);

	constructor() {
		if (this.disabled()) {
			this.toggleControl.disable();
		}

		if (this.initialValue()) {
			this.toggleControl.setValue(true, { emitEvent: false });
		}
	}
}
