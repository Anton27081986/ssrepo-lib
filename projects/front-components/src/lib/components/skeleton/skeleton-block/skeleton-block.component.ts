import type { InputSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { SkeletonConf } from '../../../shared/models';

@Component({
	selector: 'ss-lib-skeleton-block',
	templateUrl: './skeleton-block.component.html',
	styleUrls: ['./skeleton-block.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonBlockComponent {
	public config: InputSignal<SkeletonConf> = input.required<SkeletonConf>();
}
