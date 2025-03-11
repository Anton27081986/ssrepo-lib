import type { InputSignal, TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../buttons';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
	SidebarType,
} from '../../shared/models';
import { CanvasState } from '../canvas/canvas.state';
import { ProgressComponent } from '../progress/progress.component';

@Component({
	selector: 'ss-lib-header',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [NgTemplateOutlet, ButtonComponent, ProgressComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public leftMenuTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public rightMenuTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;
	protected readonly ExtraSize = ExtraSize;

	constructor(public readonly canvasState: CanvasState) {}

	public toggleMenu(): void {
		if (this.canvasState.sidebarType() === SidebarType.Close) {
			this.canvasState.sidebarType.set(SidebarType.Mini);
		} else if (this.canvasState.sidebarType() === SidebarType.Mini) {
			this.canvasState.sidebarType.set(SidebarType.Full);
		} else {
			this.canvasState.sidebarType.set(SidebarType.Mini);
		}
	}
}
