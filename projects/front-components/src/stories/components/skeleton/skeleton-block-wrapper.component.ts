import { Component, input } from '@angular/core';
import { SkeletonBlockComponent } from '../../../lib/components/skeleton/skeleton-block/skeleton-block.component';
import { Shape } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-skeleton-block-wrapper',
	standalone: true,
	imports: [SkeletonBlockComponent],
	template: `
		<div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
			<ss-lib-skeleton-block [config]="config()"></ss-lib-skeleton-block>
		</div>
	`,
})
export class SkeletonBlockWrapperComponent {
	config = input({
		width: '200px',
		height: '20px',
		type: Shape.Square,
	});
}
