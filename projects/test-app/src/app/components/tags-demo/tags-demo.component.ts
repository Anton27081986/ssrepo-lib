import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TagComponent } from '../../../../../front-components/src/lib/components';
import {
	Colors,
	TagType,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-tags-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Tags</h2>
		<p class="section-description">
			Tag components with different types and color configurations.
		</p>

		<div class="sub-section">
			<h3 class="sub-section-title">Default Tags</h3>
			<div class="component-row">
				<ss-lib-tag [text]="'Заказ/контракт'"></ss-lib-tag>
				<ss-lib-tag [text]="'Документ'"></ss-lib-tag>
				<ss-lib-tag [text]="'Уведомление'"></ss-lib-tag>
			</div>
		</div>

		<div class="sub-section">
			<h3 class="sub-section-title">Dot Tags</h3>
			<div class="component-row">
				<ss-lib-tag
					[text]="'Заказ/контракт'"
					[type]="TagType.Dot"
				></ss-lib-tag>
				<ss-lib-tag
					[text]="'Документ'"
					[type]="TagType.Dot"
				></ss-lib-tag>
				<ss-lib-tag
					[text]="'Уведомление'"
					[type]="TagType.Dot"
				></ss-lib-tag>
			</div>
		</div>

		<div class="sub-section">
			<h3 class="sub-section-title">Custom Colors</h3>
			<div class="component-row">
				<ss-lib-tag
					[text]="'Success'"
					[type]="TagType.Dot"
					[colorConfig]="{
						dotColor: Colors.IconSuccess,
						textColor: Colors.TextSuccess,
						borderColor: Colors.BorderSuccess,
					}"
				></ss-lib-tag>

				<ss-lib-tag
					[text]="'Warning'"
					[type]="TagType.Dot"
					[colorConfig]="{
						dotColor: Colors.IconWarning,
						textColor: Colors.TextWarning,
						borderColor: Colors.BorderWarning,
					}"
				></ss-lib-tag>

				<ss-lib-tag
					[text]="'Error'"
					[type]="TagType.Dot"
					[colorConfig]="{
						dotColor: Colors.IconError,
						textColor: Colors.TextError,
						borderColor: Colors.BorderError,
					}"
				></ss-lib-tag>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TagComponent],
})
export class TagsDemoComponent {
	protected readonly TagType = TagType;
	protected readonly Colors = Colors;
}
