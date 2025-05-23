import {
	Component,
	effect,
	input,
	signal,
	WritableSignal,
} from '@angular/core';
import { Colors, HintType, IconType } from '../../shared/models';
import { IconComponent } from '../icon/icon.component';

/**
 * Компонент подсказки с иконкой и различными типами оформления
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: HintType - Тип подсказки, определяющий её визуальное оформление - необязательный,
 * по умолчанию: HintType.Default
 *
 * [icon]: IconType - Тип иконки, отображаемой в подсказке - обязательный
 *
 * [disabled]: boolean - Флаг, определяющий отключено ли состояние подсказки - необязательный,
 * по умолчанию: false
 *
 * <ss-lib-hint
 *   [type]="HintType.Warning"
 *   [icon]="IconType.Alert"
 *   [disabled]="false"
 * ></ss-lib-hint>
 * ```
 */
@Component({
	selector: 'ss-lib-hint',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './hint.component.html',
	styleUrl: './hint.component.scss',
})
export class HintComponent {
	public type = input<HintType>(HintType.Default);
	public icon = input.required<IconType>();
	public disabled = input<boolean>(false);
	protected readonly isHover: WritableSignal<boolean> = signal(false);
	protected color: WritableSignal<Colors> = signal(Colors.IconAction2);

	protected readonly Colors = Colors;

	constructor() {
		effect(() => {
			this.color.set(this.checkColor());
		});
	}

	protected checkColor(): Colors {
		if (this.disabled()) {
			return Colors.IconDisabled;
		}

		if (this.isHover()) {
			switch (this.type()) {
				case HintType.Warning:
					return Colors.IconWarningHover;
				case HintType.Error:
					return Colors.IconErrorHover;
				case HintType.Success:
					return Colors.IconSuccessHover;
				default:
					return Colors.IconActionHover2;
			}
		}

		switch (this.type()) {
			case HintType.Warning:
				return Colors.IconWarning;
			case HintType.Error:
				return Colors.IconError;
			case HintType.Success:
				return Colors.IconSuccess;
			default:
				return Colors.IconAction2;
		}
	}
}
