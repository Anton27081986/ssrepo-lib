import { Component, inject, input, InputSignal } from '@angular/core';
import {
	AsyncPipe,
	DatePipe,
	NgFor,
	NgStyle,
	NgSwitch,
	NgSwitchCase,
	NgSwitchDefault,
} from '@angular/common';
import { types } from 'sass';
import {
	ColumnsStateService,
	LinkComponent,
	TextComponent,
	ToggleComponent,
	UtilityButtonComponent,
} from '../../../../front-components/src/lib/components';
import { ExampleDataTable } from '../stand/interface/example-data-table';
import {
	ButtonType,
	Colors,
	ExtraSize,
	IconPosition,
	IconType,
	TextType,
	TextWeight,
} from '../../../../front-components/src/lib/shared/models';

export enum BannerRowItemField {
	dragAction = 'dragAction',
	order = 'order',
	image = 'image',
	banner = 'banner',
	status = 'status',
	actionToggle = 'actionToggle',
	user = 'user',
	period = 'period',
	action = 'action',
}

@Component({
	selector: 'tr[app-example-table-tr]',
	standalone: true,
	imports: [
		AsyncPipe,
		NgSwitch,
		UtilityButtonComponent,
		TextComponent,
		DatePipe,
		ToggleComponent,
		NgSwitchCase,
		NgSwitchDefault,
		NgFor,
		LinkComponent,
	],
	templateUrl: './example-table.tr.component.html',
	styleUrl: './example-table-tr.component.scss',
})
export class ExampleTableTrComponent {
	public item: InputSignal<ExampleDataTable> = input.required();
	public state: ColumnsStateService = inject(ColumnsStateService);
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;
	protected readonly ButtonType = ButtonType;
	protected readonly BannerRowItemField = BannerRowItemField;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly types = types;
	protected readonly Colors = Colors;
	protected readonly ExtraSize = ExtraSize;
}
