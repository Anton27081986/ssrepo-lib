import { Component, input } from '@angular/core';
import { SidebarComponent } from '../../../lib/components/sidebar/sidebar.component';
import { IMenu } from '../../../lib/shared/models';
import { IconType } from '../../../lib/shared/models';

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
	menu = input<IMenu[]>([
		{
			title: 'Главная',
			toolTip: null,
			link: '/home',
			pressed: true,
			icon: IconType.HamburgerMenu,
			subMenu: [],
		},
		{
			title: 'Настройки',
			toolTip: null,
			link: '/settings',
			pressed: false,
			icon: IconType.Settings01,
			subMenu: [
				{
					title: 'Профиль',
					toolTip: null,
					link: '/settings/profile',
					pressed: false,
					icon: IconType.User01,
					subMenu: [],
				},
				{
					title: 'Безопасность',
					toolTip: null,
					link: '/settings/security',
					pressed: false,
					icon: IconType.Eye,
					subMenu: [],
				},
			],
		},
	]);

	onMenuSelect(menu: IMenu) {
		console.log('Selected menu:', menu);
	}
}
