import { ChangeDetectionStrategy, Component, ContentChildren, input, output, QueryList, signal } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { IDictionaryItemDto } from '../../shared/models';
import { collapseHeight } from '../../core/animations';

@Component({
    selector: 'ss-lib-dropdown-list',
    standalone: true,
    templateUrl: './dropdown-list.component.html',
    styleUrl: './dropdown-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [collapseHeight],
})
export class DropdownListComponent {
    @ContentChildren(DropdownItemComponent) optionsContent?: QueryList<DropdownItemComponent>;
    public isOpen = input.required<boolean>();
    public selectOptionEvent = output<IDictionaryItemDto | null>()

    public isContentVisible = signal<boolean>(false);

    selectOption(item: IDictionaryItemDto | null): void {
        this.selectOptionEvent.emit(item);
    }

    onCollapseHeightAnimationDone(event: AnimationEvent): void {
        if (!event.toState) {
            this.isContentVisible.set(false);
        } else {
            this.isContentVisible.set(true);
        }
    }
}
