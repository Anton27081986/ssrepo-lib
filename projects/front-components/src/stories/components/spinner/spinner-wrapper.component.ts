import { Component, input } from '@angular/core';
import { SpinnerComponent } from '../../../lib/components/spinner/spinner.component';

@Component({
	selector: 'ss-lib-spinner-wrapper',
	standalone: true,
	imports: [SpinnerComponent],
	template: `
		<div
			style="padding: 20px; background: #f3f4f6; border-radius: 8px; display: flex; justify-content: center; align-items: center; min-height: 200px;"
		>
			<ss-lib-spinner
				[displaySpinnerText]="displaySpinnerText()"
			></ss-lib-spinner>
		</div>
	`,
})
export class SpinnerWrapperComponent {
	displaySpinnerText = input<boolean>(false);
}
