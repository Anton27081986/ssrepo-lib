import { Component, input } from '@angular/core';
import { SidebarComponent } from '../../../lib/components';
import { IMenu } from '../../../lib/shared/models';
import { IconType } from '../../../lib/shared/models';

/**
 * Обертка для компонента Sidebar.
 *
 * @description
 * Компонент-обертка для демонстрации
 * Sidebar в Storybook.
 */
@Component({
	selector: 'ss-lib-sidebar-wrapper',
	standalone: true,
	imports: [SidebarComponent],
	template: `
		<div style="height: 400px; position: relative;">
			<ss-lib-sidebar
				[menu]="menu()"
				(outMenuFromSidebar)="onMenuSelect($event)"
			></ss-lib-sidebar>
		</div>
	`,
})
export class SidebarWrapperComponent {
	/**
	 * Конфигурация меню.
	 *
	 * @description
	 * Массив элементов меню для отображения
	 * в боковой панели.
	 */
	public readonly menu = input<IMenu[]>([
		{
			title: 'Главная',
			link: '/home',
			active: true,
			icon: IconType.HamburgerMenu,
			subMenu: [],
		},
		{
			title: 'Настройки',
			link: '/settings',
			active: false,
			icon: IconType.Settings01,
			subMenu: [
				{
					title: 'Профиль',
					link: '/settings/profile',
					active: false,
					icon: IconType.User01,
					subMenu: [],
				},
				{
					title: 'Безопасность',
					link: '/settings/security',
					active: false,
					icon: IconType.Eye,
					subMenu: [],
				},
			],
		},
	]);

	/**
	 * Обработчик выбора пункта меню.
	 *
	 * @param _menu - Выбранный пункт меню.
	 * @description
	 * Обрабатывает выбор пункта меню.
	 */
	public onMenuSelect(_menu: IMenu): void {
		// Обработка выбранного пункта меню
	}
}
