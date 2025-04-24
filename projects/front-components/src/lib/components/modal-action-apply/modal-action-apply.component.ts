import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonType, ExtraSize, ModalRef } from '../../shared/models';
import { ButtonComponent } from '../buttons';

/**
 * Компонент действий модального окна с кнопками подтверждения и отмены
 *
 * @example
 * ```html
 * Параметры:
 *
 * [applyText]: string - Текст кнопки подтверждения - необязательный, по умолчанию: ''
 *
 * [applyDisabled]: boolean - Блокировка кнопки подтверждения -
 * необязательный, по умолчанию: false
 *
 * [cancelText]: string | null - Текст кнопки отмены -
 * необязательный, по умолчанию: null
 *
 * (applyEvent): void - Событие подтверждения действия
 *
 * <ss-lib-modal-action-apply
 *   [applyText]="'Подтвердить'"
 *   [applyDisabled]="false"
 *   [cancelText]="'Отмена'"
 *   (applyEvent)="onApply()"
 * ></ss-lib-modal-action-apply>
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
	public readonly applyText = input<string>('');
	public readonly applyDisabled = input<boolean>(false);
	public readonly cancelText = input<string | null>(null);
	public readonly applyEvent = output<void>();
	protected buttonType = ButtonType;
	protected readonly ExtraSize = ExtraSize;

	constructor(private readonly modalRef: ModalRef) {}

	public close(): void {
		this.modalRef.close();
	}
}
