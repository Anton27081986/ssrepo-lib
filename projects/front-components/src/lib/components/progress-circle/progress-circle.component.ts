import { effect, ElementRef, InputSignal, viewChild } from '@angular/core';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Параметры:
 *
 * [progress]: <number> - Процент загрузки. По умолчанию: 0
 *
 */
@Component({
	selector: 'ss-lib-progress-circle',
	templateUrl: './progress-circle.component.html',
	styleUrls: ['./progress-circle.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent {
	public readonly progress: InputSignal<number> = input<number>(80);

	public readonly spinnerElement = viewChild('spinner', {
		read: ElementRef,
	});

	constructor() {
		effect(() => {
			if (this.spinnerElement()) {
				this.spinnerElement()!.nativeElement.style.setProperty(
					'--progress',
					this.progress() / 1.25,
				);
			}
		});
	}
}
