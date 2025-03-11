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
 * Параметры:
 *
 * [type]: ButtonType.CloseLight | ButtonType.CloseDark - Тип. По умолчанию: `ButtonType.CloseLight`
 *
 * [icon]: IconType - Название иконки.  По умолчанию: `IconType.Close`
 *
 * [size]: ExtraSize - Размер кнопки. По умолчанию: `ExtraSize.md`
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
			case ExtraSize.sm:
				return '16';
			case ExtraSize.md:
			case ExtraSize.lg:
				return '20';
			case ExtraSize.xl:
			case ExtraSize.xxl:
				return '24';
		}
	});

	public readonly ButtonType = ButtonType;
}
