import { ChangeDetectionStrategy, Component } from '@angular/core';
import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanvasState } from '../canvas/canvas.state';

/**
 * Компонент индикатора прогресса.
 *
 * Отображает состояние загрузки или прогресса выполнения операции.
 * Поддерживает различные типы отображения (default, average, max)
 * и автоматически обновляется при изменении состояния.
 *
 * @example
 * ```html
 * <ss-lib-progress />
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
	/**
	 * Состояние холста.
	 *
	 * @description
	 * Используется для получения информации о текущем
	 * состоянии прогресса.
	 */
	public readonly canvasState = inject(CanvasState);

	/**
	 * Тип прогресса из состояния холста.
	 *
	 * @description
	 * Сигнал, содержащий текущий тип прогресса,
	 * полученный из состояния холста.
	 * @default 'default'
	 */
	public readonly inProgressType = toSignal(
		this.canvasState.inProgressType$,
		{
			initialValue: 'default',
		},
	);

	/**
	 * Вычисленное состояние прогресса.
	 *
	 * @description
	 * Определяет тип отображения прогресса на основе
	 * текущего состояния. Возвращает 'average' если есть
	 * активный тип прогресса, иначе 'max'.
	 */
	public readonly state = computed(() => {
		if (this.inProgressType()) {
			return 'average';
		}

		return 'max';
	});
}
