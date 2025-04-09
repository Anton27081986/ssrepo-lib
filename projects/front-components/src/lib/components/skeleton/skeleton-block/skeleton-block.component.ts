import type { InputSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { SkeletonConf } from '../../../shared/models';

/**
 * Компонент для отображения блока скелетона.
 *
 * Используется для создания плейсхолдеров загрузки контента.
 * Компонент принимает конфигурацию для настройки внешнего вида
 * и размеров скелетона.
 *
 * @example
 * ```html
 * <ss-lib-skeleton-block [config]="{ width: '100%', height: '20px' }" />
 * ```
 */
@Component({
	selector: 'ss-lib-skeleton-block',
	templateUrl: './skeleton-block.component.html',
	styleUrls: ['./skeleton-block.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonBlockComponent {
	public readonly config: InputSignal<SkeletonConf> =
		input.required<SkeletonConf>();
}
