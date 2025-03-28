import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TimepickerComponent } from '../../../lib/components/timepicker/timepicker.component';

/**
 * Компонент-обертка для демонстрации TimepickerComponent в Storybook.
 * Предоставляет интерактивный пример использования компонента выбора времени
 * с поддержкой управления состоянием через FormControl.
 */
@Component({
	selector: 'ss-lib-timepicker-wrapper',
	standalone: true,
	imports: [TimepickerComponent, ReactiveFormsModule],
	template: `
		<ss-lib-timepicker
			[formControl]="control"
			[disabled]="disabled()"
		></ss-lib-timepicker>
	`,
})
export class TimepickerWrapperComponent {
	/**
	 * Контрол формы для управления значением времени.
	 * Позволяет отслеживать и изменять выбранное время.
	 */
	public readonly control = new FormControl<string | null>(null);

	/**
	 * Флаг, указывающий, отключен ли компонент выбора времени.
	 * В отключенном состоянии компонент недоступен для взаимодействия.
	 */
	public readonly disabled = input<boolean>(false);
}
