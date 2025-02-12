import {
    Directive,
    ElementRef,
    OnDestroy,
    inject,
    ViewContainerRef,
    HostListener,
    input,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { merge, Observable, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { PopoverContent } from '../../shared/models';
import { outputToObservable } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[popoverTriggerFor]',
    standalone: true
})
export class PopoverTriggerForDirective implements OnDestroy {
    private readonly overlay = inject(Overlay);
    private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    private readonly viewContainerRef = inject(ViewContainerRef);

    popoverContent = input.required<PopoverContent>({alias: 'popoverTriggerFor'});

    private isPopoverOpen = false;
    private overlayRef: OverlayRef | null = null;
    private closingActionsSub = Subscription.EMPTY;

    @HostListener('click')
    togglePopover(): void {
        this.isPopoverOpen ? this.destroyPopover() : this.openPopover();
    }

    @HostListener('keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.destroyPopover();
        }
    }

    ngOnDestroy(): void {
        this.closingActionsSub.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    public destroyPopover(): void {
        if (!this.overlayRef || !this.isPopoverOpen) return;

        this.closingActionsSub.unsubscribe();
        this.isPopoverOpen = false;
        this.overlayRef.detach();
    }

    private openPopover(): void {
        if (this.isPopoverOpen) return;

        this.isPopoverOpen = true;

        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create({
                hasBackdrop: true,
                backdropClass: 'cdk-overlay-transparent-backdrop',
                scrollStrategy: this.overlay.scrollStrategies.reposition(),
                positionStrategy: this.overlay
                .position()
                .flexibleConnectedTo(this.elementRef)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetY: 8
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                        offsetY: 8
                    },
                ]),
            });
        }

        const templatePortal = new TemplatePortal(
            this.popoverContent().templateRef,
            this.viewContainerRef
        );
        this.overlayRef.attach(templatePortal);

        this.closingActionsSub = this.closingActions()
        .subscribe(() => this.destroyPopover());
    }

    private closingActions(): Observable<MouseEvent | void> {
        return merge(
            this.overlayRef!.backdropClick(),
            this.overlayRef!.detachments(),
            outputToObservable(this.popoverContent().closed)
        )
    }
}

