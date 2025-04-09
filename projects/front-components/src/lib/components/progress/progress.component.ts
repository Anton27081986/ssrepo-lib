import { ChangeDetectionStrategy, Component } from '@angular/core';
import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanvasState } from '../canvas/canvas.state';

/**
 * Компонент индикатора прогресса с различными состояниями
 *
 * @example
 * ```html
 * Параметры:
 *
 * [inProgressType]: string - Тип индикатора прогресса -
 * необязательный, по умолчанию: 'default'
 *
 * <ss-lib-progress></ss-lib-progress>
 * ```
 */
@Component({
	selector: 'ss-lib-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
	imports: [],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
	public readonly canvasState = inject(CanvasState);

	public readonly inProgressType = toSignal(
		this.canvasState.inProgressType$,
		{
			initialValue: 'default',
		},
	);

	public readonly state = computed(() => {
		if (this.inProgressType()) {
			return 'average';
		}

		return 'max';
	});
}
