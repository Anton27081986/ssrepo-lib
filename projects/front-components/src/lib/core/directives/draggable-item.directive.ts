// import {
// 	Directive,
// 	ElementRef,
// 	HostListener,
// 	inject,
// 	input,
// 	output,
// 	signal,
// } from '@angular/core';
//
// const DRAGGING_CLASS = 'dragging';
// const DRAG_OVER_CLASS = 'drag-over';
//
// @Directive({
// 	selector: '[ssDraggableItem]',
// 	standalone: true,
// })
// export class DraggableItemDirective<T> {
// 	private static readonly draggedItem = signal<unknown | null>(null);
// 	private readonly elementRef = inject(ElementRef<HTMLElement>);
// 	private dragCounter = 0;
// 	private lastTarget: T | null = null;
//
// 	public item = input.required<T>();
// 	public itemDrop = output<{ from: T; to: T }>();
//
// 	@HostListener('dragstart', ['$event'])
// 	public onDragStart(event: DragEvent): void {
// 		const originalRow = this.elementRef.nativeElement;
//
// 		if (!originalRow) {
// 			return;
// 		}
//
// 		DraggableItemDirective.draggedItem.set(this.item());
// 		event.dataTransfer?.setData('text/plain', JSON.stringify(this.item())); // Уникальные данные
// 		event.dataTransfer!.effectAllowed = 'move';
//
// 		originalRow.classList.add(DRAGGING_CLASS);
// 	}
//
// 	@HostListener('dragend')
// 	public onDragEnd(): void {
// 		DraggableItemDirective.draggedItem.set(null);
// 		this.elementRef.nativeElement.classList.remove(DRAGGING_CLASS);
// 	}
//
// 	@HostListener('dragover', ['$event'])
// 	public onDragOver(event: DragEvent): void {
// 		event.preventDefault();
// 		event.dataTransfer!.dropEffect = 'move';
// 	}
//
// 	@HostListener('dragenter', ['$event'])
// 	public onDragEnter(event: DragEvent): void {
// 		event.preventDefault();
// 		this.dragCounter++;
//
// 		if (this.dragCounter === 1) {
// 			this.elementRef.nativeElement.classList.add(DRAG_OVER_CLASS);
// 		}
//
// 		const dragged = DraggableItemDirective.draggedItem();
// 		const target = this.item();
//
// 		if (!dragged || dragged === target) {
// 			return;
// 		}
//
//
// 		// 💡 предотвращаем повторные вызовы
// 		if (this.lastTarget === target) {
// 			return;
// 		}
//
// 		console.log('this.lastTarget', this.lastTarget);
// 		console.log('target', target);
//
// 		this.lastTarget = target;
//
// 		this.itemDrop.emit({
// 			from: dragged as T,
// 			to: target,
// 		});
// 	}
//
// 	@HostListener('dragleave')
// 	public onDragLeave(): void {
// 		this.dragCounter--;
//
// 		if (this.dragCounter === 0) {
// 			this.elementRef.nativeElement.classList.remove(DRAG_OVER_CLASS);
// 		}
//
// 		this.lastTarget = null; // сброс
// 	}
//
// 	@HostListener('drop', ['$event'])
// 	public onDrop(event: DragEvent): void {
// 		event.preventDefault();
// 		this.elementRef.nativeElement.classList.remove(DRAG_OVER_CLASS);
// 		this.dragCounter = 0; // Сбрасываем счетчик
//
// 		// const dragged = DraggableItemDirective.draggedItem();
// 		// const target = this.item();
// 		//
// 		// if (!dragged || dragged === target) {
// 		// 	return;
// 		// }
// 		//
// 		// this.itemDrop.emit({
// 		// 	from: dragged as T,
// 		// 	to: target,
// 		// });
//
// 		this.lastTarget = null; // сброс
//
// 		// this.bannerDrop.emit({
// 		// 	bannerId: dragged.id,
// 		// 	newOrder: target.order,
// 		// });
// 	}
//
// 	private createDragImage(
// 		originalRow: HTMLElement,
// 		rect: DOMRect,
// 	): HTMLElement {
// 		const table = document.createElement('table');
// 		const tbody = document.createElement('tbody');
// 		const clonedRow = originalRow.cloneNode(true) as HTMLTableRowElement;
// 		const originalCells = originalRow.querySelectorAll('td');
// 		const clonedCells = clonedRow.querySelectorAll('td');
//
// 		table.style.cssText = `
// 			border-collapse: collapse;
// 			position: absolute;
// 			top: -9999px;
// 			left: -9999px;
// 			width: ${rect.width}px;
// 		`;
// 		clonedRow.style.cssText = `
// 			background: var(--surface-primary);
// 			box-shadow: 0px 2px 2px -1px var(--effects-shadows-4),
// 						0px 4px 6px -2px var(--effects-shadows-3),
// 						0px 12px 16px -4px var(--effects-shadows-8);
// 			pointer-events: none;
// 		`;
//
// 		originalCells.forEach((cell: HTMLTableCellElement, index: number) => {
// 			const width = cell.getBoundingClientRect().width;
//
// 			if (clonedCells[index]) {
// 				(clonedCells[index] as HTMLElement).style.width = `${width}px`;
// 			}
// 		});
//
// 		tbody.appendChild(clonedRow);
// 		table.appendChild(tbody);
//
// 		return table;
// 	}
// }

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
	public itemDrop = output<{ from: T; to: T }>();

	// 	@HostListener('dragstart', ['$event'])
	// 	public onDragStart(event: DragEvent): void {
	// 		const originalRow = this.elementRef.nativeElement;
	//
	// 		if (!originalRow) {
	// 			return;
	// 		}
	//
	// 		DraggableItemDirective.draggedItem.set(this.item());
	// 		event.dataTransfer?.setData('text/plain', JSON.stringify(this.item())); // Уникальные данные
	// 		event.dataTransfer!.effectAllowed = 'move';
	//
	// 		originalRow.classList.add(DRAGGING_CLASS);
	// 	}

	@HostListener('dragstart', ['$event'])
	public onDragStart(event: DragEvent): void {
		const originalRow = this.elementRef.nativeElement;

		if (!originalRow) {
			return;
		}

		DraggableItemDirective.draggedItem.set(this.item());
		event.dataTransfer?.setData('text/plain', JSON.stringify(this.item()));
		event.dataTransfer!.effectAllowed = 'move';

		// Set custom drag image
		const rect = originalRow.getBoundingClientRect();
		const dragImage = this.createDragImage(originalRow, rect);

		document.body.appendChild(dragImage);
		event.dataTransfer?.setDragImage(
			dragImage,
			rect.width / 2,
			rect.height / 2,
		);

		// Hide original element
		setTimeout(() => originalRow.classList.add(DRAGGING_CLASS), 0);
	}

	@HostListener('dragend')
	public onDragEnd(): void {
		DraggableItemDirective.draggedItem.set(null);
		this.elementRef.nativeElement.classList.remove(DRAGGING_CLASS);

		// Clean up drag image
		const dragImage = document.querySelector(
			'table[style*="position: absolute"]',
		);

		if (dragImage) {
			dragImage.remove();
		}
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
	}

	private createDragImage(
		originalRow: HTMLElement,
		rect: DOMRect,
	): HTMLElement {
		const table = document.createElement('table');
		const tbody = document.createElement('tbody');
		const clonedRow = originalRow.cloneNode(true) as HTMLElement;

		table.style.cssText = `
      border-collapse: collapse;
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: ${rect.width}px;
    `;
		clonedRow.style.cssText = `
      background: var(--surface-primary);
      box-shadow: 0px 2px 2px -1px var(--effects-shadows-4),
                  0px 4px 6px -2px var(--effects-shadows-3),
                  0px 12px 16px -4px var(--effects-shadows-8);
      pointer-events: none;
    `;

		tbody.appendChild(clonedRow);
		table.appendChild(tbody);

		return table;
	}
}
