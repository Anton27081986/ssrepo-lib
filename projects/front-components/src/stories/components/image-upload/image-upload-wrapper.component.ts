import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from '../../../lib/components/image-upload/image-upload.component';

/**
 * Обертка для компонента ImageUpload.
 *
 * @description
 * Компонент-обертка для демонстрации
 * ImageUpload в Storybook.
 */
@Component({
	selector: 'ss-lib-image-upload-wrapper',
	standalone: true,
	imports: [ImageUploadComponent, ReactiveFormsModule],
	template: `
		<ss-lib-image-upload
			[formControl]="control"
			[disabled]="disabled()"
			[maxSize]="maxSize()"
			[maxHeight]="maxHeight()"
			[maxWidth]="maxWidth()"
			[src]="src()"
			(fileChanged)="onFileChanged($event)"
		></ss-lib-image-upload>
	`,
})
export class ImageUploadWrapperComponent {
	/**
	 * Контрол формы для демонстрации.
	 *
	 * @description
	 * FormControl для управления значением
	 * загруженного изображения.
	 */
	public readonly control = new FormControl<string | null>(null);

	/**
	 * Флаг блокировки компонента.
	 *
	 * @default false
	 * @description
	 * Определяет, можно ли загружать
	 * изображения.
	 */
	public readonly disabled = input<boolean>(false);

	/**
	 * Максимальный размер файла.
	 *
	 * @default 0
	 * @description
	 * Максимальный размер загружаемого
	 * файла в мегабайтах.
	 */
	public readonly maxSize = input<number>(0);

	/**
	 * Максимальная высота изображения.
	 *
	 * @default 0
	 * @description
	 * Максимальная высота загружаемого
	 * изображения в пикселях.
	 */
	public readonly maxHeight = input<number>(0);

	/**
	 * Максимальная ширина изображения.
	 *
	 * @default 0
	 * @description
	 * Максимальная ширина загружаемого
	 * изображения в пикселях.
	 */
	public readonly maxWidth = input<number>(0);

	/**
	 * URL изображения для предпросмотра.
	 *
	 * @default null
	 * @description
	 * URL изображения, которое будет
	 * отображаться в компоненте.
	 */
	public readonly src = input<string | null>(null);

	/**
	 * Обработчик изменения файла.
	 *
	 * @param file - Загруженный файл.
	 * @description
	 * Обрабатывает загруженный файл.
	 */
	public onFileChanged(_file: File | null): void {
		// Обработка загруженного файла
	}
}
