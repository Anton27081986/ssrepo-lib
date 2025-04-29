import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	input,
	InputSignal,
	model,
	ModelSignal,
	OnDestroy,
	OnInit,
	output,
	signal,
	type TemplateRef,
	ViewChild,
	WritableSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Tab } from '../../shared/models/interfaces/tab';
import { TabComponent } from '../tab/tab.component';
import { IconType } from '../../shared/models';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';

@Component({
	selector: 'ss-lib-tabs',
	templateUrl: 'tabs.component.html',
	styleUrls: ['tabs.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TabComponent,
		NgTemplateOutlet,
		DropdownItemComponent,
		DropdownListComponent,
	],
})
export class TabsComponent implements OnInit, AfterViewInit, OnDestroy {
	public tabs: InputSignal<Tab[]> = input.required<Tab[]>();

	public readonly actionsRef: InputSignal<TemplateRef<{}>> = input.required();

	public readonly activeTabIndex: ModelSignal<number> = model(0);

	public readonly changeIndexEmit = output<number>();

	public readonly showFullList: WritableSignal<boolean> = signal(true);

	public totalWidthBlock = 0;

	@ViewChild('tabsElem', { static: true })
	public tabsElem!: ElementRef<HTMLElement>;

	@ViewChild('tabsElemBlock', { static: true })
	public tabsElemBlock!: ElementRef<HTMLElement>;

	private resizeObserver!: ResizeObserver;
	protected readonly IconType = IconType;

	protected get getActiveTab(): Tab {
		return this.tabs()[this.activeTabIndex()];
	}

	public ngOnInit(): void {
		this.resizeObserver = new ResizeObserver(() => this.checkOverflow());

		if (this.tabsElemBlock) {
			this.resizeObserver.observe(this.tabsElemBlock.nativeElement);
		}
	}

	public ngAfterViewInit(): void {
		this.checkOverflow();
	}

	public checkOverflow(): void {
		const wrapper = this.tabsElemBlock.nativeElement;
		const containerWidth = wrapper.offsetWidth;
		let totalWidth = 0;

		this.tabs().forEach((tab, index) => {
			const tabElement = document.querySelector(
				`[data-tab-id="${index}"]`,
			);

			if (tabElement) {
				const tabWidth = tabElement.getBoundingClientRect().width + 12;

				totalWidth += tabWidth;
			}
		});

		if (totalWidth > 0) {
			this.totalWidthBlock = totalWidth;

			if (totalWidth > containerWidth) {
				this.showFullList.set(false);
			} else {
				this.showFullList.set(true);
			}
		} else if (this.totalWidthBlock < containerWidth) {
			this.showFullList.set(true);
		}
	}

	public ngOnDestroy(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
	}

	protected onTabChange(index: number): void {
		this.activeTabIndex.set(index);
		this.changeIndexEmit.emit(index);
	}
}
