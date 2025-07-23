import {
	Component,
	HostListener,
	input,
	InputSignal,
	signal,
	WritableSignal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
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

@Component({
	selector: 'ss-lib-tab',
	templateUrl: 'tab.component.html',
	styleUrls: ['tab.component.scss'],
	standalone: true,
	imports: [TextComponent, NgIf, IconComponent, PopoverTriggerForDirective],
	animations: [
		trigger('rotate', [
			state('default', style({ transform: 'rotate(0)' })),
			state('rotated', style({ transform: 'rotate(180deg)' })),
			transition('rotated => default', animate('300ms ease')),
			transition('default => rotated', animate('300ms ease')),
		]),
	],
})
export class TabComponent {
	public text: InputSignal<string> = input.required<string>();
	public active: InputSignal<boolean> = input.required<boolean>();
	public disabled: InputSignal<boolean> = input.required<boolean>();

	public viewChevron: InputSignal<boolean> = input.required<boolean>();

	public isHover: WritableSignal<boolean> = signal(false);
	public stateRotate: WritableSignal<'default' | 'rotated'> =
		signal('default');

	public readonly listTabsElem: InputSignal<PopoverContent | null> =
		input.required();

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

	protected getColor(): Colors {
		if (this.disabled()) {
			return Colors.TextDisabled;
		}

		if (this.isHover() && !this.active()) {
			return Colors.TextActionHover2;
		}

		if (this.active()) {
			return Colors.TextInformation;
		}

		return Colors.TextAction2;
	}

	protected checkStatePopover(event: boolean): void {
		event
			? this.stateRotate.set('rotated')
			: this.stateRotate.set('default');
	}
}
