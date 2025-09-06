export function createDragGhostExample(
	originalRow: HTMLElement,
	rect: DOMRect,
): HTMLElement {
	const table = document.createElement('table');
	const tbody = document.createElement('tbody');
	const clonedRow = originalRow.cloneNode(true) as HTMLTableRowElement;
	const originalCells = originalRow.querySelectorAll('td');
	const clonedCells = clonedRow.querySelectorAll('td');

	table.style.cssText = `
			border-collapse: collapse;
			position: absolute;
			top: -9999px;
			left: -9999px;
			width: ${rect.width}px;
		`;
	clonedRow.style.cssText = `
			background: var(--surface-primary);
			box-shadow: 0px 2px 2px -1px var(--effects-shadows-4),
						0px 4px 6px -2px var(--effects-shadows-3),
						0px 12px 16px -4px var(--effects-shadows-8);
			pointer-events: none;
		`;

	originalCells.forEach((cell: HTMLTableCellElement, index: number) => {
		const width = cell.getBoundingClientRect().width;

		if (clonedCells[index]) {
			(clonedCells[index] as HTMLElement).style.width = `${width}px`;
		}
	});

	tbody.appendChild(clonedRow);
	table.appendChild(tbody);

	return table;
}
