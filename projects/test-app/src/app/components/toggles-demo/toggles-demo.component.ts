import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	ToggleComponent,
	ToggleIconComponent,
} from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-toggles-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Toggles</h2>
		<p class="section-description">Toggle switches.</p>
		<div class="component-row">
			<ss-lib-toggle
				class="spaced"
				[formControl]="toggleCtrl"
			></ss-lib-toggle>
			<ss-lib-toggle-icon
				class="spaced"
				[formControl]="toggleCtrl"
			></ss-lib-toggle-icon>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ToggleComponent, ToggleIconComponent, ReactiveFormsModule],
})
export class TogglesDemoComponent {
	public toggleCtrl = new FormControl(false);
}
