import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	AvatarButtonComponent,
	AvatarComponent,
} from '../../../../../front-components/src/lib/components';
import { ExtraSize } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-avatar-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Avatar</h2>
		<p class="section-description">
			Simple avatar component with image and username
		</p>

		<div class="sub-section">
			<h3 class="sub-section-title">Avatar component</h3>

			<div class="component-row">
				<ss-lib-avatar
					[username]="'ВН'"
					[src]="'https://i.pravatar.cc/300'"
					[size]="ExtraSize.xs"
				></ss-lib-avatar>

				<ss-lib-avatar [size]="ExtraSize.xs" />
			</div>

			<div class="component-row">
				<ss-lib-avatar
					[username]="'ВН'"
					[src]="'https://i.pravatar.cc/300'"
				></ss-lib-avatar>

				<ss-lib-avatar />
			</div>
		</div>

		<div class="sub-section">
			<h3 class="sub-section-title">Avatar Button component</h3>
			<div class="component-row">
				<ss-lib-avatar-button
					[username]="'ВН'"
					[src]="'https://i.pravatar.cc/300'"
					[size]="ExtraSize.xs"
				/>

				<ss-lib-avatar-button [size]="ExtraSize.xs" />
			</div>

			<div class="component-row">
				<ss-lib-avatar-button
					[username]="'ВН'"
					[src]="'https://i.pravatar.cc/300'"
				/>

				<ss-lib-avatar-button />
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AvatarButtonComponent, AvatarComponent],
})
export class AvatarDemoComponent {
	protected readonly ExtraSize = ExtraSize;
}
