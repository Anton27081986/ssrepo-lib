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
})
export class ProgressComponent {
	public readonly canvasState: CanvasState = inject(CanvasState);

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
