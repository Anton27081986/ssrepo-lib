import type { InputSignal } from "@angular/core";
import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	input,
} from "@angular/core";
import { AsyncPipe, NgForOf, NgStyle } from "@angular/common";
import { ColumnsStateService } from "./columns.state.service";
import { TextComponent } from "../text/text.component";
import { Colors, TextType, TextWeight } from "../../shared/models";
import { SkeletonBlockComponent } from "../skeleton/skeleton-block/skeleton-block.component";

@Component({
	selector: "ss-lib-table",
	templateUrl: "table.component.html",
	styleUrls: ["table.component.scss"],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		AsyncPipe,
		NgForOf,
		NgStyle,
		TextComponent,
		SkeletonBlockComponent,
	],
})
export class TableComponent {
	public isSkeleton: InputSignal<boolean> = input<boolean>(false);
	@HostBinding("class.ss-lib-table")
	protected readonly addHostClass = true;

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	constructor(protected readonly stateColumn: ColumnsStateService) {}
}
