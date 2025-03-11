import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import type { IMenu } from '../../shared/models';
import {
	ButtonType,
	IconType,
	NavButton,
	SidebarType,
} from '../../shared/models';
import { CanvasState } from '../canvas/canvas.state';
import { DividerComponent } from '../divider/divider.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { ButtonComponent } from '../buttons';

@Component({
	selector: 'ss-lib-sidebar',
	standalone: true,
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	imports: [
		NgIf,
		DividerComponent,
		ButtonComponent,
		NgForOf,
		NavButtonComponent,
	],
	animations: [
		trigger('animationTrigger', [
			transition('void => *', [
				style({ opacity: 0 }),
				animate('1s', style({ opacity: 1 })),
			]),
			transition('* => void', [animate('0s', style({ opacity: 0 }))]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	public menu: InputSignal<IMenu[]> = input.required<IMenu[]>();

	public outMenuFromSidebar = output<IMenu>();

	protected stateCanvas: CanvasState = inject(CanvasState);

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly SidebarType = SidebarType;
	protected readonly NuvButtonType = NavButton;

	protected sidebarType = this.stateCanvas.sidebarType;

	public closeMenu(): void {
		this.stateCanvas.sidebarType.set(SidebarType.Close);
	}

	public outMenuModel(menu: IMenu): void {
		if (!menu.pressed) {
			const pressed = this.menu().find((item) => item.pressed);

			if (pressed) {
				pressed.pressed = false;
			}

			this.outMenuFromSidebar.emit(menu);
		}
	}
}
