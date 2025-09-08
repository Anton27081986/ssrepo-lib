import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackdropButtonComponent } from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-backdrop-button-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Backdrop Button</h2>

		<p class="section-description">
			Specialized buttons for closing backdrop.
		</p>

		<div class="component-row">
			<ss-lib-backdrop-button class="spaced"></ss-lib-backdrop-button>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [BackdropButtonComponent],
})
export class BackdropButtonDemoComponent {}
