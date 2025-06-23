import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	InputSignal,
	output,
	signal,
	Signal,
	WritableSignal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../buttons';
import { ProgressComponent } from '../progress/progress.component';
import { TextComponent } from '../text/text.component';
import { ButtonType, Colors, TextType } from '../../shared/models';

@Component({
	selector: 'ss-lib-load-pagination',
	standalone: true,
	imports: [ButtonComponent, ProgressComponent, NgIf, TextComponent],
	templateUrl: './load-pagination.component.html',
	styleUrl: './load-pagination.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadPaginationComponent {
	public readonly total: InputSignal<number> = input.required<number>();
	public readonly offsetInput: InputSignal<number> = input.required<number>();
	public readonly changeOffset = output<number>();
	public readonly limit: InputSignal<number> = input.required<number>();
	public readonly offset: WritableSignal<number> = signal<number>(0);
	public readonly TextComputedForLimit: Signal<string> = computed(() => {
		const newOffset = this.offset() + this.limit();

		if (newOffset > this.total()) {
			return `Показать еще ${this.total() - this.offset()}`;
		}

		return `Показать еще ${this.limit()}`;
	});

	protected readonly TextType = TextType;
	protected readonly Colors = Colors;

	protected readonly ButtonType = ButtonType;

	constructor() {
		effect(() => {
			this.offset.set(this.offsetInput());
			this.changeOffset.emit(this.offsetInput());
		});
	}

	protected get viewButton(): boolean {
		return this.offset() !== this.total();
	}

	public addOffset(): void {
		const newOffset = this.offset() + this.limit();

		if (newOffset > this.total()) {
			this.changeOffset.emit(this.total());
			this.offset.set(this.total());
		} else {
			this.changeOffset.emit(newOffset);
			this.offset.set(newOffset);
		}
	}
}
