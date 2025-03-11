import { Inject, Injector, TemplateRef } from '@angular/core';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	contentChildren,
	input,
	output,
	runInInjectionContext,
	viewChild,
} from '@angular/core';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import type { IDictionaryItemDto, PopoverContent } from '../../shared/models';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DividerComponent } from '../divider/divider.component';

@Component({
	selector: 'ss-lib-dropdown-list',
	standalone: true,
	templateUrl: './dropdown-list.component.html',
	styleUrl: './dropdown-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, DividerComponent],
})
export class DropdownListComponent implements PopoverContent {
	public readonly optionsContent = contentChildren(DropdownItemComponent);
	public readonly templateRef =
		viewChild.required<TemplateRef<any>>('dropdownTemplate');

	public headerTemplateRef = input<TemplateRef<unknown> | null>(null);
	public closed = output<void>();
	public value = output<IDictionaryItemDto | null>();

	constructor(@Inject(Injector) private readonly injector: Injector) {
		afterNextRender(() => {
			runInInjectionContext(this.injector, () => {
				this.optionsContent().forEach((option) =>
					toSignal(
						outputToObservable(option.valueEvent).pipe(
							tap((data) => this.selectOption(data)),
						),
					),
				);
			});
		});
	}

	public selectOption(item: IDictionaryItemDto | null): void {
		this.value.emit(item);
		this.closed.emit();
	}
}
