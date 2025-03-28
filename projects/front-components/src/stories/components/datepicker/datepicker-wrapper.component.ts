import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	DatepickerComponent,
	FormFieldComponent,
} from '../../../lib/components';
import { FieldCtrlDirective } from '../../../lib/core/directives';
import {
	FIRST_NATIVE_DAY,
	LAST_NATIVE_DAY,
} from '../../../lib/components/calendar/constans';

/**
 * Компонент-обертка для демонстрации DatepickerComponent в Storybook.
 * Предоставляет форму с валидацией и ограничениями на выбор даты,
 * включая поддержку минимальной и максимальной даты.
 */
@Component({
	selector: 'ss-lib-datepicker-wrapper',
	standalone: true,
	imports: [
		DatepickerComponent,
		ReactiveFormsModule,
		FormFieldComponent,
		FieldCtrlDirective,
	],
	template: `
		<ss-lib-form-field
			[label]="'Datepicker'"
			[hint]="'Подсказка'"
			[errorText]="'Неверно заполнено'"
			[showValidationFieldIcon]="true"
		>
			<ss-lib-datepicker
				fieldCtrl
				[formControl]="datepickerCtrl"
				[min]="min()"
				[max]="max()"
			></ss-lib-datepicker>
		</ss-lib-form-field>
	`,
})
export class DatepickerWrapperComponent {
	/**
	 * Контрол формы для управления значением datepicker.
	 * Позволяет отслеживать и изменять выбранную дату.
	 */
	public readonly datepickerCtrl = new FormControl<Date | null>(null);

	/**
	 * Минимальная дата, доступная для выбора.
	 * По умолчанию установлена как FIRST_NATIVE_DAY.
	 */
	public readonly min = input<Date>(FIRST_NATIVE_DAY);

	/**
	 * Максимальная дата, доступная для выбора.
	 * По умолчанию установлена как LAST_NATIVE_DAY.
	 */
	public readonly max = input<Date>(LAST_NATIVE_DAY);
}
