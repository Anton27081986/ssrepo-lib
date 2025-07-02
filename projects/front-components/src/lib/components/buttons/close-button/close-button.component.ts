import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	ViewEncapsulation,
} from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { ButtonType, ExtraSize, IconType } from '../../../shared/models';

type CloseButtonType = ButtonType.CloseLight | ButtonType.CloseDark;

/**
 * Кнопка закрытия с поддержкой светлой и темной темы
 *
 * @example
 * ```html
 * Параметры:
 *
 * [type]: ButtonType.CloseLight | ButtonType.CloseDark - Тип кнопки - необязательный,
 * по умолчанию: ButtonType.CloseLight
 *
 * [icon]: IconType - Название иконки - необязательный, по умолчанию: IconType.Close
 *
 * [size]: ExtraSize - Размер кнопки - необязательный, по умолчанию: ExtraSize.md
 *
 * <ss-lib-close-button
 *   [type]="ButtonType.CloseLight"
 *   [icon]="IconType.Close"
 *   [size]="ExtraSize.md"
 * ></ss-lib-close-button>
 * ```
 */
@Component({
	selector: 'ss-lib-close-button',
	standalone: true,
	imports: [BaseButtonComponent],
	template: `
		<ss-lib-base-button
			[size]="size()"
			[type]="type()"
			[icon]="restrictedIcon()"
			[iconSize]="restrictedIconSize()"
			[iconPosition]="IconPosition.OnlyIcon"
		>
			<ng-content></ng-content>
		</ss-lib-base-button>
	`,
	styleUrl: './close-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CloseButtonComponent extends BaseButtonComponent<CloseButtonType> {
	public override type = input<CloseButtonType>(ButtonType.CloseLight);
	public restrictedIcon = input<IconType>(IconType.Close);

	public restrictedIconSize = computed(() => {
		switch (this.size()) {
			case ExtraSize.xxs:
			case ExtraSize.xs:
				return '16';
			case ExtraSize.sm:
			case ExtraSize.md:
				return '20';
			case ExtraSize.lg:
			case ExtraSize.xl:
			case ExtraSize.xxl:
				return '24';
		}
	});

	public readonly ButtonType = ButtonType;
}
