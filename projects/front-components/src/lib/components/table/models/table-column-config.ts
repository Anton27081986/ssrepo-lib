import { Align } from '../../../shared/models';

export interface TableColumnConfig {
	id: string;
	name: string;
	showInDropdown: boolean;
	showInHeader: boolean;
	visible: boolean;
	stickyColumn?: boolean;
	subGroups?: string[];
	subColumns?: string[];
	minWidth?: string;
	width?: string;
	align?: Align;
	padding?: string;
}
