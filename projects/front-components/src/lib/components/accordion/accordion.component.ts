import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	contentChildren,
	inject,
	Renderer2,
	ViewEncapsulation,
} from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
	selector: 'ss-lib-accordion',
	standalone: true,
	imports: [],
	template: `
		<div class="accordion-wrapper">
			<ng-content></ng-content>
		</div>
	`,
	styleUrl: './accordion.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[style.width]': "'100%'",
	},
})
export class AccordionComponent implements AfterViewInit {
	private readonly renderer = inject(Renderer2);
	private readonly items = contentChildren(AccordionItemComponent);

	public ngAfterViewInit(): void {
		const items = this.items();

		if (items.length === 1) {
			return this.renderer.addClass(
				items[0].elementRef.nativeElement,
				'only-one-child',
			);
		}

		if (items.length > 1) {
			this.renderer.addClass(
				items[0].elementRef.nativeElement,
				'first-child',
			);
			this.renderer.addClass(
				items[items.length - 1].elementRef.nativeElement,
				'last-child',
			);
		}
	}
}
