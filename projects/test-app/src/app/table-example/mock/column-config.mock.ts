import { TableColumnConfig } from '../../../../../front-components/src/lib/components/table/models/table-column-config';

export const columnConfigsMock: TableColumnConfig[] = [
	{
		id: 'dragAction',
		name: 'Drag Action',
		showInDropdown: true,
		visible: true,
	},
	{
		id: 'banner',
		name: 'Banner',
		showInDropdown: true,
		visible: true,
		subColumns: ['order', 'image'],
	},
	{ id: 'order', name: 'Order', showInDropdown: false, visible: true },
	{ id: 'image', name: 'Image', showInDropdown: false, visible: true },
	{ id: 'status', name: 'Status', showInDropdown: true, visible: true },
	{ id: 'action', name: 'Action', showInDropdown: true, visible: true },
	{
		id: 'actionToggle',
		name: 'Action Toggle',
		showInDropdown: true,
		visible: true,
		subColumns: ['user', 'period'],
	},
	{ id: 'user', name: 'User', showInDropdown: false, visible: true },
	{ id: 'period', name: 'Period', showInDropdown: false, visible: true },
];
