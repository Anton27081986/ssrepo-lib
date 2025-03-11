import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[fieldCtrl]',
	standalone: true,
})
export class FieldCtrlDirective {
	public readonly ngControl = inject(NgControl, {
		optional: true,
		self: true,
	})!;

	protected elementRef =
		inject<
			ElementRef<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		>(ElementRef);
}
