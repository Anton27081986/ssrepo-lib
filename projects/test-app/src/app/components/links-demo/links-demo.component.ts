import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '../../../../../front-components/src/lib/components';
import {
	ButtonType,
	ExtraSize,
	IconType,
	LinkAppearance,
	IconPosition,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-links-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Links</h2>

		<p class="section-description">
			Link components with inline and standalone appearances.
		</p>

		<div class="sub-section">
			<h3 class="sub-section-title">Inline Links</h3>

			<h4 class="sub-section-subtitle">Type - Link blue</h4>

			<div class="component-row">
				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.sm"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.md"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.lg"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
					[disabled]="true"
				></ss-lib-link>
			</div>

			<h4 class="sub-section-subtitle">Type - Link black</h4>

			<div class="component-row">
				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.sm"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.md"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.lg"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Inline"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
					[disabled]="true"
				></ss-lib-link>
			</div>
		</div>

		<div class="sub-section">
			<h3 class="sub-section-title">Standalone Links</h3>

			<h4 class="sub-section-subtitle">Type - Link blue</h4>

			<div class="component-row">
				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.sm"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.md"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.lg"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlue"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
					[disabled]="true"
				></ss-lib-link>
			</div>

			<h4 class="sub-section-subtitle">Type - Link black</h4>

			<div class="component-row">
				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xs"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.sm"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.md"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.lg"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
				></ss-lib-link>

				<ss-lib-link
					[type]="ButtonType.LinkBlack"
					[linkAppearance]="LinkAppearance.Standalone"
					[text]="'Ссылка'"
					[icon]="IconType.Plus"
					[iconPosition]="IconPosition.Start"
					[size]="ExtraSize.xxl"
					[disabled]="true"
				></ss-lib-link>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LinkComponent],
})
export class LinksDemoComponent {
	protected readonly ButtonType = ButtonType;
	protected readonly LinkAppearance = LinkAppearance;
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconPosition = IconPosition;
}
