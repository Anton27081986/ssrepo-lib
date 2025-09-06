import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UtilityButtonComponent } from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-utility-buttons-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Utility Buttons</h2>

		<p class="section-description">
			Specialized buttons for specific actions.
		</p>

		<div class="component-row">
			<ss-lib-utility-button class="spaced"></ss-lib-utility-button>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [UtilityButtonComponent],
})
export class UtilityButtonsDemoComponent {}
