import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {
	ButtonComponent,
	CheckboxComponent,
} from '../../../../../front-components/src/lib/components';
import { ButtonType } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-checkboxes-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Checkboxes</h2>

		<p class="section-description">
			Checkbox components with labels and indeterminate states.
		</p>

		<div
			class="component-row"
			style="flex-direction: column"
		>
			<ss-lib-checkbox
				class="spaced"
				[label]="'Чекбокс для тестирования'"
				[description]="'Текст'"
				[formControl]="checkboxControl"
			></ss-lib-checkbox>
		</div>

		<div class="component-row">
			<ss-lib-button
				[type]="ButtonType.Secondary"
				[text]="'Переключить валидатор requiredTrue'"
				(click)="toggleRequiredValidator()"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Secondary"
				[text]="'Установить кастомный валидатор'"
				(click)="setCustomValidator()"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Secondary"
				[text]="'Очистить валидаторы'"
				(click)="clearValidators()"
			></ss-lib-button>

			<ss-lib-button
				[type]="ButtonType.Secondary"
				[text]="'Сбросить'"
				(click)="resetControl()"
			></ss-lib-button>
		</div>

		<div
			class="component-row"
			style="flex-direction: column"
		>
			<ss-lib-checkbox
				class="spaced"
				[formControl]="masterCheckboxCtrl"
				[indeterminate]="isIndeterminate"
			></ss-lib-checkbox>

			<ss-lib-checkbox
				class="spaced"
				[formControl]="checkBox2"
			></ss-lib-checkbox>

			<ss-lib-checkbox
				class="spaced"
				[formControl]="checkBox3"
			></ss-lib-checkbox>
		</div>

		<div class="component-row">
			<ss-lib-checkbox
				class="spaced"
				[formControl]="checkBox4"
			></ss-lib-checkbox>

			<ss-lib-checkbox
				class="spaced"
				[indeterminate]="true"
				[formControl]="checkBox5"
			></ss-lib-checkbox>

			<ss-lib-checkbox
				class="spaced"
				[formControl]="checkBox6"
			></ss-lib-checkbox>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent, CheckboxComponent, ReactiveFormsModule],
})
export class CheckboxesDemoComponent {
	public checkboxControl = new FormControl(false);
	public isIndeterminate = false;
	public masterCheckboxCtrl = new FormControl(true);
	public checkBox2 = new FormControl(false);
	public checkBox3 = new FormControl(false);
	public checkBox4 = new FormControl({ value: true, disabled: true });
	public checkBox5 = new FormControl({ value: true, disabled: true });
	public checkBox6 = new FormControl({ value: false, disabled: true });

	protected readonly ButtonType = ButtonType;

	constructor() {
		toSignal(
			this.masterCheckboxCtrl.valueChanges.pipe(
				tap((value: boolean | null) => {
					this.checkBox2.setValue(value, { emitEvent: false });
					this.checkBox3.setValue(value, { emitEvent: false });
					this.updateIndeterminateState();
				}),
			),
		);

		toSignal(
			this.checkBox2.valueChanges.pipe(
				tap(() => {
					this.updateMasterCheckbox();
				}),
			),
		);

		toSignal(
			this.checkBox3.valueChanges.pipe(
				tap(() => {
					this.updateMasterCheckbox();
				}),
			),
		);
	}

	// Toggle requiredTrue validator
	public toggleRequiredValidator(): void {
		if (this.checkboxControl.hasValidator(Validators.requiredTrue)) {
			this.checkboxControl.clearValidators();
		} else {
			this.checkboxControl.setValidators(Validators.requiredTrue);
		}

		this.checkboxControl.updateValueAndValidity();
	}

	// Set custom validator
	public setCustomValidator(): void {
		const customValidator = (
			control: AbstractControl,
		): ValidationErrors | null => {
			return control.value === true
				? null
				: { customError: 'Чекбокс должен быть отмечен' };
		};

		this.checkboxControl.setValidators(customValidator);
		this.checkboxControl.updateValueAndValidity();
	}

	// Clear all validators
	public clearValidators(): void {
		this.checkboxControl.clearValidators();
		this.checkboxControl.updateValueAndValidity();
	}

	// Reset control value and state
	public resetControl(): void {
		this.checkboxControl.reset(false);
	}

	private updateMasterCheckbox(): void {
		const checkBox2Value = this.checkBox2.value;
		const checkBox3Value = this.checkBox3.value;

		// Update indeterminate state
		this.updateIndeterminateState();

		// Update master checkbox value
		if (checkBox2Value && checkBox3Value) {
			this.masterCheckboxCtrl.setValue(true, { emitEvent: false });
		} else if (!checkBox2Value && !checkBox3Value) {
			this.masterCheckboxCtrl.setValue(false, { emitEvent: false });
		}
	}

	private updateIndeterminateState(): void {
		const checkBox2Value = !!this.checkBox2.value;
		const checkBox3Value = !!this.checkBox3.value;

		// Indeterminate when some but not all checkboxes are checked
		this.isIndeterminate =
			checkBox2Value !== checkBox3Value ||
			(checkBox2Value && !checkBox3Value) ||
			(!checkBox2Value && checkBox3Value);
	}
}
