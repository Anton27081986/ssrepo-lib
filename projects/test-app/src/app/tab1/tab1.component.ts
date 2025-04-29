import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-test-modal',
	standalone: true,
	imports: [],
	template: 'tab1',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Component {}
