import { TableColumnConfig } from '../../../../../front-components/src/lib/components/table/models';

export const columnConfigsMock: TableColumnConfig[] = [
	{
		id: 'dragAction',
		name: 'Drag Action',
		showInDropdown: true,
		showInHeader: true,
		visible: true,
	},
	{
		id: 'banner',
		name: 'Banner',
		showInDropdown: true,
		showInHeader: true,
		visible: true,
		subColumns: ['order', 'image'],
	},
	{
		id: 'order',
		name: 'Order',
		showInDropdown: false,
		showInHeader: true,
		visible: true,
	},
	{
		id: 'image',
		name: 'Image',
		showInDropdown: false,
		showInHeader: true,
		visible: true,
	},
	{
		id: 'status',
		name: 'Status',
		showInDropdown: true,
		showInHeader: true,
		visible: true,
	},
	{
		id: 'action',
		name: 'Action',
		showInDropdown: true,
		showInHeader: true,
		visible: true,
	},
	{
		id: 'actionToggle',
		name: 'Action Toggle',
		showInDropdown: true,
		showInHeader: true,
		visible: true,
		subColumns: ['user', 'period'],
	},
	{
		id: 'user',
		name: 'User',
		showInDropdown: false,
		showInHeader: true,
		visible: true,
	},
	{
		id: 'period',
		name: 'Period',
		showInDropdown: false,
		showInHeader: true,
		visible: true,
	},
];
