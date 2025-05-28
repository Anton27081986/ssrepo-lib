import { Directive, input } from '@angular/core';

@Directive({
	standalone: true,
	selector: 'table[ssTable]',
})
export class TableDirective<T extends Partial<Record<keyof T, never>>> {
	public columns = input<ReadonlyArray<keyof T>>([]);
}
