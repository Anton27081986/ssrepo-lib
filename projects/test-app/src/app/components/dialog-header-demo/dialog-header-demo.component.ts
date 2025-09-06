import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	DialogHeaderComponent,
	DividerComponent,
} from '../../../../../front-components/src/lib/components';
import {
	IconType,
	Orientation,
	TagType,
	Status,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-dialog-header-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Dialog header</h2>
		<p class="section-description">Dialog header for modals and popups.</p>

		<div class="sub-section">
			<div
				class="component-row"
				style="flex-direction: column"
			>
				<ss-lib-dialog-header
					[title]="'Заголовок'"
					[description]="'Описание'"
					[viewClose]="true"
					[badge]="{
						icon: IconType.Info,
						status: Status.Success,
					}"
					[tags]="[
						{
							type: TagType.Default,
							text: 'Заказ/контракт',
						},
						{
							type: TagType.Default,
							text: 'Заказ/контракт',
						},
					]"
				/>

				<ss-lib-divider />

				<ss-lib-dialog-header
					[title]="'Заголовок'"
					[description]="'Описание'"
					[orientation]="Orientation.Vertical"
					[viewClose]="true"
					[badge]="{
						icon: IconType.Info,
						status: Status.Success,
					}"
					[tags]="[
						{
							type: TagType.Default,
							text: 'Заказ/контракт',
						},
						{
							type: TagType.Default,
							text: 'Заказ/контракт',
						},
					]"
				/>
			</div>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DialogHeaderComponent, DividerComponent],
})
export class DialogHeaderDemoComponent {
	protected readonly IconType = IconType;
	protected readonly TagType = TagType;
	protected readonly Orientation = Orientation;
	protected readonly Status = Status;
}
