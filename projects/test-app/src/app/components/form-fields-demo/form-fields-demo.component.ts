import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	DatepickerComponent,
	InputComponent,
	FormFieldComponent,
	TextareaComponent,
	TimepickerComponent,
} from '../../../../../front-components/src/lib/components';
import { FieldCtrlDirective } from '../../../../../front-components/src/lib/core/directives';
import {
	ExtraSize,
	IconType,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-form-fields-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Form Fields</h2>
		<p class="section-description">
			Input, textarea, datepicker, and timepicker components with
			validation.
		</p>

		<div class="sub-section">
			<!-- Блок: две колонки инпутов md и lg -->
			<div class="component-row two-columns">
				<!-- Column 1 (md inputs) -->
				<div class="component-column">
					<ss-lib-form-field
						class="spaced"
						[label]="'Input md'"
						[hint]="'Подсказка'"
						[showValidationFieldIcon]="true"
						[clearButton]="true"
						[size]="ExtraSize.md"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.md"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input md'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="true"
						[clearButton]="true"
						[icon]="IconType.Search"
						[size]="ExtraSize.md"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.md"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input md'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="false"
						[clearButton]="true"
						[icon]="IconType.Bell"
						[size]="ExtraSize.md"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.md"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input md'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="true"
						[clearButton]="false"
						[icon]="IconType.Bell"
						[size]="ExtraSize.md"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.md"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input md'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="true"
						[clearButton]="true"
						[icon]="IconType.Bell"
						[size]="ExtraSize.md"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.md"
							[formControl]="inputCtrlDisabled"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>
				</div>

				<!-- Column 2 (lg inputs) -->
				<div class="component-column">
					<ss-lib-form-field
						class="spaced"
						[label]="'Input lg'"
						[hint]="'Подсказка'"
						[showValidationFieldIcon]="true"
						[clearButton]="true"
						[size]="ExtraSize.lg"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.lg"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input lg'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="true"
						[clearButton]="true"
						[icon]="IconType.Search"
						[size]="ExtraSize.lg"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.lg"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input lg'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="false"
						[clearButton]="true"
						[icon]="IconType.Bell"
						[size]="ExtraSize.lg"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.lg"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input lg'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="true"
						[clearButton]="false"
						[icon]="IconType.Bell"
						[size]="ExtraSize.lg"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.lg"
							[formControl]="inputCtrl"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>

					<ss-lib-form-field
						class="spaced"
						[label]="'Input lg'"
						[hint]="'Подсказка'"
						[errorText]="'Неверно заполнено'"
						[tooltipInfoText]="'Какой то тултип'"
						[showValidationFieldIcon]="true"
						[clearButton]="true"
						[icon]="IconType.Bell"
						[size]="ExtraSize.lg"
					>
						<ss-lib-input
							fieldCtrl
							[size]="ExtraSize.lg"
							[formControl]="inputCtrlDisabled"
							[placeholder]="'oleg@mail.ru'"
						/>
					</ss-lib-form-field>
				</div>
			</div>

			<!-- Остальные компоненты -->
			<div class="spaced">
				<ss-lib-form-field
					[label]="'Textarea'"
					[hint]="'Подсказка'"
					[errorText]="'Текст ошибки'"
				>
					<ss-lib-textarea
						fieldCtrl
						[formControl]="textareaCtrl"
					></ss-lib-textarea>
				</ss-lib-form-field>
			</div>

			<div class="spaced">
				<ss-lib-form-field
					[label]="'Textarea disabled'"
					[hint]="'Подсказка'"
					[errorText]="'Текст ошибки'"
				>
					<ss-lib-textarea
						fieldCtrl
						[formControl]="textareaCtrlDisabled"
					></ss-lib-textarea>
				</ss-lib-form-field>
			</div>

			<div class="spaced">
				<ss-lib-form-field
					[label]="'Datepicker'"
					[hint]="'Подсказка'"
					[errorText]="'Неверно заполнено'"
					[showValidationFieldIcon]="true"
				>
					<ss-lib-datepicker
						fieldCtrl
						[formControl]="datepickerCtrl"
						[min]="minDate"
					></ss-lib-datepicker>
				</ss-lib-form-field>
			</div>

			<div class="spaced">
				<ss-lib-form-field
					[label]="'Timepicker'"
					[hint]="'Подсказка'"
					[errorText]="'Неверно заполнено'"
				>
					<ss-lib-timepicker
						fieldCtrl
						[formControl]="timepickerCtrl"
					></ss-lib-timepicker>
				</ss-lib-form-field>

				<pre>{{ timepickerCtrl.value }}</pre>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		DatepickerComponent,
		FieldCtrlDirective,
		FormFieldComponent,
		InputComponent,
		ReactiveFormsModule,
		TimepickerComponent,
		TextareaComponent,
	],
})
export class FormFieldsDemoComponent {
	public inputCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	public inputCtrlDisabled = new FormControl({
		value: 'rrrr',
		disabled: true,
	});

	public textareaCtrl = new FormControl('rrrr', [
		Validators.required,
		Validators.minLength(10),
	]);

	public textareaCtrlDisabled = new FormControl({
		value: 'rrrr',
		disabled: true,
	});

	public minDate = new Date(2025, 7, 12);
	public maxDate = new Date(2025, 7, 20);

	public timepickerCtrl = new FormControl(null);

	public datepickerCtrl: FormControl<Date | null> = new FormControl(
		new Date('2025-07-09T09:42:01.028Z'),
	);

	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
}
