import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { IMenu } from '../../../../front-components/src/lib/shared/models';
import {
	Colors,
	IconType,
	NavButton,
	SidebarType,
	TextType,
	TextWeight,
} from '../../../../front-components/src/lib/shared/models';
import {
	CanvasComponent,
	IconComponent,
	TextComponent,
	ToggleIconComponent,
} from '../../../../front-components/src/lib/components';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [
		CanvasComponent,
		RouterOutlet,
		IconComponent,
		TextComponent,
		ReactiveFormsModule,
		ToggleIconComponent,
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent {
	protected exampleMenu: IMenu[] = [
		{
			title: 'Баннеры',
			toolTip: 'Баннеры',
			link: '',
			pressed: true,
			icon: IconType.ImagePlus,
			subMenu: [],
		},
		{
			title: 'Баннеры',
			toolTip: 'Баннеры',
			link: '',
			pressed: false,
			icon: IconType.Alert,
			subMenu: [],
		},
	];

	protected readonly theme: FormControl = new FormControl<boolean>(true);
	protected readonly IconType = IconType;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly SidebarType = SidebarType;
	protected readonly NuvButtonType = NavButton;

	constructor() {
		this.theme.valueChanges.subscribe((val) => {
			const elem = document.body;

			if (val) {
				elem.classList.add('dark');
			} else {
				elem.classList.remove('dark');
			}
		});
	}

	protected selectedMenu(menu: IMenu): void {
		menu.pressed = true;
	}
}
