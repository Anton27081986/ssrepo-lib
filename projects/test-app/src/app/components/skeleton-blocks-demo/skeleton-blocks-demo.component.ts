import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonBlockComponent } from '../../../../../front-components/src/lib/components';

@Component({
	selector: 'app-skeleton-blocks-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Skeleton Blocks</h2>
		<p class="section-description">
			Loading placeholders with different shapes and sizes.
		</p>
		<div class="component-row">
			<ss-lib-skeleton-block
				[config]="{
					width: '180px',
					height: '56px',
					borderRadius: '8px',
				}"
			/>

			<ss-lib-skeleton-block
				[config]="{
					width: '197px',
					height: '14px',
					borderRadius: '4px',
				}"
			/>

			<ss-lib-skeleton-block
				[config]="{
					width: '40px',
					height: '40px',
					borderRadius: '50%',
				}"
			/>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SkeletonBlockComponent],
})
export class SkeletonBlocksDemoComponent {}
