import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	AccordionComponent,
	AccordionItemComponent,
	TextComponent,
} from '../../../../../front-components/src/lib/components';
import {
	Colors,
	TextType,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-accordion-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Accordion</h2>

		<p class="section-description">
			Accordion component with multiple items and expand/collapse
			animations.
		</p>

		<!-- Single Item -->
		<div class="sub-section">
			<h3 class="sub-section-title">Single Item</h3>
			<p class="sub-section-description">
				Accordion with only one item will apply a special styling.
			</p>
			<div class="component-row">
				<ss-lib-accordion>
					<ss-lib-accordion-item [title]="'Единичный элемент'">
						<ss-lib-text
							[type]="TextType.BodyMd"
							[color]="Colors.TextBody2"
						>
							Контент единственного элемента. Аккордеон добавляет
							класс
							<code>only-one-child</code> к элементу.
						</ss-lib-text>
					</ss-lib-accordion-item>
				</ss-lib-accordion>
			</div>
		</div>

		<!-- Multiple Items -->
		<div class="sub-section">
			<h3 class="sub-section-title">Multiple Items</h3>
			<div class="component-row">
				<ss-lib-accordion>
					<ss-lib-accordion-item [title]="'Первый элемент'">
						<ss-lib-text
							[type]="TextType.BodyMd"
							[color]="Colors.TextBody2"
						>
							Контент первого элемента. Здесь можно разместить
							текст, ссылки или любые другие компоненты.
						</ss-lib-text>
					</ss-lib-accordion-item>

					<ss-lib-accordion-item [title]="'Второй элемент'">
						<ss-lib-text
							[type]="TextType.BodyMd"
							[color]="Colors.TextBody2"
						>
							Контент второго элемента. Этот элемент демонстрирует
							сворачивание и разворачивание.
						</ss-lib-text>
					</ss-lib-accordion-item>

					<ss-lib-accordion-item
						[title]="'Третий элемент'"
						[isDisabled]="true"
					>
						<ss-lib-text
							[type]="TextType.BodyMd"
							[color]="Colors.TextBody2"
						>
							Этот элемент отключен и не реагирует на клики.
						</ss-lib-text>
					</ss-lib-accordion-item>
				</ss-lib-accordion>
			</div>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [AccordionComponent, AccordionItemComponent, TextComponent],
})
export class AccordionDemoComponent {
	protected readonly TextType = TextType;
	protected readonly Colors = Colors;
}
