import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import {
	Colors,
	ExtraSize,
	IconType,
	TextType,
	TextWeight,
} from '../../shared/models';

/**
 * Компонент для отображения аватара пользователя с поддержкой изображения
 *
 * @example
 * ```html
 * Параметры:
 *
 * [src]: string - Путь к изображению аватара -
 * необязательный, по умолчанию: ''
 *
 * [username]: string - Имя пользователя для отображения инициалов -
 * необязательный, по умолчанию: ''
 *
 * <ss-lib-avatar
 *   [src]="'path/to/avatar.jpg'"
 *   [username]="'Иван Иванов'"
 * ></ss-lib-avatar>
 * ```
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
	public readonly src = input<string>('');
	public readonly username = input<string>('');
	public readonly size = input<ExtraSize.xs | ExtraSize.md>(ExtraSize.md);

	public showFallbackImage = false;

	public iconSize = computed(() =>
		this.size() === ExtraSize.xs ? '16' : '24',
	);

	public readonly IconType = IconType;
	public readonly Colors = Colors;
	public readonly TextType = TextType;
	public readonly TextWeight = TextWeight;

	public onImageError(): void {
		this.showFallbackImage = true;
	}
}
