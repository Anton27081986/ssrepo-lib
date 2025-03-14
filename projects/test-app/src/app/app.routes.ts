import type { Routes } from '@angular/router';
import { StandComponent } from './stand/stand.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
	{
		path: '',
		canActivate: [],
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: StandComponent,
			},
		],
	},
];
