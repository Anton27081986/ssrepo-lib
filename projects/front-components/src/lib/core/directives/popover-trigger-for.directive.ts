import { OnDestroy, signal } from '@angular/core';
import {
	Directive,
	ElementRef,
	inject,
	ViewContainerRef,
	HostListener,
	input,
} from '@angular/core';
import type { OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import type { Observable } from 'rxjs';
import { merge, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { outputToObservable } from '@angular/core/rxjs-interop';
import type { PopoverContent } from '../../shared/models';

@Directive({
	selector: '[popoverTriggerFor]',
	standalone: true,
})
export class PopoverTriggerForDirective implements OnDestroy {
	private readonly overlay = inject(Overlay);
	private readonly viewContainerRef = inject(ViewContainerRef);
	private readonly elementRef: ElementRef<HTMLElement> = inject(
		ElementRef<HTMLElement>,
	);

	public popoverContent = input.required<PopoverContent>({
		alias: 'popoverTriggerFor',
	});

	public popoverTriggerDisabled = input<boolean>(false);

	public isPopoverOpen = signal<boolean>(false);
	private overlayRef: OverlayRef | null = null;
	private closingActionsSub = Subscription.EMPTY;

	@HostListener('click')
	public togglePopover(): void {
		if (this.popoverTriggerDisabled()) {
			return;
		}

		this.isPopoverOpen() ? this.destroyPopover() : this.openPopover();
	}

	@HostListener('keydown', ['$event'])
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			this.destroyPopover();
		}
	}

	public ngOnDestroy(): void {
		this.closingActionsSub.unsubscribe();

		if (this.overlayRef) {
			this.overlayRef.dispose();
			this.overlayRef = null;
		}
	}

	public destroyPopover(): void {
		if (!this.overlayRef || !this.isPopoverOpen) {
			return;
		}

		this.closingActionsSub.unsubscribe();
		this.overlayRef.detach();
		this.isPopoverOpen.set(false);
	}

	private openPopover(): void {
		if (this.isPopoverOpen()) {
			return;
		}

		this.isPopoverOpen.set(true);

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
							offsetY: 8,
						},
						{
							originX: 'end',
							originY: 'bottom',
							overlayX: 'end',
							overlayY: 'top',
							offsetY: 8,
						},

						{
							originX: 'start',
							originY: 'top',
							overlayX: 'start',
							overlayY: 'bottom',
							offsetY: -8,
						},
						{
							originX: 'end',
							originY: 'top',
							overlayX: 'end',
							overlayY: 'bottom',
							offsetY: -8,
						},
					])
					.withFlexibleDimensions(false) // Отключаем автоматическое изменение размеров
					.withPush(false), // Запрещаем смещение при нехватке места
			});
		}

		const templatePortal = new TemplatePortal(
			this.popoverContent().templateRef(),
			this.viewContainerRef,
		);

		this.overlayRef.attach(templatePortal);

		this.closingActionsSub = this.closingActions().subscribe(() =>
			this.destroyPopover(),
		);
	}

	private closingActions(): Observable<MouseEvent | void> {
		return merge(
			this.overlayRef!.backdropClick(),
			this.overlayRef!.detachments(),
			outputToObservable(this.popoverContent().closed),
		);
	}
}
