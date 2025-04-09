import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarComponent } from '../../avatar/avatar.component';

/**
 * Кнопка с аватаром пользователя
 *
 * @example
 * ```html
 * Параметры:
 *
 * [src]: string - Путь к фото пользователя - необязательный, по умолчанию: ''
 *
 * [username]: string - Имя пользователя - необязательный, по умолчанию: ''
 *
 * <ss-lib-avatar-button
 *   [src]="'path/to/photo.jpg'"
 *   [username]="'John Doe'"
 * ></ss-lib-avatar-button>
 * ```
 */
@Component({
	selector: 'ss-lib-avatar-button',
	standalone: true,
	imports: [AvatarComponent],
	template: ` <div
		tabindex="0"
		class="avatar-button"
	>
		<ss-lib-avatar
			[username]="username()"
			[src]="src()"
		/>
	</div>`,
	styleUrl: './avatar-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarButtonComponent {
	public src = input<string>('');
	public username = input<string>('');
}
