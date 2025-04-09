import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { IMenu, TooltipPosition } from '../../shared/models';
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
import { TooltipDirective } from '../tooltip/tooltip.directive';

/**
 * Компонент боковой панели с навигационным меню и анимацией
 *
 * @example
 * ```html
 * Параметры:
 *
 * [menu]: IMenu[] - Массив элементов меню - обязательный
 *
 * (outMenuFromSidebar): IMenu - Событие выбора элемента меню
 *
 * <ss-lib-sidebar
 *   [menu]="[
 *     {
 *       id: 1,
 *       title: 'Главная',
 *       icon: IconType.Home,
 *       pressed: false
 *     }
 *   ]"
 *   (outMenuFromSidebar)="onMenuSelect($event)"
 * ></ss-lib-sidebar>
 * ```
 */
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
		TooltipDirective,
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
	public readonly menu = input.required<IMenu[]>();

	public readonly outMenuFromSidebar = output<IMenu>();

	protected readonly stateCanvas = inject(CanvasState);

	protected readonly ButtonType = ButtonType;

	protected readonly IconType = IconType;

	protected readonly SidebarType = SidebarType;

	protected readonly NuvButtonType = NavButton;

	protected readonly sidebarType = this.stateCanvas.sidebarType;

	protected readonly TooltipPosition = TooltipPosition;

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
