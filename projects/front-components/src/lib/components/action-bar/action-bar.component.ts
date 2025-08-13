import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ActionBarItemComponent } from './action-bar-item/action-bar-item.component';
import { Colors, ExtraSize, IconType } from '../../shared/models';

/**
 * Компонент панели действий, предназначенный для отображения элементов управления с поддержкой различных размеров и возможности закрытия панели.
 *
 * @example
 * ```html
 * Параметры:
 *
 * [size]: ExtraSize - Размер панели действий - необязательный,
 * по умолчанию: ExtraSize.md
 *
 * [showClose]: boolean - Флаг отображения кнопки закрытия - необязательный,
 * по умолчанию: false
 *
 * (closed): EventEmitter<void> - Событие, вызываемое при закрытии панели
 *
 * <ss-lib-action-bar
 *   [size]="ExtraSize.md"
 *   [showClose]="true"
 *   (closed)="onClose()"
 * >
 *   <ss-lib-action-bar-item
 *     [type]="ActionBarItemType.Default"
 *     [text]="'Действие'"
 *     [leftIconConfig]="{ name: IconType.ArrowRight, color: Colors.IconAction2 }"
 *   ></ss-lib-action-bar-item>
 * </ss-lib-action-bar>
 * ```
 */

@Component({
	selector: 'ss-lib-action-bar',
	standalone: true,
	imports: [ActionBarItemComponent],
	templateUrl: './action-bar.component.html',
	styleUrl: './action-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBarComponent {
	public size = input<ExtraSize.md | ExtraSize.xxs>(ExtraSize.md);
	public readonly showClose = input<boolean>(false);
	public readonly closed = output<void>();

	protected readonly IconType = IconType;
	protected readonly Colors = Colors;

	protected closeActionBar(): void {
		this.closed.emit();
	}
}
