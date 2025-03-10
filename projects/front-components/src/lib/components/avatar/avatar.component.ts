import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import { Colors, IconType, TextType, TextWeight } from '../../shared/models';

/**
 * Параметры:
 *
 * [src]: string - Путь к фото. По умолчанию: `''`
 *
 * [username]: string - Имя пользователя. По умолчанию: `''`
 */
@Component({
	selector: 'ss-lib-avatar',
	imports: [IconComponent, NgOptimizedImage, TextComponent],
	standalone: true,
	templateUrl: './avatar.component.html',
	styleUrl: './avatar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
	public src = input<string>('');
	public username = input<string>('');

	public showFallbackImage = false;

	public readonly IconType = IconType;
	public readonly Colors = Colors;
	public readonly TextType = TextType;
	public readonly TextWeight = TextWeight;

	onImageError(): void {
		this.showFallbackImage = true;
	}
}
