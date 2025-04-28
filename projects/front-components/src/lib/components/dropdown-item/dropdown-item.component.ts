import {
	ChangeDetectionStrategy,
	Component,
	computed,
	HostListener,
	input,
	output,
	signal,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { TextComponent } from '../text/text.component';
import type { IconType, IDictionaryItemDto } from '../../shared/models';
import { Colors, StateTypes, TextType, TextWeight } from '../../shared/models';

/**
 * Компонент элемента выпадающего списка с поддержкой иконок и состояний
 *
 * @example
 * ```html
 * Параметры:
 *
 * [label]: string - Текст элемента списка - необязательный,
 * по умолчанию: ''
 *
 * [value]: T | string | null - Значение элемента - необязательный,
 * по умолчанию: null
 *
 * [icon]: IconType - Иконка элемента - необязательный,
 * по умолчанию: null
 *
 * [isDestructive]: boolean - Флаг деструктивного действия -
 * необязательный, по умолчанию: false
 *
 * [isDisabled]: boolean - Флаг блокировки элемента - необязательный,
 * по умолчанию: false
 *
 * (valueEvent): T | string | null - Событие выбора элемента -
 * обязательный
 *
 * <ss-lib-dropdown-item
 *   [label]="'Пункт меню'"
 *   [value]="item"
 *   [icon]="IconType.SomeIcon"
 *   [isDestructive]="false"
 *   [isDisabled]="false"
 *   (valueEvent)="onSelect($event)"
 * ></ss-lib-dropdown-item>
 * ```
 */
@Component({
	selector: 'ss-lib-dropdown-item',
	standalone: true,
	imports: [IconComponent, TextComponent],
	templateUrl: './dropdown-item.component.html',
	styleUrl: './dropdown-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent<
	T extends IDictionaryItemDto = IDictionaryItemDto,
> {
	public readonly label = input<string>('');
	public readonly value = input<T | string | null>(null);
	public readonly icon = input<IconType | null>(null);
	public readonly isDestructive = input<boolean>(false);
	public readonly isDisabled = input<boolean>(false);
	public readonly valueEvent = output<T | string | null>();
	public readonly state = signal<StateTypes>(StateTypes.Default);

	public readonly itemText = computed(() => {
		const val = this.value();

		if (typeof val === 'string') {
			return val;
		}

		return val ? val.name : this.label() || '';
	});

	public readonly iconColor = computed(() => {
		if (this.isDisabled()) {
			return Colors.IconDisabled;
		}

		if (this.state() === StateTypes.Hover) {
			return Colors.IconActionHover;
		}

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.IconAction
				: Colors.IconError;
		}

		return Colors.IconAction;
	});

	public readonly textColor = computed(() => {
		if (this.isDisabled()) {
			return Colors.TextDisabled;
		}

		if (this.state() === StateTypes.Hover) {
			return Colors.TextActionHover;
		}

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.TextAction
				: Colors.TextError;
		}

		return Colors.TextAction;
	});

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly StateTypes = StateTypes;

	@HostListener('click')
	public togglePopover(): void {
		this.valueEvent.emit(this.value());
	}

	public checkFocus(event: FocusEvent): void {
		const target = event.target as HTMLElement;

		if (target.matches(':focus-visible')) {
			this.state.set(StateTypes.Focused);
		}
	}
}
