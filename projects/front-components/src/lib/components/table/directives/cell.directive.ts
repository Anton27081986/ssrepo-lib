import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
	standalone: true,
	selector: '[ssCell]',
})
export class TableCellDirective {
	public readonly ssCell = input<string>('');

	public readonly template = inject(TemplateRef<Record<string, unknown>>);
}
