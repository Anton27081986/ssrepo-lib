import { Component, input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProgressComponent } from '../../../lib/components/progress/progress.component';
import { CanvasState } from '../../../lib/components/canvas/canvas.state';

@Component({
	selector: 'ss-lib-progress-wrapper',
	standalone: true,
	imports: [ProgressComponent],
	template: ` <ss-lib-progress></ss-lib-progress> `,
	providers: [
		{
			provide: CanvasState,
			useValue: {
				inProgressType$: new BehaviorSubject<
					'default' | 'average' | 'max'
				>('default'),
			},
		},
	],
})
export class ProgressWrapperComponent {
	state = input<'default' | 'average' | 'max'>('default');
}
