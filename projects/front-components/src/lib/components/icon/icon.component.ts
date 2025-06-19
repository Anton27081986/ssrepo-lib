import type { Signal } from '@angular/core';
import { Component, computed, inject, input } from '@angular/core';
import { NgStyle } from '@angular/common';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import type { IconType } from '../../shared/models';
import { Colors } from '../../shared/models';
import { ICONS } from '../../shared/assets/icons';

/**
 * Компонент для отображения SVG иконок
 *
 * @example
 * ```html
 * Параметры:
 *
 * [icon]: IconType - Название иконки - обязательный
 *
 * [height]: string - Высота иконки - необязательный, по умолчанию: '24'
 *
 * [width]: string - Ширина иконки - необязательный, по умолчанию: '24'
 *
 * [color]: Colors - Цвет иконки - необязательный, по умолчанию: Colors.IconPrimary
 *
 * <ss-lib-icon
 *   [icon]="IconType.Search"
 *   [height]="'32'"
 *   [width]="'32'"
 *   [color]="Colors.IconSecondary"
 * ></ss-lib-icon>
 * ```
 */
@Component({
	selector: 'ss-lib-icon',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
})
export class IconComponent {
	public icon = input.required<IconType>();
	public height = input<string>('24');
	public width = input<string>('24');
	public color = input<Colors>(Colors.IconBody);

	public svg: Signal<SafeHtml | null> = computed(() => {
		const svgData = ICONS.get(this.icon());

		return svgData ? this.sanitizer.bypassSecurityTrustHtml(svgData) : null;
	});

	private readonly sanitizer = inject(DomSanitizer);
}
