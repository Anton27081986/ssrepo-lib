import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	ButtonComponent,
	OtpInputComponent,
} from '../../../../../front-components/src/lib/components';
import { ButtonType } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-otp-input-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">OTP Input</h2>

		<p class="section-description">One-time password input field.</p>
		<div
			class="component-row"
			[style.align-items]="'center'"
		>
			<div [style.width.px]="360">
				<ss-lib-otp-input
					class="spaced"
					[formControl]="otpCtrl"
				></ss-lib-otp-input>
			</div>
		</div>

		<ss-lib-button
			[type]="ButtonType.Primary"
			[text]="'Submit OTP'"
			(click)="submitOtp()"
		/>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent, OtpInputComponent, ReactiveFormsModule],
})
export class OtpInputDemoComponent {
	public otpCtrl = new FormControl('');

	protected readonly ButtonType = ButtonType;

	public submitOtp(): void {
		if (this.otpCtrl.invalid) {
			this.otpCtrl.setErrors(null);

			return;
		}

		this.otpCtrl.setErrors({ invalidOtp: true });
	}
}
