import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	IconComponent,
	TextComponent,
} from '../../../../../front-components/src/lib/components';
import {
	Colors,
	IconType,
	TextType,
	TextWeight,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-icons-demo',
	standalone: true,
	imports: [IconComponent, TextComponent],
	template: `
		<div class="section">
			<h2 class="section-title">Icons</h2>
			<p class="section-description">Examples of an icon components.</p>
			<div class="component-row">
				@for (icon of iconsList; track icon) {
					<div class="icon-wrapper">
						<ss-lib-icon
							[icon]="IconType[icon]"
							[color]="Colors.IconBody"
						></ss-lib-icon>
						<ss-lib-text
							[type]="TextType.BodyXs"
							[weight]="TextWeight.Regular"
							>{{ icon }}</ss-lib-text
						>
					</div>
				}
			</div>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsDemoComponent {
	protected readonly IconType = IconType;
	protected readonly Colors = Colors;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;

	public get iconsList(): Array<keyof typeof IconType> {
		return Object.keys(IconType) as Array<keyof typeof IconType>;
	}
}
