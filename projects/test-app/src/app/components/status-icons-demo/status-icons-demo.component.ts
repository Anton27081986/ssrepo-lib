import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusIconComponent } from '../../../../../front-components/src/lib/components';
import {
	IconType,
	Status,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-status-icons-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Status Icons</h2>
		<p class="section-description">
			Status Icon components with different statuses.
		</p>
		<div class="component-row">
			<ss-lib-status-icon
				[icon]="IconType.Info"
				[type]="statusType.Default"
			></ss-lib-status-icon>

			<ss-lib-status-icon
				[icon]="IconType.Info"
				[type]="statusType.Success"
			></ss-lib-status-icon>

			<ss-lib-status-icon
				[icon]="IconType.Info"
				[type]="statusType.Warning"
			></ss-lib-status-icon>

			<ss-lib-status-icon
				[icon]="IconType.Info"
				[type]="statusType.Error"
			></ss-lib-status-icon>

			<ss-lib-status-icon
				class="disabled-demo"
				[icon]="IconType.Info"
				[type]="statusType.Warning"
				[disabled]="true"
			></ss-lib-status-icon>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [StatusIconComponent],
})
export class StatusIconsDemoComponent {
	protected readonly IconType = IconType;
	protected readonly statusType = Status;
}
