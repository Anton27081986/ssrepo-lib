import { ChangeDetectionStrategy, Component, ContentChildren, output, QueryList } from '@angular/core';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { IDictionaryItemDto } from '../../shared/models';

@Component({
    selector: 'ss-lib-dropdown-list',
    standalone: true,
    templateUrl: './dropdown-list.component.html',
    styleUrl: './dropdown-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownListComponent {
    @ContentChildren(DropdownItemComponent) optionsContent?: QueryList<DropdownItemComponent>;
    public selectOptionEvent = output<IDictionaryItemDto | null>()

    selectOption(item: IDictionaryItemDto | null): void {
        this.selectOptionEvent.emit(item);
    }
}
