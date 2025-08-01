import {
	Component,
	computed,
	input,
	signal,
	WritableSignal,
} from '@angular/core';
import { Colors, IconType, Status } from '../../shared/models';
import { IconComponent } from '../icon/icon.component';

/**
 * Компонент подсказки с иконкой и различными типами оформления
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: Status - Тип подсказки, определяющий её визуальное оформление - необязательный,
 * по умолчанию: Status.Default
 *
 * [icon]: IconType - Тип иконки, отображаемой в подсказке - обязательный
 *
 * [disabled]: boolean - Флаг, определяющий отключено ли состояние подсказки - необязательный,
 * по умолчанию: false
 *
 * <ss-lib-status-icon
 *   [type]="Status.Warning"
 *   [icon]="IconType.Alert"
 *   [disabled]="false"
 * ></ss-lib-status-icon>
 * ```
 */
@Component({
	selector: 'ss-lib-status-icon',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './status-icon.component.html',
	styleUrl: './status-icon.component.scss',
})
export class StatusIconComponent {
	public type = input<Status>(Status.Default);
	public icon = input.required<IconType>();
	public disabled = input<boolean>(false);
	protected readonly isHover: WritableSignal<boolean> = signal(false);

	protected readonly Colors = Colors;

	protected readonly iconColor = computed(() => {
		if (this.disabled()) {
			return Colors.IconDisabled;
		}

		if (this.isHover()) {
			switch (this.type()) {
				case Status.Warning:
					return Colors.IconWarningHover;
				case Status.Error:
					return Colors.IconErrorHover;
				case Status.Success:
					return Colors.IconSuccessHover;
				default:
					return Colors.IconActionHover2;
			}
		}

		switch (this.type()) {
			case Status.Warning:
				return Colors.IconWarning;
			case Status.Error:
				return Colors.IconError;
			case Status.Success:
				return Colors.IconSuccess;
			default:
				return Colors.IconAction2;
		}
	});
}
