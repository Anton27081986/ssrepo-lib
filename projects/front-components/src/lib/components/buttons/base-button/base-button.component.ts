import {
	Component,
	computed,
	effect,
	inject,
	input,
	signal,
	untracked,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { GetColorPipe } from '../pipes';
import {
	BUTTON_ICON_COLORS_RECORD,
	BUTTON_TEXT_COLORS_RECORD,
} from '../constants';
import { hasIcon } from '../util';
import type {
	IStateElement,
	IconType,
	ButtonTypeValues,
} from '../../../shared/models';
import {
	Colors,
	IconPosition,
	StateTypes,
	TextType,
	TextWeight,
	ExtraSize,
} from '../../../shared/models';
import { MapperPipe } from '../../../core/pipes';
import { IconComponent } from '../../icon/icon.component';
import { TextComponent } from '../../text/text.component';
import { ElementStateService } from '../../../shared/services';
import { EMPTY_STATE } from '../../../shared/constants';

@Component({
	selector: 'ss-lib-base-button',
	standalone: true,
	templateUrl: './base-button.component.html',
	styleUrls: ['./base-button.component.scss'],
	imports: [
		NgClass,
		TextComponent,
		GetColorPipe,
		IconComponent,
		MapperPipe,
		MapperPipe,
		IconComponent,
	],
})
export class BaseButtonComponent<T extends ButtonTypeValues> {
	public readonly elementState = inject(ElementStateService);

	public readonly type = input.required<T>();
	public readonly size = input<ExtraSize>(ExtraSize.md);
	public readonly text = input<string | undefined>();
	public readonly icon = input<IconType | null>(null);
	public readonly iconSize = input<string>('20');
	public readonly iconPosition = input<IconPosition>(IconPosition.Start);
	public readonly isActive = input<boolean>(false);
	public readonly disabled = input<boolean>(false);

	public readonly state = signal<IStateElement>(EMPTY_STATE);
	public readonly buttonTextColors = computed(
		() => BUTTON_TEXT_COLORS_RECORD[this.type()!],
	);

	public readonly buttonIconColors = computed(
		() => BUTTON_ICON_COLORS_RECORD[this.type()!],
	);

	public readonly IconPosition = IconPosition;
	public readonly TextType = TextType;
	public readonly TextWeight = TextWeight;
	public readonly Colors = Colors;
	public readonly ButtonSize = ExtraSize;
	public readonly StateTypes = StateTypes;
	protected readonly hasIcon = hasIcon;

	constructor() {
		effect(() => {
			const isActive = this.isActive();

			untracked(() => {
				this.elementState.updateState(
					this.state,
					StateTypes.Hover,
					isActive,
				);
			});
		});
	}
}
