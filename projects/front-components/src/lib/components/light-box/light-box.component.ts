import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ILightBoxData, ModalRef } from '../../shared/models';
import { IconType } from '../../shared/models';
import { OverlayButtonComponent } from '../buttons';

/**
 * Компонент просмотра изображений в полноэкранном режиме.
 *
 * Предоставляет модальное окно для просмотра изображений
 * с возможностью масштабирования и закрытия.
 *
 * @example
 * ```html
 * <ss-lib-light-box
 *   [src]="'path/to/image.jpg'"
 *   [width]="800"
 *   [height]="600"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-light-box',
	standalone: true,
	imports: [NgOptimizedImage, OverlayButtonComponent],
	templateUrl: './light-box.component.html',
	styleUrl: './light-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightBoxComponent {
	/**
	 * URL изображения для отображения.
	 *
	 * @description
	 * Путь к изображению, которое будет показано
	 * в полноэкранном режиме.
	 */
	protected src: string;

	/**
	 * Ширина изображения.
	 *
	 * @description
	 * Ширина изображения в пикселях.
	 */
	protected width: number;

	/**
	 * Высота изображения.
	 *
	 * @description
	 * Высота изображения в пикселях.
	 */
	protected height: number;

	/**
	 * Константы для типов иконок.
	 *
	 * @description
	 * Используется для отображения иконок
	 * управления просмотром.
	 */
	protected IconType = IconType;

	/**
	 * Создает экземпляр компонента.
	 *
	 * @param modalRef - Ссылка на модальное окно с данными
	 * @description
	 * Инициализирует компонент данными из модального окна.
	 */
	constructor(private modalRef: ModalRef<ILightBoxData>) {
		this.src = modalRef.data.src;
		this.width = modalRef.data.width;
		this.height = modalRef.data.height;
	}

	/**
	 * Закрывает просмотр изображения.
	 *
	 * @description
	 * Закрывает модальное окно просмотра.
	 */
	protected close(): void {
		this.modalRef.close();
	}
}
