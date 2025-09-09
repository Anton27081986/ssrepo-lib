import type { Routes } from '@angular/router';

import { TypographyDemoComponent } from './typography-demo/typography-demo.component';
import { IconsDemoComponent } from './icons-demo/icons-demo.component';
import { DividersDemoComponent } from './dividers-demo/dividers-demo.component';
import { ButtonsDemoComponent } from './buttons-demo/buttons-demo.component';
import { CloseButtonsDemoComponent } from './close-buttons-demo/close-buttons-demo.component';
import { UtilityButtonsDemoComponent } from './utility-buttons-demo/utility-buttons-demo.component';
import { PreviewButtonDemoComponent } from './preview-button-demo/preview-button-demo.component';
import { BackdropButtonDemoComponent } from './backdrop-button-demo/backdrop-button-demo.component';
import { LinksDemoComponent } from './links-demo/links-demo.component';
import { NavButtonsDemoComponent } from './nav-buttons-demo/nav-buttons-demo.component';
import { AvatarDemoComponent } from './avatar-demo/avatar-demo.component';
import { AvatarDropdownDemoComponent } from './avatar-dropdown-demo/avatar-dropdown-demo.component';
import { BadgesDemoComponent } from './badges-demo/badges-demo.component';
import { StatusIconsDemoComponent } from './status-icons-demo/status-icons-demo.component';
import { TagsDemoComponent } from './tags-demo/tags-demo.component';
import { FormFieldsDemoComponent } from './form-fields-demo/form-fields-demo.component';
import { SelectDropdownDemoComponent } from './select-dropdown-demo/select-dropdown-demo.component';
import { AccordionDemoComponent } from './accordion-demo/accordion-demo.component';
import { NumberPickerDemoComponent } from './number-picker-demo/number-picker-demo.component';
import { OtpInputDemoComponent } from './otp-input-demo/otp-input-demo.component';
import { CheckboxesDemoComponent } from './checkboxes-demo/checkboxes-demo.component';
import { TogglesDemoComponent } from './toggles-demo/toggles-demo.component';
import { TabsDemoComponent } from './tabs-demo/tabs-demo.component';
import { ActionBarDemoComponent } from './action-bar-demo/action-bar-demo.component';
import { SidePageTriggerDemoComponent } from './side-page-trigger-demo/side-page-trigger-demo.component';
import { DialogHeaderDemoComponent } from './dialog-header-demo/dialog-header-demo.component';
import { ModalTriggersDemoComponent } from './modal-triggers-demo/modal-triggers-demo.component';
import { ToastNotificationsDemoComponent } from './toast-notifications-demo/toast-notifications-demo.component';
import { TooltipDemoComponent } from './tooltip-demo/tooltip-demo.component';
import { ImageUploadProgressDemoComponent } from './image-upload-progress-demo/image-upload-progress-demo.component';
import { EmptyStateDemoComponent } from './empty-state-demo/empty-state-demo.component';
import { SkeletonBlocksDemoComponent } from './skeleton-blocks-demo/skeleton-blocks-demo.component';
import { ScrollbarDemoComponent } from './scrollbar-demo/scrollbar-demo.component';
import { CarouselDemoComponent } from './carousel-demo/carousel-demo.component';
import { TableExamplesDemoComponent } from './table-examples-demo/table-examples-demo.component';
import { LoadPaginationDemoComponent } from './load-pagination-demo/load-pagination-demo.component';
import { PopoverDemoComponent } from './popover-demo/popover-demo.component';
import { FilesUploadDemoComponent } from './files-upload-demo/files-upload-demo.component';

export const componentsRoutes: Routes = [
	{ path: 'typography', component: TypographyDemoComponent },
	{ path: 'icons', component: IconsDemoComponent },
	{ path: 'dividers', component: DividersDemoComponent },
	{ path: 'buttons', component: ButtonsDemoComponent },
	{ path: 'close-buttons', component: CloseButtonsDemoComponent },
	{ path: 'utility-buttons', component: UtilityButtonsDemoComponent },
	{ path: 'preview-button', component: PreviewButtonDemoComponent },
	{ path: 'backdrop-button', component: BackdropButtonDemoComponent },
	{ path: 'links', component: LinksDemoComponent },
	{ path: 'nav-buttons', component: NavButtonsDemoComponent },
	{ path: 'avatar', component: AvatarDemoComponent },
	{ path: 'avatar-dropdown', component: AvatarDropdownDemoComponent },
	{ path: 'badges', component: BadgesDemoComponent },
	{ path: 'status-icons', component: StatusIconsDemoComponent },
	{ path: 'tags', component: TagsDemoComponent },
	{ path: 'form-fields', component: FormFieldsDemoComponent },
	{ path: 'select-dropdown', component: SelectDropdownDemoComponent },
	{ path: 'accordion', component: AccordionDemoComponent },
	{ path: 'number-picker', component: NumberPickerDemoComponent },
	{ path: 'otp-input', component: OtpInputDemoComponent },
	{ path: 'checkboxes', component: CheckboxesDemoComponent },
	{ path: 'toggles', component: TogglesDemoComponent },
	{ path: 'tabs', component: TabsDemoComponent },
	{ path: 'action-bar', component: ActionBarDemoComponent },
	{ path: 'side-page-trigger', component: SidePageTriggerDemoComponent },
	{ path: 'dialog-header', component: DialogHeaderDemoComponent },
	{ path: 'modal-triggers', component: ModalTriggersDemoComponent },
	{ path: 'popover', component: PopoverDemoComponent },
	{ path: 'toast-notifications', component: ToastNotificationsDemoComponent },
	{ path: 'tooltip', component: TooltipDemoComponent },
	{
		path: 'image-upload-progress',
		component: ImageUploadProgressDemoComponent,
	},
	{ path: 'files-upload', component: FilesUploadDemoComponent },
	{ path: 'empty-state', component: EmptyStateDemoComponent },
	{ path: 'skeleton-blocks', component: SkeletonBlocksDemoComponent },
	{ path: 'scrollbar', component: ScrollbarDemoComponent },
	{ path: 'carousel', component: CarouselDemoComponent },
	{ path: 'table-examples', component: TableExamplesDemoComponent },
	{ path: 'load-pagination', component: LoadPaginationDemoComponent },
];
