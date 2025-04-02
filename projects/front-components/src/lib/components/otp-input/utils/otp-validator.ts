import {
	AbstractControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';

export function otpValidator(fieldsCount: number): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const form = control as FormGroup;
		const values = Object.values(form.value).join('');
		const isValid = new RegExp(`^\\d{${fieldsCount}}$`).test(values);

		return isValid ? null : { invalidOtp: true };
	};
}
