import type { InputSignal, TemplateRef } from '@angular/core';
import { Component, input, output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ScrollableBlockComponent } from '../scrollable-block/scrollable-block.component';
import { CanvasState } from './canvas.state';
import type { IMenu } from '../../shared/models';

@Component({
	selector: 'ss-lib-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
	providers: [CanvasState],
	imports: [HeaderComponent, SidebarComponent, ScrollableBlockComponent],
	standalone: true,
})
export class CanvasComponent {
	public readonly leftMenuHeaderTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly rightMenuHeaderTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly outMenuFromCanvas = output<IMenu>();

	public readonly contentScrollHorizontal: InputSignal<boolean> =
		input(false);

	public readonly contentScrollVertical: InputSignal<boolean> = input(true);
	public readonly menu: InputSignal<IMenu[]> = input.required<IMenu[]>();
}
