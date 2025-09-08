import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CarouselComponent } from '../../../../../front-components/src/lib/components';
import { ItemDirective } from '../../../../../front-components/src/lib/core/directives';
import { BANNERS_ITEMS } from '../../utils/constants';

@Component({
	selector: 'app-carousel-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Carousel</h2>

		<p class="section-description">Image carousel with auto-rotation.</p>

		<div class="component-row">
			<ss-lib-carousel
				[duration]="3000"
				[(index)]="carouselIndex"
			>
				@for (banner of bannersItems; track banner) {
					<img
						*ssItem
						class="carousel-item"
						alt="Banner image"
						height="220"
						width="990"
						priority
						[ngSrc]="banner.imageUrl"
					/>
				}
			</ss-lib-carousel>
		</div>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CarouselComponent, NgOptimizedImage, ItemDirective],
})
export class CarouselDemoComponent {
	public carouselIndex = signal(0);

	protected readonly bannersItems = BANNERS_ITEMS;
}
