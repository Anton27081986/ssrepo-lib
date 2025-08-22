import {
	Component,
	computed,
	inject,
	input,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { IconComponent } from '../icon/icon.component';
import {
	IconType,
	NavButton,
	TextType,
	TextWeight,
	IMenu,
	StateTypes,
	Colors,
	IStateElement,
} from '../../shared/models';
import { TextComponent } from '../text/text.component';
import { ElementStateService } from '../../shared/services';
import { EMPTY_STATE } from '../../shared/constants';

interface IColorsConfig {
	text?: Colors;
	icon?: Colors;
}

/**
 * Компонент навигационной кнопки.
 *
 * Предоставляет кнопку навигации с поддержкой иконок, текста и
 * анимированного раскрывающегося меню. Поддерживает различные
 * типы отображения и стили текста.
 *
 * @example
 * ```html
 * <ss-lib-nav-button
 *   [type]="NavButton.NavBase"
 *   [menu]="{ title: 'Меню', items: [...] }"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-nav-button',
	standalone: true,
	templateUrl: './nav-button.component.html',
	styleUrls: ['./nav-button.component.scss'],
	imports: [IconComponent, TextComponent],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('expendedPanel', [
			state('view', style({ display: 'flex' })),
			state('hidden', style({ display: 'none' })),
			transition('initial <=> hidden', animate('0.3s')),
		]),
	],
})
export class NavButtonComponent {
	public readonly elementState = inject(ElementStateService);

	public readonly type = input<NavButton>(NavButton.NavBase);
	public readonly menu = input.required<IMenu>();
	public readonly state = signal<IStateElement>(EMPTY_STATE);

	protected readonly IconType = IconType;
	protected readonly NavButtonType = NavButton;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly StateTypes = StateTypes;

	public readonly colorsConfig = computed((): IColorsConfig => {
		if (this.menu().active) {
			return {
				icon: Colors.IconActionHover2,
				text: Colors.TextActionHover2,
			};
		}

		if (this.state().default) {
			return {
				icon: Colors.IconAction2,
				text: Colors.TextAction2,
			};
		}

		return {
			icon: Colors.IconActionHover2,
			text: Colors.TextActionHover2,
		};
	});
}
