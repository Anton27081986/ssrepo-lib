import type { InputSignal } from "@angular/core";
import { Component, input, ViewEncapsulation } from "@angular/core";
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from "@angular/animations";
import { NgIf } from "@angular/common";
import { IconComponent } from "../icon/icon.component";
import type { IMenu, NavButtonType } from "../../shared/models";
import { IconType, NavButton, TextType, TextWeight } from "../../shared/models";
import { TextComponent } from "../text/text.component";

@Component({
	selector: "ss-lib-nav-button",
	templateUrl: "./nav-button.component.html",
	standalone: true,
	styleUrls: ["./nav-button.component.scss"],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger("expendedPanel", [
			state("view", style({ display: "flex" })),
			state("hidden", style({ display: "none" })),
			transition("initial <=> hidden", animate("0.3s")),
		]),
	],
	imports: [IconComponent, TextComponent, NgIf],
})
export class NavButtonComponent {
	protected readonly IconType = IconType;
	public type: InputSignal<NavButtonType> = input<NavButton>(
		NavButton.NavBase,
	);

	public menu: InputSignal<IMenu> = input.required<IMenu>();

	constructor() {}

	protected readonly NuvButtonType = NavButton;
	protected readonly TextType = TextType;
	protected readonly TextWeight = TextWeight;
}
