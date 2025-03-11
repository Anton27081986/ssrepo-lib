import type { ComponentRef, EmbeddedViewRef, OnDestroy } from '@angular/core';
import {
	ApplicationRef,
	Directive,
	ElementRef,
	HostListener,
	inject,
	Injector,
	input,
	ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipPosition } from '../../shared/models';

/**
 * @description Добавляет всплывающую подсказку для элемента.
 *
 * [position]: TooltipPosition - Расположение. По умолчанию: `TooltipPosition.Bottom`
 *
 * [tooltipText]: string | null - Текст. По умолчанию: `null`
 */

@Directive({
	selector: '[ss-lib-tooltip]',
	standalone: true,
})
export class TooltipDirective implements OnDestroy {
	public position = input<TooltipPosition>(TooltipPosition.Bottom);
	public tooltipText = input<string | null>(null);

	private readonly elementRef = inject(ElementRef);
	private readonly appRef = inject(ApplicationRef);
	private readonly injector = inject(Injector);
	private readonly viewContainerRef = inject(ViewContainerRef);

	private componentRef: ComponentRef<TooltipComponent> | null = null;

	@HostListener('mouseenter')
	public onMouseEnter(): void {
		if (!this.componentRef) {
			this.createTooltipComponent();
		}
	}

	@HostListener('mouseleave')
	public onMouseLeave(): void {
		this.destroy();
	}

	public ngOnDestroy(): void {
		this.destroy();
	}

	private createTooltipComponent(): void {
		this.componentRef = this.viewContainerRef.createComponent(
			TooltipComponent,
			{ injector: this.injector },
		);
		this.appendTooltipToBody();
		this.setTooltipComponentProperties();
	}

	private setTooltipComponentProperties(): void {
		if (!this.componentRef) {
			return;
		}

		const { left, right, top, bottom } =
			this.elementRef.nativeElement.getBoundingClientRect();
		const componentInstance = this.componentRef.instance;

		componentInstance.text.set(this.tooltipText());
		componentInstance.position.set(this.position());

		const position = this.calculateTooltipPosition(
			left,
			right,
			top,
			bottom,
		);

		componentInstance.left.set(position.left);
		componentInstance.top.set(position.top);
	}

	private calculateTooltipPosition(
		left: number,
		right: number,
		top: number,
		bottom: number,
	): { left: number; top: number } {
		const position = { left: 0, top: 0 };

		switch (this.position()) {
			case TooltipPosition.BottomRight:
			case TooltipPosition.BottomLeft:
			case TooltipPosition.Bottom:
				position.left = Math.round((right - left) / 2 + left);
				position.top = Math.round(bottom);
				break;
			case TooltipPosition.TopRight:
			case TooltipPosition.TopLeft:
			case TooltipPosition.Top:
				position.left = Math.round((right - left) / 2 + left);
				position.top = Math.round(top);
				break;
			case TooltipPosition.Right:
				position.left = Math.round(right);
				position.top = Math.round(top + (bottom - top) / 2);
				break;
			case TooltipPosition.Left:
				position.left = Math.round(left);
				position.top = Math.round(top + (bottom - top) / 2);
				break;
		}

		return position;
	}

	private appendTooltipToBody(): void {
		if (this.componentRef) {
			const tooltipDOMElement = (
				this.componentRef.hostView as EmbeddedViewRef<HTMLElement[]>
			).rootNodes[0] as HTMLElement;

			document.body.appendChild(tooltipDOMElement);
			this.showTooltip();
		}
	}

	private showTooltip(): void {
		if (this.componentRef) {
			this.componentRef.instance.visible.set(true);
		}
	}

	private destroy(): void {
		if (this.componentRef) {
			this.appRef.detachView(this.componentRef.hostView);
			this.componentRef.destroy();
			this.componentRef = null;
		}
	}
}
