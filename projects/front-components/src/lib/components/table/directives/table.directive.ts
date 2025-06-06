import {
	computed,
	Directive,
	ElementRef,
	inject,
	input,
	OnDestroy,
	OnInit,
	Renderer2,
} from '@angular/core';

const BORDER_CLASSES = {
	left: 'left-border',
	right: 'right-border',
} as const;

@Directive({
	standalone: true,
	selector: 'table[ssTable]',
	host: {
		'[class.has-border-radius]': 'hasBorderRadius()',
		'[class.show-cell-borders]': 'showCellBorders()',
		'[style.borderRadius]': 'tableBorderRadius()',
	},
})
export class TableDirective<T extends Partial<Record<keyof T, never>>>
	implements OnInit, OnDestroy
{
	private readonly elementRef = inject(ElementRef);
	private readonly renderer = inject(Renderer2);

	public readonly hasBorderRadius = input<boolean>(false);
	public readonly showCellBorders = input<boolean>(true);
	public columns = input<ReadonlyArray<keyof T>>([]);

	public readonly tableBorderRadius = computed(() =>
		this.hasBorderRadius() ? 'var(--border-radius-md)' : '0px',
	);

	private readonly observer: MutationObserver | null = new MutationObserver(
		(mutations) => {
			const isRelevantChange = mutations.some(
				(mutation) => mutation.target.nodeName === 'TR',
			);

			if (isRelevantChange) {
				this.updateTableStyles();
			}
		},
	);

	public ngOnInit(): void {
		this.setupObserver();
	}

	public ngOnDestroy(): void {
		this.observer?.disconnect();
	}

	private setupObserver(): void {
		const theadElement = this.getTheadElement();

		if (!theadElement) {
			return;
		}

		this.observer?.observe(theadElement, {
			childList: true,
			subtree: true,
			attributes: true,
		});

		this.updateTableStyles();
	}

	private updateTableStyles(): void {
		const tableRows = this.getTableRows();

		if (tableRows.length === 0) {
			return;
		}

		let isFirstColspan = false;
		let isLastColspan = false;

		tableRows.forEach((row, rowIndex) => {
			const headerCells = Array.from(
				row.querySelectorAll('th'),
			) as HTMLElement[];

			if (headerCells.length === 0) {
				return;
			}

			this.removeBorderStyles(headerCells);

			if (rowIndex === 0) {
				this.applyBorderStyles(headerCells, true, true);
			} else {
				this.applyBorderStyles(
					headerCells,
					isFirstColspan,
					isLastColspan,
				);
			}

			isFirstColspan = headerCells[0].hasAttribute('colspan');
			isLastColspan =
				headerCells[headerCells.length - 1].hasAttribute('colspan');
		});
	}

	private getTheadElement(): HTMLTableSectionElement | null {
		return this.elementRef.nativeElement.querySelector('thead');
	}

	private getTableRows(): HTMLTableRowElement[] {
		const thead = this.getTheadElement();

		return thead ? Array.from(thead.querySelectorAll('tr')) : [];
	}

	private applyBorderStyles(
		cells: HTMLElement[],
		applyLeft: boolean,
		applyRight: boolean,
	): void {
		if (applyLeft) {
			this.renderer.addClass(cells[0], BORDER_CLASSES.left);
		}

		if (applyRight && cells.length > 0) {
			this.renderer.addClass(
				cells[cells.length - 1],
				BORDER_CLASSES.right,
			);
		}
	}

	private removeBorderStyles(cells: HTMLElement[]): void {
		cells.forEach((cell) => {
			this.renderer.removeClass(cell, BORDER_CLASSES.left);
			this.renderer.removeClass(cell, BORDER_CLASSES.right);
		});
	}
}
