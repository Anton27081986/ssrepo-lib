import {
	Component,
	effect,
	input,
	signal,
	WritableSignal,
} from '@angular/core';
import { Colors, HelpHintType, IconType } from '../../shared/models';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'ss-lib-help-hint',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './help-hint.component.html',
	styleUrl: './help-hint.component.scss',
})
export class HelpHintComponent {
	public type = input<HelpHintType>(HelpHintType.Default);
	public icon = input.required<IconType>();
	public disabled = input<boolean>(false);
	protected readonly isHover: WritableSignal<boolean> = signal(false);
	protected color: WritableSignal<Colors> = signal(Colors.IconAction2);

	protected readonly Colors = Colors;

	constructor() {
		effect(() => {
			this.color.set(this.checkColor());
		});
	}

	protected checkColor(): Colors {
		if (this.disabled()) {
			return Colors.IconDisabled;
		}

		if (this.isHover()) {
			switch (this.type()) {
				case HelpHintType.Warning:
					return Colors.IconWarningHover;
				case HelpHintType.Error:
					return Colors.IconErrorHover;
				case HelpHintType.Success:
					return Colors.IconSuccessHover;
				default:
					return Colors.IconActionHover2;
			}
		}

		switch (this.type()) {
			case HelpHintType.Warning:
				return Colors.IconWarning;
			case HelpHintType.Error:
				return Colors.IconError;
			case HelpHintType.Success:
				return Colors.IconSuccess;
			default:
				return Colors.IconAction2;
		}
	}
}
