import { Component, input, TemplateRef } from '@angular/core';
import { CanvasContentComponent } from '../../../lib/components/canvas-content/canvas-content.component';

@Component({
	selector: 'ss-lib-canvas-content-wrapper',
	standalone: true,
	imports: [CanvasContentComponent],
	template: `
		<ss-lib-canvas-content
			[titleRef]="titleRef()"
			[buttonRef]="buttonRef()"
			[contentRef]="contentRef()"
			[viewHeader]="viewHeader()"
		>
			<ng-template #title>
				<h2>Заголовок</h2>
			</ng-template>
			<ng-template #button>
				<button>Кнопка</button>
			</ng-template>
			<ng-template #content>
				<div>Содержимое</div>
			</ng-template>
		</ss-lib-canvas-content>
	`,
})
export class CanvasContentWrapperComponent {
	titleRef = input<TemplateRef<{}> | null>(null);
	buttonRef = input<TemplateRef<{}> | null>(null);
	contentRef = input<TemplateRef<{}> | null>(null);
	viewHeader = input<boolean>(true);
}
