import { Component, input } from '@angular/core';
import { ToastComponent } from '../../../lib/components/toast/toast.component';
import { Toast } from '../../../lib/shared/models';

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
	toast = input.required<Toast>();
}
