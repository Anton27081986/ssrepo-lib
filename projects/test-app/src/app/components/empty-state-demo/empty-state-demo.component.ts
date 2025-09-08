import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	ButtonComponent,
	EmptyStateComponent,
} from '../../../../../front-components/src/lib/components';
import {
	ExtraSize,
	ButtonType,
	IconType,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-empty-state-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Empty State</h2>
		<p class="section-description">
			Empty state component with custom actions and icon.
		</p>
		<div class="component-row">
			<div class="empty-state__test">
				<ss-lib-empty-state
					[title]="'Заголовок'"
					[description]="
						'Здесь будут баннеры. Нажмите «Добавить баннер», чтобы добавить новый.'
					"
					[badge]="{
						size: ExtraSize.xl,
						icon: IconType.ImagePlus,
					}"
				>
					<div class="component-row">
						<ss-lib-button
							[type]="ButtonType.Secondary"
							[text]="'Вторичная'"
							[size]="ExtraSize.xl"
						></ss-lib-button>

						<ss-lib-button
							[type]="ButtonType.Primary"
							[text]="'Первичная'"
							[size]="ExtraSize.xl"
						></ss-lib-button>
					</div>
				</ss-lib-empty-state>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent, EmptyStateComponent],
})
export class EmptyStateDemoComponent {
	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly ButtonType = ButtonType;
}
