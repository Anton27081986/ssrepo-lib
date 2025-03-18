import { input, InputSignal, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'ss-lib-canvas-content',
	standalone: true,
	templateUrl: './canvas-content.component.html',
	imports: [NgTemplateOutlet, NgIf],
	styleUrl: './canvas-content.component.scss',
})
export class CanvasContentComponent {
	public titleRef: InputSignal<TemplateRef<{}> | null> = input.required();
	public buttonRef: InputSignal<TemplateRef<{}> | null> = input.required();
	public contentRef: InputSignal<TemplateRef<{}> | null> = input.required();
	public viewHeader: InputSignal<boolean> = input<boolean>(true);
}
