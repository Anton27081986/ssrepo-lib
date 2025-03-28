import { Component, input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProgressComponent } from '../../../lib/components/progress/progress.component';
import { CanvasState } from '../../../lib/components/canvas/canvas.state';

/**
 * Обертка для компонента Progress.
 *
 * @description
 * Компонент-обертка для демонстрации
 * Progress в Storybook.
 */
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
	/**
	 * Состояние прогресса.
	 *
	 * @default 'default'
	 * @description
	 * Определяет тип отображения прогресса:
	 * - default: стандартное отображение
	 * - average: среднее значение
	 * - max: максимальное значение
	 */
	public readonly state = input<'default' | 'average' | 'max'>('default');
}
