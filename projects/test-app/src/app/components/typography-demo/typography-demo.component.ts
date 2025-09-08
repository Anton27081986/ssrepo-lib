import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';
import { TextComponent } from '../../../../../front-components/src/lib/components';
import {
	TextType,
	TextWeight,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-typography-demo',
	standalone: true,
	imports: [TextComponent],
	template: `
		<!-- Typography Section -->
		<div class="section">
			<h2 class="section-title">Typography</h2>

			<p class="section-description">
				Various text styles and weights for consistent typography.
			</p>

			<div
				class="component-row"
				style="flex-direction: column"
			>
				<ss-lib-text
					class="spaced"
					[type]="TextType.BodyXs"
				>
					Body XS
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.BodySm"
				>
					Body SM
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.BodyMd"
				>
					Body MD
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.BodyLg"
				>
					Body LG
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.BodyXl"
				>
					Body XL
				</ss-lib-text>
			</div>

			<div
				class="component-row"
				style="flex-direction: column"
			>
				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXs"
				>
					Heading XS
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingSm"
				>
					Heading SM
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingMd"
				>
					Heading MD
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingLg"
				>
					Heading LG
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXl"
				>
					Heading XL
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXxl"
				>
					Heading XXL
				</ss-lib-text>
			</div>

			<div
				class="component-row"
				style="flex-direction: column"
			>
				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXs"
					[weight]="TextWeight.Regular"
				>
					Heading XS Regular
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXs"
					[weight]="TextWeight.Medium"
				>
					Heading XS Medium
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXs"
					[weight]="TextWeight.Semibold"
				>
					Heading XS Semibold
				</ss-lib-text>

				<ss-lib-text
					class="spaced"
					[type]="TextType.HeadingXs"
					[weight]="TextWeight.Bold"
				>
					Heading XS Bold
				</ss-lib-text>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class TypographyDemoComponent {
	protected readonly TextWeight = TextWeight;
	protected readonly TextType = TextType;
}
