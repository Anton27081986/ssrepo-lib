import type { Signal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { ProgressStateType } from '../../shared/models/types/progress-state-type';
import { CanvasState } from '../canvas/canvas.state';

@Component({
	selector: 'ss-lib-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
	imports: [],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	// animations: [ trigger('state', [            // Пока решили убрать загрузку
	//   state('default', style({ width: '75%' })),
	//   state('average', style({ width: '75%' })),
	//   state('max', style({ width: '100%' })),
	//   transition(
	//     '* <=> *',
	//     animate('0.5s')
	//   ),
	// ]),],
})
export class ProgressComponent {
	private readonly canvasState: CanvasState = inject(CanvasState);
	public inProgressType: Signal<ProgressStateType> = toSignal(
		this.canvasState.inProgressType$,
		{ initialValue: 'default' },
	);

	public state: Signal<ProgressStateType> = computed(() => {
		if (this.inProgressType()) {
			return 'average';
		}

		return 'max';
	});
}
