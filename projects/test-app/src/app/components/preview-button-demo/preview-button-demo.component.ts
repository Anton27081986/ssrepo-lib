import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PreviewButtonComponent } from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-preview-button-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Preview Button</h2>

		<p class="section-description">
			Specialized buttons for closing previews.
		</p>

		<div class="component-row">
			<ss-lib-preview-button class="spaced"></ss-lib-preview-button>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [PreviewButtonComponent],
})
export class PreviewButtonDemoComponent {}
