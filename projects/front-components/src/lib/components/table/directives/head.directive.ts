import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
	standalone: true,
	selector: '[ssHead]',
})
export class TableHeadDirective<T extends Partial<Record<keyof T, never>>> {
	public readonly ssHead = input.required<keyof T>();

	public readonly template = inject(TemplateRef<Record<string, unknown>>);
}
