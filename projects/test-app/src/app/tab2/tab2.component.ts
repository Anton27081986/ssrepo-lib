import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-test-modal',
	standalone: true,
	imports: [],
	template: 'Tab2',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab2Component {}
