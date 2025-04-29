import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	input,
	InputSignal,
	OnDestroy,
	OnInit,
	output,
	signal,
	type TemplateRef,
	ViewChild,
	WritableSignal,
} from '@angular/core';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Tab } from '../../shared/models/interfaces/tab';
import { TabComponent } from '../tab/tab.component';
import { DividerComponent } from '../divider/divider.component';
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
		DividerComponent,
		NgTemplateOutlet,
		DropdownItemComponent,
		DropdownListComponent,
		NgFor,
	],
})
export class TabsComponent implements OnInit, AfterViewInit, OnDestroy {
	public tabs: InputSignal<Tab[]> = input.required<Tab[]>();
	public readonly actionsRef: InputSignal<TemplateRef<{}>> = input.required();

	public readonly activeTab: WritableSignal<Tab | null> = signal(null);

	public readonly tabChangeEmit = output<Tab>();

	public readonly showFullList: WritableSignal<boolean> = signal(true);

	public totalWidthBlock = 0;

	@ViewChild('tabsElem', { static: true })
	public tabsElem!: ElementRef<HTMLElement>;

	@ViewChild('tabsElemBlock', { static: true })
	public tabsElemBlock!: ElementRef<HTMLElement>;

	private resizeObserver!: ResizeObserver;
	protected readonly IconType = IconType;

	public ngOnInit(): void {
		this.resizeObserver = new ResizeObserver(() => this.checkOverflow());

		if (this.tabsElemBlock) {
			this.resizeObserver.observe(this.tabsElemBlock.nativeElement);
		}

		const activeTab = this.tabs().find((tabs) => tabs.active);

		if (activeTab !== undefined) {
			this.activeTab.set(activeTab);
		}
	}

	public ngAfterViewInit(): void {
		this.checkOverflow();
	}

	public checkOverflow(): void {
		const wrapper = this.tabsElemBlock.nativeElement;
		const containerWidth = wrapper.offsetWidth;
		let totalWidth = 0;

		this.tabs().forEach((tab) => {
			const tabElement = document.querySelector(
				`[data-tab-id="${tab.id}"]`,
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

	protected onTabChange(tab: Tab): void {
		const oldActiveTab = this.tabs().find((item) => item.active);

		if (oldActiveTab !== undefined) {
			oldActiveTab.active = false;
		}

		tab.active = true;
		this.activeTab.set(tab);
		this.tabChangeEmit.emit(tab);
	}
}
