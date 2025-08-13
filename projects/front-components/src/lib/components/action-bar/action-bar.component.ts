import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ActionBarItemComponent } from './action-bar-item/action-bar-item.component';
import { Colors, ExtraSize, IconType } from '../../shared/models';

@Component({
	selector: 'ss-lib-action-bar',
	standalone: true,
	imports: [ActionBarItemComponent],
	templateUrl: './action-bar.component.html',
	styleUrl: './action-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBarComponent {
	public size = input<ExtraSize.md | ExtraSize.xxs>(ExtraSize.md);
	public readonly showClose = input<boolean>(false);
	public readonly closed = output<void>();

	protected readonly IconType = IconType;
	protected readonly Colors = Colors;

	protected closeActionBar(): void {
		this.closed.emit();
	}
}
