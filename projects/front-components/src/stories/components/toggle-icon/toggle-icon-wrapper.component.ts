import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleIconComponent } from '../../../lib/components/toggle-icon/toggle-icon.component';
import { IconType } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-toggle-icon-wrapper',
	standalone: true,
	imports: [ToggleIconComponent, ReactiveFormsModule],
	template: `
		<div
			style="padding: 20px; background: #f3f4f6; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 10px;"
		>
			<ss-lib-toggle-icon
				[formControl]="toggleControl"
				[iconTrue]="iconTrue()"
				[iconFalse]="iconFalse()"
			></ss-lib-toggle-icon>
			<div style="color: #666;">
				Текущее значение:
				{{ toggleControl.value ? 'Включено' : 'Выключено' }}
			</div>
		</div>
	`,
})
export class ToggleIconWrapperComponent {
	iconTrue = input<IconType>(IconType.Sun);
	iconFalse = input<IconType>(IconType.Moon);
	initialValue = input<boolean>(false);

	toggleControl = new FormControl(false);

	constructor() {
		if (this.initialValue()) {
			this.toggleControl.setValue(true);
		}
	}
}
