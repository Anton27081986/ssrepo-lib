import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	computed,
	signal,
	AfterViewInit,
	DestroyRef,
	NgZone,
	Renderer2,
	inject,
} from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Dimension } from '../../shared/models';

/**
 * Интерфейс для размеров элемента.
 */
interface Size {
	width: number;
	height: number;
}

/**
 * Компонент кастомного скроллбара.
 *
 * Предоставляет функциональность скроллинга с кастомным отображением
 * полос прокрутки. Поддерживает как вертикальный, так и горизонтальный
 * скроллинг с автоматическим расчетом размеров и позиций.
 *
 * @example
 * ```html
 * <ss-lib-scrollbar>
 *   <div>Контент для прокрутки</div>
 * </ss-lib-scrollbar>
 * ```
 */
@Component({
	selector: 'ss-lib-scrollbar',
	standalone: true,
	imports: [DraggableDirective],
	templateUrl: './scrollbar.component.html',
	styleUrl: './scrollbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollbarComponent implements AfterViewInit {
	public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
	public readonly verticalScrolled = computed(() =>
		this.calculateScrolled(Dimension.Height, this.scrollTop()),
	);

	public readonly verticalSize = computed(() => {
		const ratio = this.calculateSize(Dimension.Height);

		return Math.max(10, ratio);
	});

	public readonly verticalPosition = computed(
		() => this.verticalScrolled() * (100 - this.verticalSize()),
	);

	public readonly hasVerticalBar = computed(() => this.verticalSize() < 100);
	public readonly horizontalScrolled = computed(() =>
		this.calculateScrolled(Dimension.Width, this.scrollLeft()),
	);

	public readonly horizontalSize = computed(() =>
		this.calculateSize(Dimension.Width),
	);

	public readonly horizontalPosition = computed(
		() => this.horizontalScrolled() * (100 - this.horizontalSize()),
	);

	public readonly hasHorizontalBar = computed(
		() => this.horizontalSize() < 100,
	);

	private scrollListener!: () => void;
	private readonly resizeObserver = signal<ResizeObserver>(
		new ResizeObserver(() => this.updateDimensions()),
	);

	private readonly scrollTop = signal(0);
	private readonly scrollLeft = signal(0);
	private readonly scrollSize = signal<Size>({ width: 0, height: 0 });
	private readonly clientSize = signal<Size>({ width: 0, height: 0 });
	private readonly destroyRef = inject(DestroyRef);
	private readonly ngZone = inject(NgZone);
	private readonly renderer = inject(Renderer2);

	public ngAfterViewInit(): void {
		this.setupObservers();
		this.updateDimensions();
	}

	public onVertical(scrollTop: number): void {
		this.elementRef.nativeElement.scrollTop = scrollTop;
	}

	public onHorizontal(scrollLeft: number): void {
		this.elementRef.nativeElement.scrollLeft = scrollLeft;
	}

	private calculateScrolled(dimension: Dimension, position: number): number {
		const maxScrollOffset =
			this.scrollSize()[dimension] - this.clientSize()[dimension];

		return maxScrollOffset > 0 ? position / maxScrollOffset : 0;
	}

	private calculateSize(dimension: Dimension): number {
		const ratio =
			this.clientSize()[dimension] / this.scrollSize()[dimension];

		return Math.ceil((ratio || 0) * 100);
	}

	private updateDimensions(): void {
		const { scrollWidth, scrollHeight, clientWidth, clientHeight } =
			this.elementRef.nativeElement;

		this.scrollSize.set({ width: scrollWidth, height: scrollHeight });
		this.clientSize.set({ width: clientWidth, height: clientHeight });
	}

	private updateScrollPosition(): void {
		const { scrollTop, scrollLeft } = this.elementRef.nativeElement;

		this.scrollTop.set(scrollTop);
		this.scrollLeft.set(scrollLeft);
	}

	private setupObservers(): void {
		// ResizeObserver для отслеживания изменения размеров контейнера
		if (this.elementRef?.nativeElement) {
			this.resizeObserver()!.observe(this.elementRef.nativeElement);
		}

		const content = this.elementRef.nativeElement.querySelector('.content');
		const mutationObserver = new MutationObserver(() =>
			this.updateDimensions(),
		);

		if (content) {
			mutationObserver.observe(content, {
				childList: true,
				subtree: true,
			});
		}

		let rafId: number | null = null;

		this.ngZone.runOutsideAngular(() => {
			this.scrollListener = this.renderer.listen(
				this.elementRef.nativeElement,
				'scroll',
				() => {
					if (rafId === null) {
						rafId = requestAnimationFrame(() => {
							this.updateScrollPosition();
							rafId = null;
						});
					}
				},
			);
		});

		this.destroyRef.onDestroy(() => {
			this.resizeObserver().disconnect();

			mutationObserver.disconnect();

			this.scrollListener();

			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
		});
	}
}
