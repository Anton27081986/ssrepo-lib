import type { InputSignal, TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../buttons/button/button.component';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
} from '../../shared/models';
import type { CanvasState } from '../canvas/canvas.state';
import { SidebarType } from '../../shared/models/enums/sidebar-type';
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
	public leftMenuTemplateRef: InputSignal<TemplateRef<any> | null> =
		input.required();

	public rightMenuTemplateRef: InputSignal<TemplateRef<any> | null> =
		input.required();

	constructor(public readonly canvasState: CanvasState) {}

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;
	protected readonly ExtraSize = ExtraSize;

	public toggleMenu() {
		if (this.canvasState.sidebarType() === SidebarType.Close) {
			this.canvasState.sidebarType.set(SidebarType.Mini);
		} else if (this.canvasState.sidebarType() === SidebarType.Mini) {
			this.canvasState.sidebarType.set(SidebarType.Full);
		} else {
			this.canvasState.sidebarType.set(SidebarType.Mini);
		}
	}
}
