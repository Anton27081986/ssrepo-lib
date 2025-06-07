import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'td[ssTd]',
	standalone: true,
	template: '<ng-content />',
	styleUrl: './td.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TdComponent {}
