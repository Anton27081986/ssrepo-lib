import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	signal,
} from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { TextComponent } from '../../text/text.component';
import {
	ActionBarItemType,
	Colors,
	ExtraSize,
	IIconConfig,
	IStateElement,
	StateTypes,
	TextType,
	TextWeight,
} from '../../../shared/models';
import { ActionBarComponent } from '../action-bar.component';
import { EMPTY_STATE } from '../../../shared/constants';
import { ElementStateService } from '../../../shared/services';
import { MapperPipe } from '../../../core/pipes';

interface ISizeConfig {
	readonly textType: TextType;
	readonly iconSize: string;
}

@Component({
	selector: 'ss-lib-action-bar-item',
	standalone: true,
	imports: [IconComponent, TextComponent, MapperPipe],
	templateUrl: './action-bar-item.component.html',
	styleUrl: './action-bar-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class]': '"size-" + actionBar?.size() + " type-" + type()',
		'[class.only-icon]':
			'!text() && (leftIconConfig() || rightIconConfig())',

		'(mouseenter)':
			'elementState.updateState(state, StateTypes.Hover, true);',
		'(mouseleave)':
			'elementState.updateState(state, StateTypes.Hover, false)',
		'(mousedown)':
			'elementState.updateState(state, StateTypes.Pressed, true)',
		'(mouseup)':
			'elementState.updateState(state, StateTypes.Pressed, false)',
	},
})
export class ActionBarItemComponent {
	public readonly elementState = inject(ElementStateService);
	public actionBar = inject(ActionBarComponent, {
		host: true,
		optional: true,
	});

	public type = input<ActionBarItemType>(ActionBarItemType.Default);
	public text = input<string>('');
	public leftIconConfig = input<IIconConfig | null, IIconConfig | null>(
		null,
		{
			transform: this.setDefaultIconProps,
		},
	);

	public rightIconConfig = input<IIconConfig | null, IIconConfig | null>(
		null,
		{
			transform: this.setDefaultIconProps,
		},
	);

	public readonly state = signal<IStateElement>(EMPTY_STATE);

	public textColor = computed(() => {
		if (this.type() === ActionBarItemType.Default) {
			if (this.state().hover) {
				return Colors.TextActionHover2;
			}

			if (this.state().pressed) {
				return Colors.TextActionPressed2;
			}
		}

		return Colors.TextAction2;
	});

	public sizeConfig = computed((): ISizeConfig => {
		switch (this.actionBar?.size()) {
			case ExtraSize.xxs:
				return { textType: TextType.BodyXs, iconSize: '16' };
			case ExtraSize.md:
			default: {
				return { textType: TextType.BodySm, iconSize: '20' };
			}
		}
	});

	protected readonly TextWeight = TextWeight;
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly StateTypes = StateTypes;

	public getIconColor(
		state: IStateElement,
		type: ActionBarItemType,
		color: Colors,
	): Colors {
		if (type === ActionBarItemType.Default) {
			if (state.hover) {
				return Colors.IconActionHover2;
			}

			if (state.pressed) {
				return Colors.IconActionPressed2;
			}
		}

		return color;
	}

	public setDefaultIconProps(
		iconConfig: IIconConfig | null,
	): IIconConfig | null {
		if (!iconConfig) {
			return null;
		}

		return {
			...iconConfig,
			color: iconConfig.color ?? Colors.IconAction2,
		};
	}
}
