import {
	Directive,
	ElementRef,
	HostListener,
	inject,
	input,
	output,
	signal,
} from '@angular/core';

const DRAGGING_CLASS = 'dragging';
const DRAG_OVER_CLASS = 'drag-over';

@Directive({
	selector: '[ssDraggableItem]',
	standalone: true,
})
export class DraggableItemDirective<T> {
	private static readonly draggedItem = signal<unknown | null>(null);
	private readonly elementRef = inject(ElementRef<HTMLElement>);
	private dragCounter = 0;

	public item = input.required<T>();
	public dragGhostHandle =
		input<(originalRow: HTMLElement, rect: DOMRect) => HTMLElement>();

	public itemDrop = output<{ from: T; to: T }>();

	@HostListener('dragstart', ['$event'])
	public onDragStart(event: DragEvent): void {
		const originalRow = this.elementRef.nativeElement;

		if (!originalRow) {
			return;
		}

		DraggableItemDirective.draggedItem.set(this.item());
		event.dataTransfer?.setData('text/plain', JSON.stringify(this.item())); // Уникальные данные
		event.dataTransfer!.effectAllowed = 'move';

		originalRow.classList.add(DRAGGING_CLASS);

		// Создаем клон для изображения
		if (this.dragGhostHandle()) {
			const rect = originalRow.getBoundingClientRect();
			const ghost = this.dragGhostHandle()!(originalRow, rect);

			document.body.appendChild(ghost);
			const offsetX = event.clientX - rect.left;
			const offsetY = event.clientY - rect.top;

			event.dataTransfer?.setDragImage(ghost, offsetX, offsetY);

			// Удаляем клон после начала перетаскивания
			setTimeout(() => {
				if (ghost.isConnected) {
					document.body.removeChild(ghost);
				}
			}, 0);
		}
	}

	@HostListener('dragend')
	public onDragEnd(): void {
		DraggableItemDirective.draggedItem.set(null);
		this.elementRef.nativeElement.classList.remove(DRAGGING_CLASS);
	}

	@HostListener('dragover', ['$event'])
	public onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'move';
	}

	@HostListener('dragenter', ['$event'])
	public onDragEnter(event: DragEvent): void {
		event.preventDefault();
		this.dragCounter++;

		if (this.dragCounter === 1) {
			this.elementRef.nativeElement.classList.add(DRAG_OVER_CLASS);
		}
	}

	@HostListener('dragleave')
	public onDragLeave(): void {
		this.dragCounter--;

		if (this.dragCounter === 0) {
			this.elementRef.nativeElement.classList.remove(DRAG_OVER_CLASS);
		}
	}

	@HostListener('drop', ['$event'])
	public onDrop(event: DragEvent): void {
		event.preventDefault();
		this.elementRef.nativeElement.classList.remove(DRAG_OVER_CLASS);
		this.dragCounter = 0;

		const dragged = DraggableItemDirective.draggedItem();
		const target = this.item();

		if (!dragged || dragged === target) {
			return;
		}

		this.itemDrop.emit({
			from: dragged as T,
			to: target,
		});
	}
}
