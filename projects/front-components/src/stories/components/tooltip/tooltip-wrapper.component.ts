import { Component, input, ViewChild, ElementRef } from '@angular/core';
import { TooltipComponent } from '../../../lib/components';
import { TooltipPosition } from '../../../lib/shared/models';

/**
 * Компонент-обертка для демонстрации TooltipComponent в Storybook.
 * Предоставляет интерактивный пример использования тултипа с настраиваемым положением
 * и автоматическим расчетом позиции относительно элемента.
 */
@Component({
	selector: 'ss-lib-tooltip-wrapper',
	standalone: true,
	imports: [TooltipComponent],
	template: `
		<div
			style="padding: 40px; background: #f3f4f6; border-radius: 8px; display: flex; justify-content: center; align-items: center;"
		>
			<div
				#tooltipContainer
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
	/**
	 * Текст подсказки.
	 * Отображается при наведении курсора на элемент.
	 */
	public readonly text = input<string>('Это подсказка');

	/**
	 * Положение подсказки относительно элемента.
	 * Определяет, с какой стороны будет отображаться тултип.
	 */
	public readonly position = input<TooltipPosition>(TooltipPosition.Bottom);

	/**
	 * Ссылка на компонент тултипа.
	 * Используется для управления видимостью и позиционированием.
	 */
	@ViewChild('tooltip')
	private readonly tooltip!: TooltipComponent;

	/**
	 * Ссылка на контейнер тултипа.
	 * Используется для расчета позиции тултипа относительно элемента.
	 */
	@ViewChild('tooltipContainer')
	private readonly tooltipContainer!: ElementRef<HTMLElement>;

	/**
	 * Показывает тултип и устанавливает его позицию.
	 * Рассчитывает позицию в зависимости от выбранного положения
	 * и размеров контейнера.
	 */
	public showTooltip(): void {
		if (this.tooltip && this.tooltipContainer) {
			this.tooltip.text.set(this.text());
			this.tooltip.position.set(this.position());
			this.tooltip.visible.set(true);

			// Устанавливаем позицию в зависимости от выбранного положения
			const containerRect =
				this.tooltipContainer.nativeElement.getBoundingClientRect();
			const offset = 8; // Отступ от контейнера

			switch (this.position()) {
				case TooltipPosition.Top:
					this.tooltip.top.set(-containerRect.height - offset);
					this.tooltip.left.set(0);
					break;
				case TooltipPosition.Bottom:
					this.tooltip.top.set(containerRect.height + offset);
					this.tooltip.left.set(0);
					break;
				case TooltipPosition.Left:
					this.tooltip.top.set(0);
					this.tooltip.left.set(-containerRect.width - offset);
					break;
				case TooltipPosition.Right:
					this.tooltip.top.set(0);
					this.tooltip.left.set(containerRect.width + offset);
					break;
			}
		}
	}

	/**
	 * Скрывает тултип.
	 * Вызывается при уходе курсора с элемента.
	 */
	public hideTooltip(): void {
		if (this.tooltip) {
			this.tooltip.visible.set(false);
		}
	}
}
