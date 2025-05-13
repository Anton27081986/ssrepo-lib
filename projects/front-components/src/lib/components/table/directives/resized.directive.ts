import { Directive, ElementRef, inject, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
	distinctUntilChanged,
	fromEvent,
	map,
	switchMap,
	takeUntil,
	tap,
} from 'rxjs';
import { EMPTY_CLIENT_RECT } from '../../../shared/constants';
import { ssPreventDefault } from '../../../core/utils';

@Directive({
	standalone: true,
	selector: '[ssResized]',
})
export class TableResizedDirective {
	private readonly documentRef = inject(DOCUMENT);
	private readonly elementRef: ElementRef<HTMLElement> = inject(
		ElementRef<HTMLElement>,
	);

	@Output()
	public readonly ssResized = fromEvent(
		this.elementRef.nativeElement,
		'mousedown',
	).pipe(
		ssPreventDefault(),
		switchMap(() => {
			const { width, right } =
				this.elementRef.nativeElement
					.closest('th')
					?.getBoundingClientRect() || EMPTY_CLIENT_RECT;

			return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
				distinctUntilChanged(),
				tap(({ clientX }) => console.log(clientX)),
				map(({ clientX }) => width + clientX - right),
				takeUntil(fromEvent(this.documentRef, 'mouseup')),
			);
		}),
	);
}
