import { Component, input } from '@angular/core';
import { AvatarComponent } from '../../../lib/components/avatar/avatar.component';

/**
 * Компонент-обертка для демонстрации AvatarComponent в Storybook.
 * Предоставляет интерактивный пример использования аватара с поддержкой
 * изображения и отображения инициалов пользователя.
 */
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
	/**
	 * Путь к изображению аватара.
	 * Если изображение не загружено, будут отображаться инициалы пользователя.
	 */
	public readonly src = input<string>('');

	/**
	 * Имя пользователя для отображения инициалов.
	 * Используется, когда изображение аватара недоступно.
	 */
	public readonly username = input<string>('');
}
