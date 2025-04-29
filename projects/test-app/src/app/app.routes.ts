import type { Routes } from '@angular/router';
import { StandComponent } from './stand/stand.component';
import { LayoutComponent } from './layout/layout.component';
import { Tab1Component } from './tab1/tab1.component';
import { Tab2Component } from './tab2/tab2.component';

export const routes: Routes = [
	{
		path: '',
		canActivate: [],
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: StandComponent,
				children: [
					{
						path: 'tab1',
						component: Tab1Component,
					},
					{
						path: 'tab2',
						component: Tab2Component,
					},
				],
			},
		],
	},
];
