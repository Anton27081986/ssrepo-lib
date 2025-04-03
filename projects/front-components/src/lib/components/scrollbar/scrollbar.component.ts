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
	/**
	 * Ссылка на DOM-элемент компонента.
	 */
	public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	/**
	 * Вычисленное значение вертикальной прокрутки.
	 *
	 * @description
	 * Возвращает значение от 0 до 1, представляющее
	 * относительную позицию вертикальной прокрутки.
	 */
	public readonly verticalScrolled = computed(() =>
		this.calculateScrolled(Dimension.Height, this.scrollTop()),
	);

	/**
	 * Размер вертикальной полосы прокрутки.
	 *
	 * @description
	 * Вычисляет размер полосы в процентах от высоты
	 * контейнера, с минимальным значением 10%.
	 */
	public readonly verticalSize = computed(() => {
		const ratio = this.calculateSize(Dimension.Height);

		return Math.max(10, ratio);
	});

	/**
	 * Позиция вертикальной полосы прокрутки.
	 *
	 * @description
	 * Вычисляет позицию полосы в процентах от доступного
	 * пространства с учетом размера полосы.
	 */
	public readonly verticalPosition = computed(
		() => this.verticalScrolled() * (100 - this.verticalSize()),
	);

	/**
	 * Флаг наличия вертикальной полосы прокрутки.
	 *
	 * @description
	 * Возвращает true, если контент превышает высоту
	 * контейнера.
	 */
	public readonly hasVerticalBar = computed(() => this.verticalSize() < 100);

	/**
	 * Вычисленное значение горизонтальной прокрутки.
	 *
	 * @description
	 * Возвращает значение от 0 до 1, представляющее
	 * относительную позицию горизонтальной прокрутки.
	 */
	public readonly horizontalScrolled = computed(() =>
		this.calculateScrolled(Dimension.Width, this.scrollLeft()),
	);

	/**
	 * Размер горизонтальной полосы прокрутки.
	 *
	 * @description
	 * Вычисляет размер полосы в процентах от ширины
	 * контейнера.
	 */
	public readonly horizontalSize = computed(() =>
		this.calculateSize(Dimension.Width),
	);

	/**
	 * Позиция горизонтальной полосы прокрутки.
	 *
	 * @description
	 * Вычисляет позицию полосы в процентах от доступного
	 * пространства с учетом размера полосы.
	 */
	public readonly horizontalPosition = computed(
		() => this.horizontalScrolled() * (100 - this.horizontalSize()),
	);

	/**
	 * Флаг наличия горизонтальной полосы прокрутки.
	 *
	 * @description
	 * Возвращает true, если контент превышает ширину
	 * контейнера.
	 */
	public readonly hasHorizontalBar = computed(
		() => this.horizontalSize() < 100,
	);

	/**
	 * Функция для отмены подписки на событие скролла.
	 */
	private scrollListener!: () => void;

	/**
	 * Наблюдатель за изменением размеров элемента.
	 */
	private readonly resizeObserver = signal<ResizeObserver>(
		new ResizeObserver(() => this.updateDimensions()),
	);

	/**
	 * Текущая позиция вертикальной прокрутки.
	 */
	private readonly scrollTop = signal(0);

	/**
	 * Текущая позиция горизонтальной прокрутки.
	 */
	private readonly scrollLeft = signal(0);

	/**
	 * Размеры прокручиваемого контента.
	 */
	private readonly scrollSize = signal<Size>({ width: 0, height: 0 });

	/**
	 * Размеры видимой области.
	 */
	private readonly clientSize = signal<Size>({ width: 0, height: 0 });

	/**
	 * Сервис для очистки ресурсов при уничтожении компонента.
	 */
	private readonly destroyRef = inject(DestroyRef);

	/**
	 * Сервис для выполнения кода вне зоны Angular.
	 */
	private readonly ngZone = inject(NgZone);

	/**
	 * Сервис для манипуляций с DOM.
	 */
	private readonly renderer = inject(Renderer2);

	/**
	 * Инициализация компонента после отрисовки.
	 *
	 * @description
	 * Настраивает наблюдатели за размерами и скроллом,
	 * обновляет начальные размеры.
	 */
	public ngAfterViewInit(): void {
		this.setupObservers();
		this.updateDimensions();
	}

	/**
	 * Обработчик вертикальной прокрутки.
	 *
	 * @param scrollTop - Позиция вертикальной прокрутки
	 */
	public onVertical(scrollTop: number): void {
		this.elementRef.nativeElement.scrollTop = scrollTop;
	}

	/**
	 * Обработчик горизонтальной прокрутки.
	 *
	 * @param scrollLeft - Позиция горизонтальной прокрутки
	 */
	public onHorizontal(scrollLeft: number): void {
		this.elementRef.nativeElement.scrollLeft = scrollLeft;
	}

	/**
	 * Вычисляет относительную позицию прокрутки.
	 *
	 * @param dimension - Измерение (высота или ширина)
	 * @param position - Абсолютная позиция прокрутки
	 * @returns Относительная позиция от 0 до 1
	 * @private
	 */
	private calculateScrolled(dimension: Dimension, position: number): number {
		const maxScrollOffset =
			this.scrollSize()[dimension] - this.clientSize()[dimension];

		return maxScrollOffset > 0 ? position / maxScrollOffset : 0;
	}

	/**
	 * Вычисляет размер полосы прокрутки.
	 *
	 * @param dimension - Измерение (высота или ширина)
	 * @returns Размер полосы в процентах
	 * @private
	 */
	private calculateSize(dimension: Dimension): number {
		const ratio =
			this.clientSize()[dimension] / this.scrollSize()[dimension];

		return Math.ceil((ratio || 0) * 100);
	}

	/**
	 * Обновляет размеры контейнера и контента.
	 *
	 * @private
	 */
	private updateDimensions(): void {
		const { scrollWidth, scrollHeight, clientWidth, clientHeight } =
			this.elementRef.nativeElement;

		this.scrollSize.set({ width: scrollWidth, height: scrollHeight });
		this.clientSize.set({ width: clientWidth, height: clientHeight });
	}

	/**
	 * Обновляет позиции прокрутки.
	 *
	 * @private
	 */
	private updateScrollPosition(): void {
		const { scrollTop, scrollLeft } = this.elementRef.nativeElement;

		this.scrollTop.set(scrollTop);
		this.scrollLeft.set(scrollLeft);
	}

	/**
	 * Настраивает наблюдатели за изменениями.
	 *
	 * @description
	 * Устанавливает наблюдатель за изменением размеров
	 * и слушатель события скролла с оптимизацией
	 * производительности через requestAnimationFrame.
	 * @private
	 */
	private setupObservers(): void {
		if (this.elementRef?.nativeElement) {
			this.resizeObserver()!.observe(this.elementRef!.nativeElement);
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

			this.scrollListener();

			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
		});
	}
}
