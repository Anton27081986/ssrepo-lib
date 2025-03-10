import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { fadeIn, fadeOut } from '../../core/animations';
import {
	TooltipPosition,
	Colors,
	TextType,
	TextWeight,
} from '../../shared/models';
import { TextComponent } from '../text/text.component';

@Component({
	standalone: true,
	imports: [NgClass, TextComponent],
	template: `
		@if (text()) {
			<div
				class="tooltip"
				[ngClass]="['tooltip--' + position(), 'tooltip--dark']"
				[class.tooltip--visible]="visible()"
				[style.left.px]="left()"
				[style.top.px]="top()"
				@fadeIn
				@fadeOut>
				@if (text()) {
					<ss-lib-text
						[type]="TextType.BodyXs"
						[color]="Colors.TextOnInformation"
						[weight]="TextWeight.Semibold">
						{{ text() }}
					</ss-lib-text>
				}
			</div>
		}
	`,
	animations: [fadeIn, fadeOut],
	styleUrl: './tooltip.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
	public position = signal<TooltipPosition>(TooltipPosition.Bottom);
	public text = signal<string | null>('');
	public left = signal<number>(0);
	public top = signal<number>(0);
	public visible = signal<boolean>(false);

	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
	protected readonly TextWeight = TextWeight;
}
