import { Component, input } from '@angular/core';
import { ScrollableBlockComponent } from '../../../lib/components/scrollable-block/scrollable-block.component';

@Component({
	selector: 'ss-lib-scrollable-block-wrapper',
	standalone: true,
	imports: [ScrollableBlockComponent],
	template: `
		<div style="height: 300px; width: 300px; border: 1px solid #ccc;">
			<ss-lib-scrollable-block
				[horizontalScroll]="horizontalScroll()"
				[verticalScroll]="verticalScroll()"
				[disableAutoSize]="disableAutoSize()"
			>
				<div style="padding: 20px;">
					<div
						style="height: 1000px; width: 1000px; background: linear-gradient(45deg, #f3f4f6, #e5e7eb);"
					>
						<div
							style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
						>
							Прокручиваемый контент
						</div>
					</div>
				</div>
			</ss-lib-scrollable-block>
		</div>
	`,
})
export class ScrollableBlockWrapperComponent {
	horizontalScroll = input<boolean>(false);
	verticalScroll = input<boolean>(true);
	disableAutoSize = input<boolean>(false);
}
