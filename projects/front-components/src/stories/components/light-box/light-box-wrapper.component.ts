import { Component, input } from '@angular/core';
import { LightBoxComponent } from '../../../lib/components/light-box/light-box.component';
import { ModalRef } from '../../../lib/shared/models';

@Component({
	selector: 'ss-lib-light-box-wrapper',
	standalone: true,
	imports: [LightBoxComponent],
	template: `
		<div style="padding: 20px; background: #f3f4f6; border-radius: 8px;">
			<ss-lib-light-box></ss-lib-light-box>
		</div>
	`,
	providers: [
		{
			provide: ModalRef,
			useValue: {
				data: {
					src: 'https://picsum.photos/800/600',
					width: 800,
					height: 600,
				},
				close: () => console.log('Light box closed'),
			},
		},
	],
})
export class LightBoxWrapperComponent {
	src = input<string>('https://picsum.photos/800/600');
	width = input<number>(800);
	height = input<number>(600);
}
