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
 * Параметры:
 *
 * [label]: string | undefined - Label для item. По умолчанию: ''
 *
 * [value]: T | string | null - Данные item. По умолчанию: null
 *
 * [icon]: IconType | null - Название иконки. По умолчанию: null
 *
 * [isDestructive]: boolean - Кнопка удаления. По умолчанию: false
 *
 * [isDisabled]: boolean - Блокировка item. По умолчанию: false
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
	public label = input<string>('');
	public value = input<T | string | null>(null);
	public icon = input<IconType | null>(null);
	public isDestructive = input<boolean>(false);
	public isDisabled = input<boolean>(false);
	public valueEvent = output<T | string | null>();

	public state = signal<StateTypes>(StateTypes.Default);
	public itemText = computed(() => {
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

		if (this.isDestructive()) {
			return this.state() === StateTypes.Default
				? Colors.TextBody2
				: Colors.TextError;
		}

		return Colors.TextBody2;
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
