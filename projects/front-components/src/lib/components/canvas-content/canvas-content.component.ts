import type { TemplateRef } from '@angular/core';
import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'ss-lib-canvas-content',
	standalone: true,
	templateUrl: './canvas-content.component.html',
	imports: [NgTemplateOutlet],
	styleUrl: './canvas-content.component.scss',
})
export class CanvasContentComponent {
	@Input()
	public titleRef: TemplateRef<any> | null = null;

	@Input()
	public buttonRef: TemplateRef<any> | null = null;

	@Input()
	public contentRef: TemplateRef<any> | null = null;
}
