import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import type { IMenu } from '../../../../front-components/src/lib/shared/models';
import {
	Colors,
	IconType,
	TextType,
	TextWeight,
} from '../../../../front-components/src/lib/shared/models';
import {
	CanvasComponent,
	IconComponent,
	TextComponent,
	ToggleIconComponent,
} from '../../../../front-components/src/lib/components';
import { MENU } from '../utils/constants/menu';

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
	private readonly router = inject(Router);

	protected readonly theme: FormControl = new FormControl<boolean>(true);
	protected readonly IconType = IconType;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly MENU = MENU;

	constructor() {
		toSignal(
			this.theme.valueChanges.pipe(
				tap((): void => {
					document.body.classList.toggle('dark');
				}),
			),
		);
	}

	protected selectedMenu(menu: IMenu): void {
		menu.active = true;
		void this.router.navigate([menu.link]);
	}
}
