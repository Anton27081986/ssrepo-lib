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
	public leftMenuHeaderTemplateRef: InputSignal<TemplateRef<any> | null> =
		input.required();

	public rightMenuHeaderTemplateRef: InputSignal<TemplateRef<any> | null> =
		input.required();

	public outMenuFromCanvas = output<IMenu>();

	public contentScrollHorizontal: InputSignal<boolean> = input(false);
	public contentScrollVertical: InputSignal<boolean> = input(true);
	public menu: InputSignal<IMenu[]> = input.required<IMenu[]>();
}
