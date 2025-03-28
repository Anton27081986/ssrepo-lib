import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleIconComponent } from '../../../lib/components/toggle-icon/toggle-icon.component';
import { IconType } from '../../../lib/shared/models';

/**
 * Компонент-обертка для демонстрации ToggleIconComponent в Storybook.
 * Предоставляет интерактивный пример использования переключателя с иконками
 * для разных состояний и отображением текущего значения.
 */
@Component({
	selector: 'ss-lib-toggle-icon-wrapper',
	standalone: true,
	imports: [ToggleIconComponent, ReactiveFormsModule],
	template: `
		<div
			style="padding: 20px; background: #f3f4f6; border-radius: 8px; display: flex; flex-direction: column; align-items: center; gap: 10px;"
		>
			<ss-lib-toggle-icon
				[formControl]="toggleControl"
				[iconTrue]="iconTrue()"
				[iconFalse]="iconFalse()"
			></ss-lib-toggle-icon>
			<div style="color: #666;">
				Текущее значение:
				{{ toggleControl.value ? 'Включено' : 'Выключено' }}
			</div>
		</div>
	`,
})
export class ToggleIconWrapperComponent {
	/**
	 * Иконка, отображаемая во включенном состоянии.
	 * По умолчанию используется иконка солнца.
	 */
	public readonly iconTrue = input<IconType>(IconType.Sun);

	/**
	 * Иконка, отображаемая в выключенном состоянии.
	 * По умолчанию используется иконка луны.
	 */
	public readonly iconFalse = input<IconType>(IconType.Moon);

	/**
	 * Начальное значение переключателя.
	 * Определяет состояние компонента при инициализации.
	 */
	public readonly initialValue = input<boolean>(false);

	/**
	 * Контрол формы для управления состоянием переключателя.
	 * Позволяет отслеживать и изменять состояние компонента.
	 */
	public readonly toggleControl = new FormControl<boolean>(false);

	constructor() {
		if (this.initialValue()) {
			this.toggleControl.setValue(true, { emitEvent: false });
		}
	}
}
