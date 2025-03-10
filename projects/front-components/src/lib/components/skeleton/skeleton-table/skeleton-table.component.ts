import type { InputSignal, Signal } from "@angular/core";
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgFor } from "@angular/common";
import { TableComponent } from "../../table/table.component";
import { ColumnsStateService } from "../../table/columns.state.service";
import type {
	ISkeletonDerivativeTdTable,
	ISkeletonDerivativeTrTable,
	IStoreTableBaseColumn,
} from "../../../shared/models/interfaces/store-table-base-column";
import { SkeletonBlockComponent } from "../skeleton-block/skeleton-block.component";

@Component({
	selector: "ss-lib-skeleton-table",
	templateUrl: "./skeleton-table.component.html",
	styleUrl: "./skeleton-table.component.scss",
	imports: [TableComponent, NgFor, SkeletonBlockComponent],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTableComponent {
	public countItems: InputSignal<number> = input<number>(7);

	protected stateColumn: ColumnsStateService = inject(ColumnsStateService);

	protected visibleCols: Signal<IStoreTableBaseColumn[]> = toSignal(
		this.stateColumn.visibleCols$,
		{ initialValue: [] },
	);

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

	private generatorTds(): ISkeletonDerivativeTdTable[] {
		return this.visibleCols().map((col) => {
			return {
				id: col.id,
				order: col.order,
				skeletonConfig: col.skeleton.body,
			};
		});
	}
}
