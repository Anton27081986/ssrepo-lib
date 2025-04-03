import { Component, input } from '@angular/core';
import { TableComponent } from '../../../lib/components/table/table.component';
import { ColumnsStateService } from '../../../lib/components/table/columns.state.service';
import { IStoreTableBaseColumn } from '../../../lib/shared/models';
import { Shape } from '../../../lib/shared/models';

/**
 * Компонент-обертка для демонстрации TableComponent в Storybook
 * Предоставляет интерактивный пример использования таблицы с настраиваемыми колонками
 * и состоянием загрузки
 */
@Component({
	selector: 'ss-lib-table-wrapper',
	standalone: true,
	imports: [TableComponent],
	providers: [ColumnsStateService],
	template: ` <ss-lib-table [isSkeleton]="isSkeleton()"></ss-lib-table> `,
})
export class TableWrapperComponent {
	/** Флаг, указывающий, отображать ли таблицу в состоянии загрузки */
	public readonly isSkeleton = input<boolean>(false);

	constructor(private readonly columnsStateService: ColumnsStateService) {
		const columns: IStoreTableBaseColumn[] = [
			{
				id: '1',
				title: 'ID',
				order: 1,
				width: '100px',
				align: 'left',
				sticky: false,
				noPadding: false,
				skeleton: {
					header: {
						width: '100%',
						height: '24px',
						type: Shape.Square,
					},
					body: {
						width: '100%',
						height: '24px',
						type: Shape.Square,
					},
				},
			},
			{
				id: '2',
				title: 'Название',
				order: 2,
				width: '200px',
				align: 'left',
				sticky: false,
				noPadding: true,
				skeleton: {
					header: {
						width: '100%',
						height: '24px',
						type: Shape.Square,
					},
					body: {
						width: '100%',
						height: '24px',
						type: Shape.Square,
					},
				},
			},
		];

		this.columnsStateService.colsTr$.next(columns);
	}
}
