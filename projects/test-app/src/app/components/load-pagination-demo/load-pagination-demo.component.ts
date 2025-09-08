import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	DividerComponent,
	LoadPaginationComponent,
} from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-load-pagination-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Load Pagination</h2>
		<p class="section-description">
			Load pagination component with a <i>“Show more”</i> button and
			progress indicator.
		</p>

		<div class="sub-section">
			<div
				class="component-row"
				style="flex-direction: column"
			>
				<!-- Example 1 -->
				<ss-lib-load-pagination
					[total]="100"
					[offsetInput]="0"
					[limit]="20"
					[itemCount]="40"
				/>

				<ss-lib-divider />
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DividerComponent, LoadPaginationComponent],
})
export class LoadPaginationDemoComponent {}
