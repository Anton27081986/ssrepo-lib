import {
	Component,
	input,
	InputSignal,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { ButtonComponent } from '../buttons';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TextComponent } from '../text/text.component';

@Component({
	selector: 'ss-lib-indicator-checklist-popup',
	standalone: true,
	imports: [ButtonComponent, CheckboxComponent, TextComponent],
	templateUrl: './indicator-checklist-popup.component.html',
	styleUrl: './indicator-checklist-popup.component.scss',
})
export class IndicatorChecklistPopupComponent implements OnChanges {
	public count: InputSignal<number> = input.required();
	public total: InputSignal<number> = input.required();
	@Output()
	public closed = new EventEmitter<void>();

	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
	protected readonly ButtonType = ButtonType;
	protected readonly IconType = IconType;
	protected readonly ExtraSize = ExtraSize;

	public animationState: 'visible' | 'hide' = 'visible';

	public ngOnChanges(_changes: SimpleChanges): void {
		if (this.count() > 0 && this.animationState === 'hide') {
			this.animationState = 'visible';
		}

		if (this.count() <= 0 && this.animationState === 'visible') {
			this.animationState = 'hide';
		}
	}

	public onAnimationDone(): void {
		if (this.animationState === 'hide' && this.count() <= 0) {
			this.closed.emit();
		}
	}

	public close(): void {
		if (this.animationState === 'visible') {
			this.animationState = 'hide';
			this.closed.emit();
		}
	}
}
