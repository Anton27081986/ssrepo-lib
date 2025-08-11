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
 * <ss-lib-skeleton-block [config]="{ width: '100%', height: '20px', borderRadius: '4px' }" />
 * ```
 */
@Component({
	selector: 'ss-lib-skeleton-block',
	standalone: true,
	template: ` <div class="ss-lib-skeleton-block"></div> `,
	styleUrls: ['./skeleton-block.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.width]': 'config().width',
		'[style.height]': 'config().height',
		'[style.borderRadius]': 'config().borderRadius',
	},
})
export class SkeletonBlockComponent {
	public readonly config: InputSignal<SkeletonConf> =
		input.required<SkeletonConf>();
}
