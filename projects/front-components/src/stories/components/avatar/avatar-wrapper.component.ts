import { Component, input } from '@angular/core';
import { AvatarComponent } from '../../../lib/components/avatar/avatar.component';

@Component({
	selector: 'ss-lib-avatar-wrapper',
	standalone: true,
	imports: [AvatarComponent],
	template: `
		<div
			style="padding: 20px; background: #f3f4f6; border-radius: 8px; display: flex; gap: 20px; align-items: center;"
		>
			<ss-lib-avatar
				[src]="src()"
				[username]="username()"
			></ss-lib-avatar>
		</div>
	`,
})
export class AvatarWrapperComponent {
	src = input<string>('');
	username = input<string>('');
}
