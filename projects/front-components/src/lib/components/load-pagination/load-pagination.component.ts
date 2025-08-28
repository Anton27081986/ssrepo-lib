import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	InputSignal,
	output,
	signal,
	Signal,
	WritableSignal,
} from '@angular/core';
import { ButtonComponent } from '../buttons';
import { ProgressComponent } from '../progress/progress.component';
import { TextComponent } from '../text/text.component';
import {
	ButtonType,
	Colors,
	ExtraSize,
	TextType,
	IconType,
	IconPosition,
} from '../../shared/models';

/**
 * Компонент пагинации "Показать ещё"
 *
 * Используется для загрузки дополнительных элементов постранично.
 * Отображает кнопку "Показать ещё" и прогресс-бар с текущим состоянием.
 *
 * @example
 * ```html
 * Параметры:
 *
 * [total]: number - Общее количество элементов (обязательный)
 *
 * [offsetInput]: number - Текущий отступ (обязательный)
 *
 * [limit]: number - Размер порции загрузки (обязательный)
 *
 * [itemCount]: number - Количество уже загруженных элементов (обязательный)
 *
 * (changeOffset): number - Событие, вызываемое при изменении отступа
 *
 * <ss-lib-load-pagination
 *   [total]="100"
 *   [offsetInput]="offset"
 *   [limit]="20"
 *   [itemCount]="items.length"
 *   (changeOffset)="onOffsetChange($event)"
 * ></ss-lib-load-pagination>
 * ```
 */

@Component({
	selector: 'ss-lib-load-pagination',
	standalone: true,
	imports: [ButtonComponent, ProgressComponent, TextComponent],
	templateUrl: './load-pagination.component.html',
	styleUrl: './load-pagination.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadPaginationComponent {
	public readonly total: InputSignal<number> = input.required<number>();
	public readonly itemCount: InputSignal<number> = input.required<number>();
	public readonly offsetInput: InputSignal<number> = input.required<number>();
	public readonly limit: InputSignal<number> = input.required<number>();
	public readonly changeOffset = output<number>();

	public readonly offset: WritableSignal<number> = signal<number>(0);

	public readonly loadMoreText: Signal<string> = computed(() => {
		const newOffset = this.itemCount() + this.limit();
		const remaining = this.total() - this.itemCount();

		return newOffset > this.total()
			? `Показать еще ${remaining}`
			: `Показать еще ${this.limit()}`;
	});

	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly ButtonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;

	constructor() {
		effect(() => {
			this.offset.set(this.offsetInput());
		});
	}

	protected get canLoadMore(): boolean {
		return this.itemCount() < this.total();
	}

	protected updateOffset(): void {
		const newOffset = Math.max(
			0,
			Math.min(this.offset() + this.limit(), this.total()),
		);

		this.offset.set(newOffset);
		this.changeOffset.emit(newOffset);
	}
}
