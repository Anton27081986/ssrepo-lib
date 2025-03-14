import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ILightBoxData, ModalRef } from '../../shared/models';
import { IconType } from '../../shared/models';
import { OverlayButtonComponent } from '../buttons';

@Component({
	selector: 'ss-lib-light-box',
	standalone: true,
	imports: [NgOptimizedImage, OverlayButtonComponent],
	templateUrl: './light-box.component.html',
	styleUrl: './light-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightBoxComponent {
	protected src: string;
	protected width: number;
	protected height: number;

	protected readonly IconType = IconType;

	constructor(private readonly modalRef: ModalRef<ILightBoxData>) {
		this.src = modalRef.data.src;
		this.width = modalRef.data.width;
		this.height = modalRef.data.height;
	}

	protected close(): void {
		this.modalRef.close();
	}
}
