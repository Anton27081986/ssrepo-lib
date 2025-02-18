import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
} from '@angular/core';
import {AsyncPipe, NgForOf, NgStyle} from "@angular/common";
import {ColumnsStateService} from './columns.state.service';
import {TextComponent} from '../text/text.component';
import {Colors, TextType, TextWeight} from '../../shared/models';

@Component({
	selector: 'ss-lib-table',
	templateUrl: 'table.component.html',
	styleUrls: ['table.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		AsyncPipe,
		NgForOf,
		NgStyle,
		TextComponent
	]
})
export class TableComponent {
	@HostBinding('class.ss-lib-table') protected readonly addHostClass = true;
	@Input() public padding: string = '12px';

	@Output() protected readonly changeSortByOn: EventEmitter<string> = new EventEmitter<string>();

	constructor(protected readonly stateColumn: ColumnsStateService) {
	}

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
}
