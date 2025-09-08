import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerComponent } from '../../../../../front-components/src/lib/components';
import { Orientation } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-dividers-demo',
	standalone: true,
	imports: [DividerComponent],
	template: `
		<div class="section">
			<h2 class="section-title">Dividers</h2>
			<p class="section-description">
				Divider component for layout separation.
			</p>
			<div class="component-row">
				<ss-lib-divider class="full-width" />
				<ss-lib-divider
					[style.height.px]="50"
					[orientation]="Orientation.Vertical"
				></ss-lib-divider>
			</div>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividersDemoComponent {
	protected readonly Orientation = Orientation;
}
