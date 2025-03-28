import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../lib/components/badge/badge.component';
import { IconType, Shape, Status } from '../../../lib/shared/models';

/**
 * Обертка для компонента Badge.
 *
 * @description
 * Компонент-обертка для демонстрации
 * Badge в Storybook.
 */
@Component({
	selector: 'ss-lib-badge-wrapper',
	standalone: true,
	imports: [BadgeComponent],
	template: `
		<div
			style="padding: 20px; background: #f3f4f6; border-radius: 8px; display: flex; gap: 20px; align-items: center;"
		>
			<ss-lib-badge [badgeProps]="badgeProps()"></ss-lib-badge>
		</div>
	`,
})
export class BadgeWrapperComponent {
	/**
	 * Свойства бейджа.
	 *
	 * @description
	 * Конфигурация для отображения бейджа.
	 */
	public readonly badgeProps = input({
		icon: IconType.Bell,
		size: 'lg',
		shape: Shape.Square,
		status: Status.Default,
	});
}
