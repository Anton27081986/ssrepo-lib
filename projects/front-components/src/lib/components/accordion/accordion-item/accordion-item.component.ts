import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	inject,
	input,
	model,
	signal,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { TextComponent } from '../../text/text.component';
import {
	Colors,
	IconType,
	StateTypes,
	TextType,
	TextWeight,
} from '../../../shared/models';
import { IconComponent } from '../../icon/icon.component';
import { rotateAnimation } from '../../../core/animations';

interface IColorsConfig {
	text: Colors;
	icon: Colors;
}

export const collapseHeight = trigger('collapseHeight', [
	state(
		'true',
		style({
			height: '*',
			opacity: 1,
			overflow: 'hidden',
		}),
	),
	state(
		'false',
		style({
			height: '0px',
			opacity: 0,
			overflow: 'hidden',
		}),
	),
	transition('false => true', [animate('250ms ease-out')]),
	transition('true => false', [animate('250ms ease-in')]),
]);

@Component({
	selector: 'ss-lib-accordion-item',
	standalone: true,
	imports: [TextComponent, IconComponent],
	templateUrl: './accordion-item.component.html',
	styleUrl: './accordion-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [collapseHeight, rotateAnimation],
})
export class AccordionItemComponent {
	public readonly elementRef = inject(ElementRef);

	public readonly title = input<string>('');
	public readonly description = input<string>('');
	public readonly isDisabled = input<boolean>(false);
	public readonly isExpanded = model<boolean>(false);

	public readonly state = signal<StateTypes>(StateTypes.Default);
	public readonly isContentVisible = signal<boolean>(false);
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly Colors = Colors;
	protected readonly IconType = IconType;
	protected readonly StateTypes = StateTypes;

	public readonly colorsConfig = computed((): IColorsConfig => {
		const state = this.state();

		const isDisabled = this.isDisabled();

		if (isDisabled) {
			return {
				icon: Colors.IconDisabled,
				text: Colors.TextDisabled,
			};
		}

		if (state === StateTypes.Hover || this.isExpanded()) {
			return {
				icon: Colors.IconActionHover2,
				text: Colors.TextActionHover2,
			};
		}

		return {
			icon: Colors.IconAction2,
			text: Colors.TextAction2,
		};
	});

	public toggle(): void {
		if (this.isDisabled()) {
			return;
		}

		this.isExpanded.set(!this.isExpanded());

		if (this.isExpanded()) {
			this.isContentVisible.set(true);
		}
	}

	public onCollapseHeightAnimationDone(event: AnimationEvent): void {
		if (event.toState === 'false') {
			this.isContentVisible.set(false);
		}
	}
}
