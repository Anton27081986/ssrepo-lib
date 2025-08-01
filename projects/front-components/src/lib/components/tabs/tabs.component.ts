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
	output,
	signal,
	type TemplateRef,
	viewChild,
	viewChildren,
	WritableSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Tab } from '../../shared/models/interfaces/tab';
import { TabComponent } from '../tab/tab.component';
import { DropdownItemComponent, DropdownListComponent } from '../dropdown';

const gapBetweenTabs = 12;

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
export class TabsComponent implements AfterViewInit, OnDestroy {
	private readonly tabsBlock = viewChild('tabsBlock', {
		read: ElementRef,
	});

	private readonly tabItems = viewChildren('tabItem', {
		read: ElementRef,
	});

	public tabs: InputSignal<Tab[]> = input.required<Tab[]>();
	public readonly actionsRef: InputSignal<TemplateRef<{}> | null> =
		input<TemplateRef<{}> | null>(null);

	public readonly activeTabIndex: ModelSignal<number> = model(0);
	public readonly showFullList: WritableSignal<boolean> = signal(true);
	public readonly changeIndexEmit = output<number>();

	public totalWidthBlock = 0;
	private readonly resizeObserver: ResizeObserver = new ResizeObserver(() =>
		this.checkOverflow(),
	);

	protected get getActiveTab(): Tab {
		return this.tabs()[this.activeTabIndex()];
	}

	public ngAfterViewInit(): void {
		if (this.tabsBlock()) {
			this.resizeObserver.observe(this.tabsBlock()!.nativeElement);
		}

		this.checkOverflow();
	}

	public checkOverflow(): void {
		const containerWidth = this.tabsBlock()!.nativeElement.offsetWidth;
		const totalWidth = this.calculateTotalTabWidth();

		if (totalWidth > 0) {
			this.totalWidthBlock = totalWidth;
			this.showFullList.set(totalWidth <= containerWidth);
		} else if (this.totalWidthBlock < containerWidth) {
			this.showFullList.set(true);
		}
	}

	private calculateTotalTabWidth(): number {
		return this.tabItems().reduce((total, tab) => {
			const tabWidth =
				tab.nativeElement.getBoundingClientRect().width +
				gapBetweenTabs;

			return total + tabWidth;
		}, 0);
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
