import { Component, input } from '@angular/core';
import { TooltipComponent } from '../../../lib/components';
import { TooltipPosition } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-tooltip-wrapper',
	standalone: true,
	imports: [TooltipComponent],
	template: `
		<div
			style="padding: 40px; background: #f3f4f6; border-radius: 8px; display: flex; justify-content: center; align-items: center;"
		>
			<div
				style="position: relative; padding: 8px 16px; background: #e5e7eb; border-radius: 4px; cursor: pointer;"
				(mouseenter)="showTooltip()"
				(mouseleave)="hideTooltip()"
			>
				Наведите курсор
				<ss-lib-tooltip #tooltip></ss-lib-tooltip>
			</div>
		</div>
	`,
})
export class TooltipWrapperComponent {
	text = input<string>('Это подсказка');
	position = input<TooltipPosition>(TooltipPosition.Bottom);

	showTooltip(): void {
		const tooltip = (this as any).tooltip;

		if (tooltip) {
			tooltip.text.set(this.text());
			tooltip.position.set(this.position());
			tooltip.visible.set(true);

			// Устанавливаем позицию в зависимости от выбранного положения
			const tooltipElement = tooltip.elementRef?.nativeElement;

			if (tooltipElement) {
				const rect = tooltipElement.getBoundingClientRect();

				switch (this.position()) {
					case TooltipPosition.Top:
						tooltip.top.set(-rect.height - 8);
						tooltip.left.set(0);
						break;
					case TooltipPosition.Bottom:
						tooltip.top.set(rect.height + 8);
						tooltip.left.set(0);
						break;
					case TooltipPosition.Left:
						tooltip.top.set(0);
						tooltip.left.set(-rect.width - 8);
						break;
					case TooltipPosition.Right:
						tooltip.top.set(0);
						tooltip.left.set(rect.width + 8);
						break;
				}
			}
		}
	}

	hideTooltip(): void {
		const tooltip = (this as any).tooltip;

		if (tooltip) {
			tooltip.visible.set(false);
		}
	}
}
