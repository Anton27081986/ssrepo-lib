import { Directive, Output, ElementRef, inject, input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { ScrollbarComponent } from './scrollbar.component';

export type TypedMouseEvent<T extends EventTarget> = MouseEvent & { target: T };

@Directive({
	standalone: true,
	selector: '[draggable]',
})
export class DraggableDirective {
	public readonly elementRef = inject(ElementRef<HTMLElement>);
	public readonly documentRef = inject(DOCUMENT);
	public readonly scrollbar = inject(ScrollbarComponent);

	public draggable = input<'vertical' | 'horizontal'>('vertical');

	@Output() public dragged: Observable<number> = fromEvent<
		TypedMouseEvent<HTMLElement>
	>(this.elementRef.nativeElement, 'mousedown').pipe(
		switchMap((event) => {
			event.preventDefault();
			const { top, left, width, height } =
				event.target.getBoundingClientRect();
			const offsetY = (event.clientY - top) / height;
			const offsetX = (event.clientX - left) / width;

			return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
				map((moveEvent) =>
					this.getScrolled(moveEvent, offsetX, offsetY),
				),
				takeUntil(fromEvent(this.documentRef, 'mouseup')),
			);
		}),
	);

	private getScrolled(
		{ clientX, clientY }: MouseEvent,
		offsetX: number,
		offsetY: number,
	): number {
		const { offsetHeight, offsetWidth } = this.elementRef.nativeElement;
		const { nativeElement } = this.scrollbar.elementRef;
		const { top, left, width, height } =
			nativeElement.getBoundingClientRect();

		const maxScroll = {
			vertical: nativeElement.scrollHeight - height,
			horizontal: nativeElement.scrollWidth - width,
		};

		const scrolled = {
			vertical:
				(clientY - top - offsetHeight * offsetY) /
				(height - offsetHeight),
			horizontal:
				(clientX - left - offsetWidth * offsetX) /
				(width - offsetWidth),
		};

		return this.draggable() === 'vertical'
			? maxScroll.vertical * scrolled.vertical
			: maxScroll.horizontal * scrolled.horizontal;
	}
}
