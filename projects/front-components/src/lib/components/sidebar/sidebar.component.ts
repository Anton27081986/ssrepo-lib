import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	output,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ExtraSize, IMenu, TooltipPosition } from '../../shared/models';
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
import { COLLAPSE_MENU } from './constants/collapse-menu';
import { MapperPipe } from '../../core/pipes';

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
		DividerComponent,
		ButtonComponent,
		NavButtonComponent,
		TooltipDirective,
		MapperPipe,
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
	protected readonly stateCanvas = inject(CanvasState);

	public readonly menu = input.required<IMenu[]>();
	public readonly outMenuFromSidebar = output<IMenu>();

	protected readonly sidebarType = this.stateCanvas.sidebarType;

	public readonly closeBtnText = computed(() =>
		this.stateCanvas.sidebarType() === SidebarType.Full
			? COLLAPSE_MENU
			: '',
	);

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly SidebarType = SidebarType;
	protected readonly NuvButtonType = NavButton;
	protected readonly TooltipPosition = TooltipPosition;
	protected readonly ExtraSize = ExtraSize;

	public tooltipText(sidebarType: SidebarType, text: string): string {
		return sidebarType === SidebarType.Mini ? text : '';
	}

	public closeMenu(): void {
		this.stateCanvas.sidebarType.set(SidebarType.Close);
	}

	public outMenuModel(menu: IMenu): void {
		if (menu.active) {
			return;
		}

		this.deactivateCurrentMenu();
		this.outMenuFromSidebar.emit(menu);
	}

	private deactivateCurrentMenu(): void {
		const activeItem = this.menu().find((item) => item.active);

		if (activeItem) {
			activeItem.active = false;
		}
	}
}
