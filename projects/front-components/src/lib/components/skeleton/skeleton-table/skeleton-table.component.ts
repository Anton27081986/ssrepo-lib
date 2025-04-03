import type { InputSignal, Signal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { TableComponent } from '../../table/table.component';
import { ColumnsStateService } from '../../table/columns.state.service';
import type {
	ISkeletonDerivativeTdTable,
	ISkeletonDerivativeTrTable,
	IStoreTableBaseColumn,
} from '../../../shared/models/interfaces/store-table-base-column';
import { SkeletonBlockComponent } from '../skeleton-block/skeleton-block.component';

/**
 * Компонент для отображения скелетона таблицы.
 *
 * Используется для создания плейсхолдера загрузки таблицы.
 * Компонент генерирует структуру таблицы с указанным количеством
 * строк и колонок, используя конфигурацию из ColumnsStateService.
 *
 * @example
 * ```html
 * <ss-lib-skeleton-table [countItems]="5" />
 * ```
 */
@Component({
	selector: 'ss-lib-skeleton-table',
	templateUrl: './skeleton-table.component.html',
	styleUrl: './skeleton-table.component.scss',
	imports: [TableComponent, NgFor, SkeletonBlockComponent],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTableComponent {
	/**
	 * Количество строк скелетона.
	 *
	 * @default 7
	 * @description
	 * Определяет количество строк, которые будут отображены
	 * в скелетоне таблицы.
	 */
	public readonly countItems: InputSignal<number> = input<number>(7);

	/**
	 * Сгенерированные строки скелетона.
	 *
	 * @description
	 * Сигнал, содержащий массив строк скелетона, сгенерированных
	 * на основе видимых колонок и количества строк.
	 */
	public readonly skeletonTrCols: Signal<ISkeletonDerivativeTrTable[]> =
		computed(() => {
			const trCols: ISkeletonDerivativeTrTable[] = [];

			if (this.visibleCols().length) {
				for (let i = 0; i < this.countItems(); i++) {
					trCols.push({ items: this.generatorTds() });
				}
			}

			return trCols;
		});

	/**
	 * Сервис состояния колонок таблицы.
	 *
	 * @description
	 * Используется для получения информации о видимых колонках
	 * и их конфигурации.
	 */
	protected readonly stateColumn: ColumnsStateService =
		inject(ColumnsStateService);

	/**
	 * Видимые колонки таблицы.
	 *
	 * @description
	 * Сигнал, содержащий массив видимых колонок таблицы,
	 * полученный из сервиса состояния.
	 */
	protected readonly visibleCols: Signal<IStoreTableBaseColumn[]> = toSignal(
		this.stateColumn.visibleCols$,
		{ initialValue: [] },
	);

	/**
	 * Генерирует массив ячеек скелетона для строки.
	 *
	 * @returns Массив ячеек скелетона с конфигурацией из видимых колонок.
	 * @private
	 */
	private generatorTds(): ISkeletonDerivativeTdTable[] {
		return this.visibleCols().map((col) => {
			return {
				id: col.id,
				order: col.order,
				skeletonConfig: col.skeleton.body,
				align: col.align,
				noPadding: col.noPadding,
				sticky: col.sticky,
			};
		});
	}
}
