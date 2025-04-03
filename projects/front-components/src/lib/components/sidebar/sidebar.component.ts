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
 * Компонент боковой панели.
 *
 * Предоставляет навигационное меню с возможностью анимации появления/исчезновения.
 * Поддерживает различные типы отображения и взаимодействия с элементами меню.
 *
 * @example
 * ```html
 * <ss-lib-sidebar
 *   [menu]="menuItems"
 *   (outMenuFromSidebar)="handleMenuSelect($event)"
 * />
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
	/**
	 * Массив элементов меню.
	 *
	 * @description
	 * Обязательный параметр, содержащий структуру меню с элементами
	 * навигации и их состоянием.
	 */
	public menu: InputSignal<IMenu[]> = input.required<IMenu[]>();

	/**
	 * Событие выбора элемента меню.
	 *
	 * @description
	 * Эмитит выбранный элемент меню при клике на него.
	 */
	public outMenuFromSidebar = output<IMenu>();

	/**
	 * Состояние холста.
	 *
	 * @description
	 * Используется для управления состоянием боковой панели.
	 */
	protected stateCanvas: CanvasState = inject(CanvasState);

	/**
	 * Константы для типов кнопок.
	 */
	protected ButtonType = ButtonType;

	/**
	 * Константы для типов иконок.
	 */
	protected IconType = IconType;

	/**
	 * Константы для типов боковой панели.
	 */
	protected SidebarType = SidebarType;

	/**
	 * Константы для типов навигационных кнопок.
	 */
	protected NuvButtonType = NavButton;

	/**
	 * Текущий тип боковой панели.
	 *
	 * @description
	 * Определяет текущее состояние отображения боковой панели.
	 */
	protected sidebarType = this.stateCanvas.sidebarType;

	protected readonly TooltipPosition = TooltipPosition;
	/**
	 * Закрывает боковую панель.
	 *
	 * @description
	 * Устанавливает тип боковой панели в состояние "закрыто".
	 */
	public closeMenu(): void {
		this.stateCanvas.sidebarType.set(SidebarType.Close);
	}

	/**
	 * Обрабатывает выбор элемента меню.
	 *
	 * @param menu - Выбранный элемент меню
	 * @description
	 * Сбрасывает состояние предыдущего выбранного элемента
	 * и эмитит новый выбранный элемент.
	 */
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
