import { Component, input } from '@angular/core';
import { LightBoxComponent } from '../../../lib/components/light-box/light-box.component';
import { ModalRef } from '../../../lib/shared/models';

/**
 * Обертка для компонента LightBox.
 *
 * @description
 * Компонент-обертка для демонстрации
 * LightBox в Storybook.
 */
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
				close: () => {
					// Обработка закрытия light box
				},
			},
		},
	],
})
export class LightBoxWrapperComponent {
	/**
	 * URL изображения для отображения.
	 *
	 * @default 'https://picsum.photos/800/600'
	 * @description
	 * Путь к изображению, которое будет показано
	 * в полноэкранном режиме.
	 */
	public readonly src = input<string>('https://picsum.photos/800/600');

	/**
	 * Ширина изображения.
	 *
	 * @default 800
	 * @description
	 * Ширина изображения в пикселях.
	 */
	public readonly width = input<number>(800);

	/**
	 * Высота изображения.
	 *
	 * @default 600
	 * @description
	 * Высота изображения в пикселях.
	 */
	public readonly height = input<number>(600);
}
