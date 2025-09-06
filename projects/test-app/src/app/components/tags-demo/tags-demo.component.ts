import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TagComponent } from '../../../../../front-components/src/lib/components';
import { TagType } from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-tags-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Tags</h2>

		<p class="section-description">Tags</p>

		<div
			class="component-row"
			style="flex-direction: column"
		>
			<ss-lib-tag [text]="'Заказ/контракт'" />

			<ss-lib-tag
				[text]="'Заказ/контракт'"
				[type]="TagType.Dot"
			/>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TagComponent],
})
export class TagsDemoComponent {
	protected readonly TagType = TagType;
}
