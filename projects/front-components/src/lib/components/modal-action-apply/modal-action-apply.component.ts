import type { InputSignal } from '@angular/core';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ModalRef } from '../../shared/models';
import { ButtonType } from '../../shared/models';
import { ButtonComponent } from '../buttons';

/**
 * Компонент действий модального окна с подтверждением.
 *
 * Предоставляет стандартные действия для модального окна:
 * кнопку подтверждения и опциональную кнопку отмены.
 *
 * @example
 * ```html
 * <ss-lib-modal-action-apply
 *   [applyText]="'Подтвердить'"
 *   [applyDisabled]="false"
 *   [cancelText]="'Отмена'"
 *   (applyEvent)="onApply()"
 * />
 * ```
 */
@Component({
	selector: 'ss-lib-modal-action-apply',
	standalone: true,
	imports: [ButtonComponent, NgIf],
	templateUrl: './modal-action-apply.component.html',
	styleUrl: './modal-action-apply.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalActionApplyComponent {
	/**
	 * Текст кнопки подтверждения.
	 *
	 * @description
	 * Обязательный параметр, отображаемый на
	 * кнопке подтверждения действия.
	 */
	public applyText: InputSignal<string> = input.required<string>();

	/**
	 * Флаг отключения кнопки подтверждения.
	 *
	 * @default false
	 * @description
	 * Определяет, доступна ли кнопка подтверждения
	 * для взаимодействия.
	 */
	public applyDisabled: InputSignal<boolean> = input<boolean>(false);

	/**
	 * Текст кнопки отмены.
	 *
	 * @default undefined
	 * @description
	 * Опциональный параметр, отображаемый на
	 * кнопке отмены действия.
	 */
	public cancelText: InputSignal<string | undefined> = input<
		string | undefined
	>();

	/**
	 * Событие подтверждения действия.
	 *
	 * @description
	 * Генерируется при нажатии на кнопку
	 * подтверждения.
	 */
	public applyEvent = output<void>();

	/**
	 * Константы для типов кнопок.
	 *
	 * @description
	 * Используется для определения стиля
	 * кнопок действий.
	 */
	protected buttonType = ButtonType;

	/**
	 * Создает экземпляр компонента.
	 *
	 * @param modalRef - Ссылка на модальное окно
	 * @description
	 * Инициализирует компонент с ссылкой на
	 * модальное окно.
	 */
	constructor(private modalRef: ModalRef) {}

	/**
	 * Закрывает модальное окно.
	 *
	 * @description
	 * Закрывает модальное окно при вызове.
	 */
	public close(): void {
		this.modalRef.close();
	}
}
