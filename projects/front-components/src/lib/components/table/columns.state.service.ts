import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {IStoreTableBaseColumn} from '../../shared/models/interfaces/store-table-base-column';

@Injectable({providedIn: 'root'})
export class ColumnsStateService {
	public readonly colsTr$: BehaviorSubject<IStoreTableBaseColumn[]> = new BehaviorSubject<
		IStoreTableBaseColumn[]
	>([]);

	public readonly visibleCols$: Observable<IStoreTableBaseColumn[]>;

	constructor() {
		this.visibleCols$ = this.colsTr$.pipe(
			map(col => {
				return col.sort(function (a, b) {
					return a.order - b.order;
				})
			}),
		);
	}
}
