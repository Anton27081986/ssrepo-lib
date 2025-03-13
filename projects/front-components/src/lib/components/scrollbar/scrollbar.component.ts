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
	viewChild,
	inject,
} from '@angular/core';
import { DraggableDirective } from './draggable.directive';

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
	public readonly containerRef = viewChild<ElementRef>('container');

	// Vertical scroll calculations
	public readonly verticalScrolled = computed(() =>
		this.calculateScrolled('height', this.scrollTop()),
	);

	public readonly verticalSize = computed(() => this.calculateSize('height'));
	public readonly verticalPosition = computed(
		() => this.verticalScrolled() * (100 - this.verticalSize()),
	);

	public readonly hasVerticalBar = computed(() => this.verticalSize() < 100);

	// Horizontal scroll calculations
	public readonly horizontalScrolled = computed(() =>
		this.calculateScrolled('width', this.scrollLeft()),
	);

	public readonly horizontalSize = computed(() =>
		this.calculateSize('width'),
	);

	public readonly horizontalPosition = computed(
		() => this.horizontalScrolled() * (100 - this.horizontalSize()),
	);

	public readonly hasHorizontalBar = computed(
		() => this.horizontalSize() < 100,
	);

	private scrollListener!: () => void;
	private readonly rafId = signal<number | null>(null);
	private readonly resizeObserver = signal<ResizeObserver | null>(null);
	private readonly scrollTop = signal(0);
	private readonly scrollLeft = signal(0);
	private readonly scrollSize = signal({ width: 0, height: 0 });
	private readonly clientSize = signal({ width: 0, height: 0 });

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

	private calculateScrolled(
		dimension: 'width' | 'height',
		position: number,
	): number {
		const maxScrollOffset =
			this.scrollSize()[dimension] - this.clientSize()[dimension];

		return maxScrollOffset > 0 ? position / maxScrollOffset : 0;
	}

	private calculateSize(dimension: 'width' | 'height'): number {
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
		this.resizeObserver.set(
			new ResizeObserver(() => this.updateDimensions()),
		);

		if (this.containerRef()?.nativeElement) {
			this.resizeObserver()!.observe(this.containerRef()!.nativeElement);
		}

		this.ngZone.runOutsideAngular(() => {
			this.scrollListener = this.renderer.listen(
				this.elementRef.nativeElement,
				'scroll',
				() => {
					if (this.rafId() === null) {
						this.rafId.set(
							requestAnimationFrame(() => {
								this.updateScrollPosition();
								this.rafId.set(null);
							}),
						);
					}
				},
			);
		});

		this.destroyRef.onDestroy(() => {
			if (this.resizeObserver() !== null) {
				this.resizeObserver()!.disconnect();
			}

			this.scrollListener();

			if (this.rafId() !== null) {
				cancelAnimationFrame(this.rafId()!);
			}
		});
	}
}
