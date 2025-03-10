import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarComponent } from '../../avatar/avatar.component';

/**
 * Параметры:
 *
 * [src]: string - Путь к фото. По умолчанию: `''`
 *
 * [username]: string - Имя пользователя. По умолчанию: `''`
 */
@Component({
	selector: 'ss-lib-avatar-button',
	standalone: true,
	imports: [AvatarComponent],
	template: ` <div
		tabindex="0"
		class="avatar-button">
		<ss-lib-avatar
			[username]="username()"
			[src]="src()" />
	</div>`,
	styleUrl: './avatar-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarButtonComponent {
	public src = input<string>('');
	public username = input<string>('');
}
