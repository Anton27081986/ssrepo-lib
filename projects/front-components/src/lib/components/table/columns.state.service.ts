import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, map } from 'rxjs';
import type {
	ISkeletonDerivativeThColumn,
	IStoreTableBaseColumn,
} from '../../shared/models';

@Injectable()
export class ColumnsStateService {
	public readonly colsTr$: BehaviorSubject<IStoreTableBaseColumn[]> =
		new BehaviorSubject<IStoreTableBaseColumn[]>([]);

	public readonly visibleCols$: Observable<IStoreTableBaseColumn[]>;

	public readonly skeletonThCols$: Observable<ISkeletonDerivativeThColumn[]>;

	constructor() {
		this.visibleCols$ = this.colsTr$.pipe(
			map((col) => {
				return col.sort(function (a, b) {
					return a.order - b.order;
				});
			}),
		);

		this.skeletonThCols$ = this.visibleCols$.pipe(
			map((cols) => {
				return cols.map((col) => {
					return {
						id: col.id,
						width: col.width,
						skeletonTh: col.skeleton.header,
						order: col.order,
						align: col.align,
						padding: col.padding,
						sticky: col.sticky,
					};
				});
			}),
		);
	}
}
