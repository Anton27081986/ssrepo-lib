import { Directive, inject, Input, input, TemplateRef } from "@angular/core";

@Directive({
	standalone: true,
	selector: '[ssHead]',
})
export class TableHeadDirective<T extends Partial<Record<keyof T, any>>> {
	// public readonly ssHead = input.required<keyof T>();

	@Input({ required: true })
	public ssHead!: keyof T;

	public readonly template = inject(TemplateRef<Record<string, unknown>>);
}
