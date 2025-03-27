import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent } from '../../../lib/components/toggle/toggle.component';

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
	initialValue = input<boolean>(false);
	disabled = input<boolean>(false);

	toggleControl = new FormControl(false);

	constructor() {
		if (this.disabled()) {
			this.toggleControl.disable();
		}

		if (this.initialValue()) {
			this.toggleControl.setValue(true);
		}
	}
}
