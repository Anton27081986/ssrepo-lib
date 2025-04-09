import type { OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import {
	IApply,
	IBadgeProps,
	IConfirmData,
	ModalRef,
} from '../../shared/models';
import { ButtonType } from '../../shared/models';
import { ModalActionApplyComponent } from '../modal-action-apply/modal-action-apply.component';

/**
 * Компонент модального окна подтверждения с поддержкой действий
 *
 * @example
 * ```html
 * Параметры:
 *
 * [data]: IConfirmData - Данные модального окна - обязательный
 * {
 *   title: string - Заголовок окна
 *   description: string - Описание
 *   apply: IApply - Параметры кнопки подтверждения
 *   badgeProps: IBadgeProps - Параметры бейджа
 *   cancelText: string | null - Текст кнопки отмены
 * }
 *
 * <ss-lib-confirm-modal
 *   [data]="{
 *     title: 'Подтверждение',
 *     description: 'Вы уверены?',
 *     apply: {
 *       text: 'Подтвердить',
 *       onSubmit: () => of(true)
 *     },
 *     badgeProps: {
 *       text: 'Важно'
 *     },
 *     cancelText: 'Отмена'
 *   }"
 * ></ss-lib-confirm-modal>
 * ```
 */
@Component({
	selector: 'ss-lib-confirm-modal',
	standalone: true,
	imports: [ModalComponent, ModalActionApplyComponent],
	templateUrl: './confirm-modal.component.html',
	styleUrl: './confirm-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent implements OnDestroy {
	public readonly ButtonType = ButtonType;

	protected readonly applyText: IApply;
	protected readonly titleHeader: string;
	protected readonly descriptionHeader: string;
	protected readonly applyDisabled: boolean;
	protected readonly badgeProps: IBadgeProps;
	protected readonly cancelText: string | null;

	private readonly subscription: Subscription = new Subscription();

	constructor(private readonly modalRef: ModalRef<IConfirmData>) {
		this.applyText = this.modalRef.data.apply;
		this.applyDisabled = false;
		this.badgeProps = this.modalRef.data.badgeProps;
		this.titleHeader = this.modalRef.data.title;
		this.descriptionHeader = this.modalRef.data.description;
		this.cancelText = this.modalRef.data.cancelText;
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	protected onApplyEvent(): void {
		if (this.modalRef.data.apply.onSubmit) {
			this.subscription.add(
				this.modalRef.data.apply.onSubmit().subscribe(() => {
					this.modalRef.submit();
					this.modalRef.close();
				}),
			);
		} else {
			this.modalRef.submit();
			this.modalRef.close();
		}
	}

	protected close(): void {
		this.modalRef.close();
	}
}
