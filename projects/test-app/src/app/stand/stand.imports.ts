import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgOptimizedImage } from '@angular/common';

import {
	IconComponent,
	TextComponent,
	ToggleComponent,
	ToggleIconComponent,
	FormFieldComponent,
	InputComponent,
	TextareaComponent,
	DropdownItemComponent,
	DropdownListComponent,
	SelectComponent,
	AvatarComponent,
	NumberPickerComponent,
	DividerComponent,
	ButtonComponent,
	UtilityButtonComponent,
	AvatarButtonComponent,
	CloseButtonComponent,
	BadgeComponent,
	EmptyStateComponent,
	PreviewButtonComponent,
	LinkComponent,
	SkeletonBlockComponent,
	BackdropButtonComponent,
	SpinnerComponent,
	TooltipDirective,
	ImageUploadComponent,
	CalendarComponent,
	DatepickerComponent,
	ProgressCircleComponent,
	ScrollbarComponent,
	TimepickerComponent,
	CheckboxComponent,
	OtpInputComponent,
	TabComponent,
	TabsComponent,
	CarouselComponent,
	PaginationDotsComponent,
	StatusIconComponent,
	DialogHeaderComponent,
	TagComponent,
	ProgressComponent,
	ActionBarComponent,
	ActionBarItemComponent,
	NavButtonComponent,
	LoadPaginationComponent,
	AccordionComponent,
	AccordionItemComponent,
} from '../../../../front-components/src/lib/components';

import {
	FieldCtrlDirective,
	ItemDirective,
	PopoverTriggerForDirective,
} from '../../../../front-components/src/lib/core/directives';

import { RepeatTimesPipe } from '../../../../front-components/src/lib/core/pipes';

export const standImports = [
	// Angular
	ReactiveFormsModule,
	NgFor,
	NgOptimizedImage,

	// Core utils
	RepeatTimesPipe,
	FieldCtrlDirective,
	ItemDirective,
	PopoverTriggerForDirective,
	TooltipDirective,

	// Form & Input components
	FormFieldComponent,
	InputComponent,
	TextareaComponent,
	CheckboxComponent,
	OtpInputComponent,
	NumberPickerComponent,
	DatepickerComponent,
	TimepickerComponent,
	CalendarComponent,

	// UI elements
	IconComponent,
	TextComponent,
	BadgeComponent,
	TagComponent,
	StatusIconComponent,
	ProgressComponent,
	ProgressCircleComponent,
	SkeletonBlockComponent,
	SpinnerComponent,

	// Buttons
	ButtonComponent,
	UtilityButtonComponent,
	AvatarButtonComponent,
	CloseButtonComponent,
	PreviewButtonComponent,
	BackdropButtonComponent,
	ToggleComponent,
	ToggleIconComponent,
	LinkComponent,
	NavButtonComponent,

	// Navigation & Layout
	DividerComponent,
	AvatarComponent,
	EmptyStateComponent,
	ScrollbarComponent,
	CarouselComponent,
	PaginationDotsComponent,
	TabComponent,
	TabsComponent,
	ActionBarComponent,
	ActionBarItemComponent,
	DialogHeaderComponent,

	// File & Media
	ImageUploadComponent,

	// Lists
	DropdownItemComponent,
	DropdownListComponent,
	SelectComponent,
	LoadPaginationComponent,
	AccordionComponent,
	AccordionItemComponent,
];
