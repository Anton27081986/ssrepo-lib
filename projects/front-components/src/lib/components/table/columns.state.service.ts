import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {
  ISkeletonDerivativeThColumn,
  IStoreTableBaseColumn
} from '../../shared/models/interfaces/store-table-base-column';


@Injectable()
export class ColumnsStateService {
  public readonly colsTr$: BehaviorSubject<IStoreTableBaseColumn[]> = new BehaviorSubject<
    IStoreTableBaseColumn[]
  >([]);

  public readonly visibleCols$: Observable<IStoreTableBaseColumn[]>;

  public readonly skeletonThCols$: Observable<ISkeletonDerivativeThColumn[]>;

  constructor() {
    this.visibleCols$ = this.colsTr$.pipe(
      map(col => {
        return col.sort(function (a, b) {
          return a.order - b.order;
        })
      }),
    );

    this.skeletonThCols$ = this.visibleCols$.pipe(
      map((cols) => {
        return cols.map(col => {
          return {id: col.id, width: col.width, skeletonTh: col.skeleton.header, order: col.order}
        })
      }))
  }
}
