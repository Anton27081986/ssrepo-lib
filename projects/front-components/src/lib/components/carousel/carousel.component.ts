import {
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	input,
	model,
	TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
	combineLatest,
	filter,
	fromEvent,
	interval,
	startWith,
	switchMap,
	tap,
} from 'rxjs';
import { ItemDirective } from '../../core/directives';
import { BackdropButtonComponent } from '../buttons';
import { ButtonType, IconType } from '../../shared/models';
import { clamp } from '../../core/utils';
import { PaginationDotsComponent } from '../pagination-dots/pagination-dots.component';

@Component({
	selector: 'ss-lib-carousel',
	standalone: true,
	imports: [
		NgTemplateOutlet,
		BackdropButtonComponent,
		PaginationDotsComponent,
	],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
	public readonly items = contentChildren(ItemDirective, {
		read: TemplateRef,
	});

	public readonly index = model<number>(0);
	public readonly duration = input<number>(0);

	public readonly transform = computed(
		() => `translateX(${100 * -this.index()}%)`,
	);

	protected readonly IconType = IconType;
	protected readonly ButtonType = ButtonType;

	constructor() {
		toSignal(
			combineLatest([
				toObservable(this.duration),
				fromEvent<MouseEvent>(document, 'mousemove').pipe(
					startWith(null),
				),
				fromEvent<MouseEvent>(document, 'mouseup').pipe(
					startWith(null),
				),
			]).pipe(
				filter(([duration, _mousemove, _mouseup]) => duration > 0),
				switchMap(([duration, _mousemove, _mouseup]) =>
					interval(duration).pipe(
						tap(() => {
							return this.updateIndex(
								this.index() === this.items().length - 1
									? 0
									: this.index() + 1,
							);
						}),
					),
				),
			),
		);
	}

	public next(): void {
		if (this.items() && this.index() === this.items().length - 1) {
			return;
		}

		this.updateIndex(this.index() + 1);
	}

	public prev(): void {
		this.updateIndex(this.index() - 1);
	}

	protected isDisabled(index: number): boolean {
		return index < this.index() || index >= this.index() + 1;
	}

	private updateIndex(index: number): void {
		this.index.set(clamp(index, 0, this.items().length - 1));
	}
}
