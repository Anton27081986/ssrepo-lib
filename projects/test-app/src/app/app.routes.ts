import type { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { StandComponent } from './stand/stand.component';
import { componentsRoutes } from './components/components.routes';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: StandComponent,
				children: [
					// редирект по умолчанию
					{
						path: '',
						pathMatch: 'full',
						redirectTo: 'components/typography',
					},
					// демо компонентов
					{
						path: 'components',
						children: componentsRoutes,
					},
				],
			},
		],
	},
];
