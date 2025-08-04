import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	TemplateRef,
} from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { IBadgeProps, IconPosition, ModalRef } from '../../shared/models';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DividerComponent } from '../divider/divider.component';

/**
 * Компонент модального окна с заголовком, описанием и действиями
 *
 * @example
 * ```html
 * Параметры:
 *
 * [titleHeader]: string - Заголовок модального окна - необязательный, по умолчанию: ''
 *
 * [descriptionHeader]: string - Описание модального окна - необязательный, по умолчанию: ''
 *
 * [actionsRef]: TemplateRef - Шаблон действий - обязательный
 *
 * [stickyRef]: TemplateRef - Шаблон c позиционированием sticky - необязательный
 *
 * [contentRef]: TemplateRef | null - Шаблон содержимого -
 * необязательный, по умолчанию: null
 *
 * [badgeProps]: IBadgeProps - Свойства бейджа - обязательный
 *
 * (closeEmit): void - Событие закрытия модального окна
 *
 * [closePosition]: IconPosition.Start | IconPosition.End - позиция иконки закрытия модального окна.
 *
 * <ss-lib-modal
 *   [titleHeader]="'Заголовок'"
 *   [descriptionHeader]="'Описание'"
 *   [badgeProps]="{ type: 'info', text: 'Статус' }"
 *   [actionsRef]="actionsTemplate"
 *   [contentRef]="contentTemplate"
 *   (closeEmit)="onClose()"
 * ></ss-lib-modal>
 * ```
 */
@Component({
	selector: 'ss-lib-modal',
	standalone: true,
	imports: [NgIf, DialogHeaderComponent, DividerComponent, NgTemplateOutlet],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	public readonly titleHeader = input<string>('');
	public readonly descriptionHeader = input<string>('');
	public readonly actionsRef = input.required<TemplateRef<unknown>>();
	public readonly contentRef = input<TemplateRef<{}> | null>(null);
	public readonly stickyRef = input<TemplateRef<{}> | null>(null);
	public readonly badgeProps = input.required<IBadgeProps>();
	public readonly closePosition = input<
		IconPosition.Start | IconPosition.End
	>(IconPosition.End);

	public readonly closeEmit = output<void>();
	private readonly popoverRef = inject(ModalRef);

	public onCloseEvent(): void {
		this.closeEmit.emit();
	}
}
