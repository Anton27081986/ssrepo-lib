export interface TableColumnConfig {
	id: string;
	name: string;
	showInDropdown: boolean;
	visible: boolean;
	subGroups?: string[];
	subColumns?: string[];
}
