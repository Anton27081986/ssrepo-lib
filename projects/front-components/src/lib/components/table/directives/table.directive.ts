import { Directive, Input, input } from "@angular/core";

@Directive({
	standalone: true,
	selector: 'table[ssTable]',
})
export class TableDirective<T extends Partial<Record<keyof T, any>>> {
	public columns = input<ReadonlyArray<keyof T>>([]);

	// @Input()
	// public columns: ReadonlyArray<keyof T> = [];
}
