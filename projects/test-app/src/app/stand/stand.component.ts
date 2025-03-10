import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
    ButtonType,
    Colors,
    ExtraSize,
    IconPosition,
    IconType,
    LinkAppearance,
    Orientation,
    Shape,
    Status,
    TextType,
    TextWeight, TooltipPosition,
} from '../../../../front-components/src/lib/shared/models';
import { standImports } from './stand.imports';
import { ColumnsStateService } from '../../../../front-components/src/lib/components';
import { DROPDOWN_ITEMS, DEFAULT_COLS } from './constants';
import { SharedPopupService } from '../../../../front-components/src/lib/shared/services';
import { Observable, of } from 'rxjs';
import { TestModalComponent, TestModalData } from '../test-modal/test-modal.component';

@Component({
    selector: 'app-stand',
    standalone: true,
    imports: [standImports],
    providers: [ColumnsStateService],
    templateUrl: './stand.component.html',
    styleUrl: './stand.component.scss'
})
export class StandComponent {
    private readonly sharedPopupService = inject(SharedPopupService);

    protected readonly TextType = TextType;
    protected readonly TextWeight = TextWeight;
    protected readonly IconType = IconType;
    protected readonly Colors = Colors;
    protected readonly ButtonType = ButtonType;
    protected readonly IconPosition = IconPosition;
    protected readonly console = console;
    protected readonly ExtraSize = ExtraSize;
    protected readonly Shape = Shape;
    protected readonly Orientation = Orientation;
    protected readonly LinkAppearance = LinkAppearance;
    protected readonly Status = Status;
    protected readonly DROPDOWN_ITEMS = DROPDOWN_ITEMS;
    protected readonly TooltipPosition = TooltipPosition;

    toggleCtrl = new FormControl(false);
    inputCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);
    textareaCtrl = new FormControl('rrrr', [Validators.required, Validators.minLength(10)]);
    selectCtrl = new FormControl(null);
    numberPickerCtrl = new FormControl(2);

    datepickerCtrl = new FormControl(null);
    minDate = new Date(2025, 2, 5);
    maxDate = new Date(2025, 2, 20);

    constructor(private readonly columnState: ColumnsStateService) {
        this.columnState.colsTr$.next(DEFAULT_COLS)
    }

    openTestModal(): void {
        const popover = this.sharedPopupService.openModal<TestModalData>(TestModalComponent, {
            id: 1,
            text: 'Какой то текст'
        }, true, '820px')
        popover.afterClosed$.subscribe(item => console.log(item, 'afterClosed$'))
        popover.afterSubmit$.subscribe(item => console.log(item, 'afterSubmit$'))
    }

    public openLightBoxModal(): void {
        const popover = this.sharedPopupService.openLightBoxModal({
            src: 'https://i.pravatar.cc/300',
            width: 1280,
            height: 400
        });

        popover.afterClosed$.subscribe(item => console.log(item))
    }

    public openTestConfirmModal(): void {
        const popover = this.sharedPopupService.openConfirmModal({
            title: 'Какой то title',
            description: 'Какой то description',
            badgeProps: {
                icon: IconType.ImagePlus,
                size: ExtraSize.lg,
                shape: Shape.Square,
                status: Status.Default
            },
            apply: {
                text: 'Ок',
                onSubmit: () => this.submit()

            },
            cancelText: 'не ок'
        });

        popover.afterSubmit$.subscribe(item => console.log(item));

        popover.afterClosed$.subscribe(item => console.log(item));

    }

    submit(): Observable<any> {
        return of([])
    }
}


