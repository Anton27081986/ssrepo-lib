import {
	ChangeDetectionStrategy,
	Component,
	effect,
	input,
	output,
	signal,
	WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval, map, Subject, take, takeUntil } from 'rxjs';
import { TextComponent } from '../text/text.component';
import { ButtonComponent, PreviewButtonComponent } from '../buttons';
import {
	Colors,
	ExtraSize,
	IconType,
	TextType,
	ToastTypeEnum,
} from '../../shared/models';
import { BadgeComponent } from '../badge/badge.component';
import { SharedPopupService } from '../../shared/services';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';

/**
 * Состояния компонента загрузки изображения.
 */
enum States {
	Empty = 'empty',
	Loading = 'loading',
	Preview = 'preview',
}

/**
 * Компонент загрузки изображений.
 *
 * Предоставляет интерфейс для загрузки изображений с поддержкой
 * drag-and-drop, предпросмотра и валидации размеров. Поддерживает
 * различные состояния загрузки и отображение прогресса.
 *
 * @example
 * ```html
 * <ss-lib-image-upload
 *   [disabled]="false"
 *   [maxSize]="5"
 *   [maxHeight]="800"
 *   [maxWidth]="1200"
 *   [progress]="uploadProgress"
 *   [src]="imageUrl"
 *   (fileChanged)="onFileChange($event)"
 *   (uploadCancel)="onUploadCancel()"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss'],
	imports: [
		TextComponent,
		ButtonComponent,
		BadgeComponent,
		PreviewButtonComponent,
		FormsModule,
		ReactiveFormsModule,
		ProgressCircleComponent,
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
	/**
	 * Флаг отключения компонента.
	 *
	 * @default false
	 * @description
	 * Определяет, доступен ли компонент для
	 * взаимодействия.
	 */
	public disabled = input<boolean>(false);

	/**
	 * Максимальный размер файла в МБ.
	 *
	 * @default 0
	 * @description
	 * Максимально допустимый размер загружаемого
	 * изображения в мегабайтах.
	 */
	public maxSize = input<number>(0);

	/**
	 * Максимальная высота изображения.
	 *
	 * @default 0
	 * @description
	 * Максимально допустимая высота изображения
	 * в пикселях.
	 */
	public maxHeight = input<number>(0);

	/**
	 * Максимальная ширина изображения.
	 *
	 * @default 0
	 * @description
	 * Максимально допустимая ширина изображения
	 * в пикселях.
	 */
	public maxWidth = input<number>(0);

	/**
	 * Процент загрузки.
	 *
	 * @default 0
	 * @description
	 * Текущий процент загрузки изображения.
	 */
	public progress = input<number>(0);

	/**
	 * Процент загрузки.
	 *
	 * @default 0
	 * @description
	 * Текущий процент загрузки изображения.
	 */
	public animProgress: WritableSignal<number> = signal<number>(0);

	/**
	 * URL изображения.
	 *
	 * @default null
	 * @description
	 * URL изображения для предпросмотра.
	 */
	public src = input<string | null>(null);

	/**
	 * Событие изменения файла.
	 *
	 * @description
	 * Генерируется при выборе или загрузке
	 * нового файла.
	 */
	public fileChanged = output<File | null>();

	/**
	 * Событие отмены загрузки.
	 *
	 * @description
	 * Генерируется при отмене загрузки
	 * изображения.
	 */
	public uploadCancel = output();

	/**
	 * Флаг наведения.
	 *
	 * @description
	 * Определяет, находится ли курсор над
	 * областью загрузки.
	 */
	protected hover = signal<boolean>(false);

	/**
	 * Текущее состояние компонента.
	 *
	 * @description
	 * Определяет текущее состояние компонента:
	 * пустой, загрузка или предпросмотр.
	 */
	protected state = signal<States>(States.Empty);

	/**
	 * URL текущего изображения.
	 *
	 * @description
	 * URL изображения для отображения
	 * в предпросмотре.
	 */
	protected imageSrc: string | null = null;

	/**
	 * Константы для типов иконок.
	 */
	protected IconType = IconType;

	/**
	 * Константы для дополнительных размеров.
	 */
	protected ExtraSize = ExtraSize;

	/**
	 * Константы для типов текста.
	 */
	protected TextType = TextType;

	/**
	 * Константы для цветов.
	 */
	protected Colors = Colors;

	/**
	 * Константы для состояний.
	 */
	protected States = States;

	/**
	 * Subject для отмены подписки на загрузку.
	 */
	protected subjectCancel: Subject<unknown> = new Subject();

	/**
	 * Создает экземпляр компонента.
	 *
	 * @param sharedPopupService - Сервис для отображения уведомлений
	 * @description
	 * Инициализирует компонент и настраивает
	 * обработку изменений состояния.
	 */
	constructor(private sharedPopupService: SharedPopupService) {
		effect(() => {
			if (this.src()) {
				this.imageSrc = this.src();
				this.state.set(States.Preview);
			}
		});

		effect(() => {
			if (this.progress()) {
				this.state.set(States.Loading);

				const numbers$ = interval(10).pipe(
					map((i) => i + 1), // Преобразуем индекс в число (от 1 до 100)
					take(110), // Ограничиваем поток до 100 значений
					takeUntil(this.subjectCancel),
				);

				// Подписываемся на поток и выводим числа в консоль
				numbers$.subscribe({
					next: (number) => this.animProgress.set(number),
					complete: () => {
						if (this.progress() === 100) {
							this.state.set(States.Preview);
						}

						this.animProgress.set(0);
					},
				});
			}
		});
	}

	/**
	 * Обработчик входа в область перетаскивания.
	 *
	 * @param event - Событие входа
	 */
	protected onDragEnter(event: Event): void {
		event.preventDefault();

		if (this.disabled()) {
			return;
		}

		this.hover.set(true);
	}

	/**
	 * Обработчик выхода из области перетаскивания.
	 *
	 * @param event - Событие выхода
	 */
	protected onDragLeave(event: Event): void {
		event.preventDefault();
		this.hover.set(false);
	}

	/**
	 * Обработчик успешного перетаскивания файла.
	 *
	 * @param event - Событие перетаскивания
	 */
	protected onDropSuccess(event: DragEvent): void {
		event.preventDefault();

		if (
			event.dataTransfer &&
			event.dataTransfer.files &&
			event.dataTransfer.files.length > 0
		) {
			this.onFileChange(event.dataTransfer.files);
		}
	}

	/**
	 * Обработчик удаления файла.
	 *
	 * @description
	 * Отменяет загрузку и сбрасывает состояние
	 * компонента.
	 */
	protected onFileDelete(): void {
		this.uploadCancel.emit();
		this.subjectCancel.next(false);
		this.animProgress.set(0);
		this.state.set(States.Empty);
	}

	/**
	 * Обработчик выбора файла с компьютера.
	 *
	 * @param event - Событие выбора файла
	 */
	protected selectFromPC(event: Event): void {
		const inputCtrl = event.target as HTMLInputElement;

		if (inputCtrl.files) {
			this.onFileChange(inputCtrl.files);
		}
	}

	/**
	 * Обработчик изменения файла.
	 *
	 * @param files - Список файлов
	 * @description
	 * Проверяет файл на соответствие требованиям
	 * и обновляет состояние компонента.
	 */
	protected onFileChange(files: FileList): void {
		if (this.disabled()) {
			return;
		}

		const file = files[0];

		if (!file) {
			return;
		}

		this.state.set(States.Loading);

		if (this.maxSize() && file.size > this.maxSize() * 1024 * 1024) {
			this.showToastError('Изображение не соответствует требованиям');
			this.state.set(States.Empty);

			return;
		}

		const img = new Image();

		img.src = URL.createObjectURL(file);

		img.onload = () => {
			const height = img.height;
			const width = img.width;

			if (
				(this.maxHeight() && height > this.maxHeight()) ||
				(this.maxWidth() && width > this.maxWidth())
			) {
				this.showToastError('Изображение не соответствует требованиям');
				this.state.set(States.Empty);

				return;
			}

			const reader = new FileReader();

			reader.onload = () => {
				this.imageSrc = reader.result ? reader.result.toString() : null;
			};

			reader.readAsDataURL(file);

			this.fileChanged.emit(file || null);
		};
	}

	/**
	 * Отображает сообщение об ошибке.
	 *
	 * @param text - Текст сообщения
	 * @private
	 */
	private showToastError(text: string): void {
		this.sharedPopupService.openToast({
			text,
			type: ToastTypeEnum.Error,
		});
	}
}
