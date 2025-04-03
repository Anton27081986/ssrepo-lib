import { Component, input } from '@angular/core';
import { NavButtonComponent } from '../../../lib/components/nav-button/nav-button.component';
import { IMenu, NavButton } from '../../../lib/shared/models';

/**
 * Обертка для компонента NavButton.
 *
 * @description
 * Компонент-обертка для демонстрации
 * NavButton в Storybook.
 */
@Component({
	selector: 'ss-lib-nav-button-wrapper',
	standalone: true,
	imports: [NavButtonComponent],
	template: `
		<ss-lib-nav-button
			[type]="type()"
			[menu]="menu()"
		></ss-lib-nav-button>
	`,
})
export class NavButtonWrapperComponent {
	/**
	 * Тип навигационной кнопки.
	 *
	 * @default NavButton.NavBase
	 * @description
	 * Определяет внешний вид и поведение
	 * навигационной кнопки.
	 */
	public readonly type = input<NavButton>(NavButton.NavBase);

	/**
	 * Конфигурация меню.
	 *
	 * @description
	 * Обязательный параметр, содержащий
	 * структуру меню для навигационной кнопки.
	 */
	public readonly menu = input.required<IMenu>();
}
