import { Directive, input } from '@angular/core';

@Directive({
	standalone: true,
	selector: 'table[ssTable]',
	host: {
		'[class.has-border-radius]': 'hasBorderRadius()',
		'[class.show-cell-borders]': 'showCellBorders()',
	},
})
export class TableDirective<T extends Partial<Record<keyof T, never>>> {
	public readonly hasBorderRadius = input<boolean>(true);
	public readonly showCellBorders = input<boolean>(false);
	public columns = input<ReadonlyArray<keyof T>>([]);
}
