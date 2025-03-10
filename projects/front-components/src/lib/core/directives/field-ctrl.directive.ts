import {
	Directive,
	ElementRef,
	EventEmitter,
	Output,
	Renderer2,
	OnDestroy,
	OnInit,
	NgZone,
	inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[fieldCtrl]',
	standalone: true,
})
export class FieldCtrlDirective {
	protected _elementRef =
		inject<
			ElementRef<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		>(ElementRef);

	ngControl = inject(NgControl, { optional: true, self: true })!;
}
