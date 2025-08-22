import { inject, InputSignal, TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../buttons';
import {
	ButtonType,
	ExtraSize,
	IconPosition,
	IconType,
	SidebarType,
} from '../../shared/models';
import { CanvasState } from '../canvas/canvas.state';

/**
 * Компонент шапки приложения с настраиваемыми меню и управлением сайдбаром
 *
 * @example
 * ```html
 * Параметры:
 *
 * [leftMenuTemplateRef]: TemplateRef - Шаблон левого меню - обязательный
 *
 * [rightMenuTemplateRef]: TemplateRef - Шаблон правого меню - обязательный
 *
 * Методы:
 * toggleMenu() - Переключает состояние сайдбара (Close -> Mini -> Full -> Mini)
 *
 * <ss-lib-header
 *   [leftMenuTemplateRef]="leftMenuTemplate"
 *   [rightMenuTemplateRef]="rightMenuTemplate"
 * >
 *   <ng-template #leftMenuTemplate>
 *     <button (click)="someAction()">Меню</button>
 *   </ng-template>
 *
 *   <ng-template #rightMenuTemplate>
 *     <button (click)="otherAction()">Профиль</button>
 *   </ng-template>
 * </ss-lib-header>
 * ```
 */
@Component({
	selector: 'ss-lib-header',
	standalone: true,
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [NgTemplateOutlet, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	private readonly canvasState = inject(CanvasState);

	public readonly leftMenuTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	public readonly rightMenuTemplateRef: InputSignal<TemplateRef<{}> | null> =
		input.required();

	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly IconPosition = IconPosition;
	protected readonly ExtraSize = ExtraSize;

	public toggleMenu(): void {
		switch (this.canvasState.sidebarType()) {
			case SidebarType.Close:
				this.canvasState.sidebarType.set(SidebarType.Mini);
				break;
			case SidebarType.Mini:
				this.canvasState.sidebarType.set(SidebarType.Full);
				break;
			default:
				this.canvasState.sidebarType.set(SidebarType.Mini);
		}
	}
}
