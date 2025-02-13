import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    contentChildren,
    Injector,
    output,
    runInInjectionContext,
    TemplateRef,
    viewChild,
} from '@angular/core';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { outputToObservable, toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IDictionaryItemDto, PopoverContent } from '../../shared/models';

@Component({
    selector: 'ss-lib-dropdown-list',
    standalone: true,
    templateUrl: './dropdown-list.component.html',
    styleUrl: './dropdown-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownListComponent implements PopoverContent {
    readonly optionsContent = contentChildren(DropdownItemComponent);
    readonly templateRef = viewChild.required<TemplateRef<any>>('dropdownTemplate');

    public closed = output<void>();
    public value = output<IDictionaryItemDto | null>()

    constructor(private readonly injector: Injector) {
        afterNextRender(() => {
            runInInjectionContext(this.injector, () => {
                this.optionsContent().forEach(
                    option => toSignal(
                        outputToObservable(option.valueEvent).pipe(
                            tap(data => this.selectOption(data))
                        )
                    )
                )
            });
        });
    }

    selectOption(item: IDictionaryItemDto | null): void {
        this.value.emit(item);
        this.closed.emit();
    }
}
