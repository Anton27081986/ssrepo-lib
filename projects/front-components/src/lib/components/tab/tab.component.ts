import {
	Component,
	computed,
	HostListener,
	input,
	InputSignal,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import { TextComponent } from '../text/text.component';
import {
	Colors,
	IconType,
	PopoverContent,
	TextType,
	TextWeight,
} from '../../shared/models';
import { IconComponent } from '../icon/icon.component';
import { PopoverTriggerForDirective } from '../../core/directives';
import { TagComponent } from '../tag/tag.component';

interface ITabColor {
	text: Colors;
	icon: Colors;
}

@Component({
	selector: 'ss-lib-tab',
	templateUrl: 'tab.component.html',
	styleUrls: ['tab.component.scss'],
	standalone: true,
	imports: [
		TextComponent,
		IconComponent,
		PopoverTriggerForDirective,
		TagComponent,
	],
})
export class TabComponent {
	public text: InputSignal<string> = input.required<string>();
	public icon = input<IconType | undefined>();
	public tag = input<string | undefined>();
	public active: InputSignal<boolean> = input<boolean>(false);
	public disabled: InputSignal<boolean> = input<boolean>(false);
	public viewChevron: InputSignal<boolean> = input<boolean>(false);

	public isHover: WritableSignal<boolean> = signal(false);
	public stateRotate: WritableSignal<boolean> = signal(false);
	public readonly listTabsElem: InputSignal<PopoverContent | null> =
		input.required();

	public tabColor: Signal<ITabColor> = computed(() => {
		if (this.disabled()) {
			return {
				text: Colors.TextDisabled,
				icon: Colors.IconDisabled,
			};
		}

		if (this.isHover() && !this.active()) {
			return {
				text: Colors.TextActionHover2,
				icon: Colors.IconActionHover2,
			};
		}

		if (this.active()) {
			return {
				text: Colors.TextInformation,
				icon: Colors.IconInformation,
			};
		}

		return {
			text: Colors.TextAction2,
			icon: Colors.IconAction2,
		};
	});

	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly IconType = IconType;
	protected readonly TextWeight = TextWeight;

	@HostListener('mouseover', ['$event'])
	protected mouseOver(): void {
		this.isHover.set(true);
	}

	@HostListener('mouseout', ['$event'])
	protected mouseOut(): void {
		this.isHover.set(false);
	}

	protected checkStatePopover(event: boolean): void {
		this.stateRotate.set(event);
	}
}
