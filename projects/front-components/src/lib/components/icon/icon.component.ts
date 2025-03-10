import type { Signal } from '@angular/core';
import { Component, computed, inject, input } from '@angular/core';
import { NgStyle } from '@angular/common';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import type { IconType } from '../../shared/models';
import { Colors } from '../../shared/models';
import { ICONS } from '../../shared/assets/icons';

/**
 * Параметры:
 *
 * [icon]: IconType - Название иконки. Обазательное поле
 *
 * [height]: string - Высота. По умолчанию: `24`
 *
 * [width]: string - Ширина. По умолчанию: `24`
 *
 * [color]: Colors - Цвет. По умолчанию: `Colors.IconPrimary`
 */
@Component({
	selector: 'ss-lib-icon',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
})
export class IconComponent {
	private readonly sanitizer = inject(DomSanitizer);

	public icon = input.required<IconType>();
	public height = input<string>('24');
	public width = input<string>('24');
	public color = input<Colors>(Colors.IconPrimary);

	public svg: Signal<SafeHtml | null> = computed(() => {
		const svgData = ICONS.get(this.icon());

		return svgData ? this.sanitizer.bypassSecurityTrustHtml(svgData) : null;
	});
}
