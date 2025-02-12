import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    output,
    QueryList,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { IDictionaryItemDto, PopoverContent } from '../../shared/models';

@Component({
    selector: 'ss-lib-dropdown-list',
    standalone: true,
    templateUrl: './dropdown-list.component.html',
    styleUrl: './dropdown-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownListComponent implements PopoverContent {
    @ContentChildren(DropdownItemComponent) optionsContent?: QueryList<DropdownItemComponent>;
    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

    public closed = output<void>();
    public selectOptionEvent = output<IDictionaryItemDto | null>()

    selectOption(item: IDictionaryItemDto | null): void {
        this.selectOptionEvent.emit(item);
        this.closed.emit();
    }
}
