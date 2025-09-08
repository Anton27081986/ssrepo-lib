import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../../../front-components/src/lib/components';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-buttons-demo',
	standalone: true,
	imports: [ButtonComponent],
	template: `
		<div class="section">
			<h2 class="section-title">Buttons</h2>
			<p class="section-description">
				Showcases different button types and sizes, including disabled
				states.
			</p>
			<div class="sub-section">
				<h3 class="sub-section-title">Primary Buttons</h3>
				<div class="component-row">
					<ss-lib-button
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.xxs"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.xs"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.sm"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.md"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.lg"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.xl"
					></ss-lib-button>
					<ss-lib-button
						class="disabled-demo"
						[type]="ButtonType.Primary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.lg"
						[disabled]="true"
					></ss-lib-button>
				</div>
			</div>
			<div class="sub-section">
				<h3 class="sub-section-title">Secondary Buttons</h3>
				<div class="component-row">
					<ss-lib-button
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.xxs"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.xs"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.sm"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.md"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.OnlyIcon"
						[size]="ExtraSize.lg"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.xl"
					></ss-lib-button>
					<ss-lib-button
						class="disabled-demo"
						[type]="ButtonType.Secondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.lg"
						[disabled]="true"
					></ss-lib-button>
				</div>
			</div>
			<div class="sub-section">
				<h3 class="sub-section-title">Ghost Buttons</h3>
				<div class="component-row">
					<ss-lib-button
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.xxs"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.xs"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.sm"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.md"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.lg"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.xl"
					></ss-lib-button>
					<ss-lib-button
						class="disabled-demo"
						[type]="ButtonType.Ghost"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.lg"
						[disabled]="true"
					></ss-lib-button>
				</div>
			</div>
			<div class="sub-section">
				<h3 class="sub-section-title">Text Buttons</h3>
				<div class="component-row">
					<ss-lib-button
						[type]="ButtonType.TextPrimary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.sm"
					></ss-lib-button>
					<ss-lib-button
						[type]="ButtonType.TextSecondary"
						[text]="'Пнока'"
						[icon]="IconType.Plus"
						[iconPosition]="IconPosition.End"
						[size]="ExtraSize.sm"
					></ss-lib-button>
				</div>
			</div>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsDemoComponent {
	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;
	protected readonly ExtraSize = ExtraSize;
}
