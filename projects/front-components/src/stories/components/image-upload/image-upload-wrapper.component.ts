import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from '../../../lib/components/image-upload/image-upload.component';

@Component({
	selector: 'ss-lib-image-upload-wrapper',
	standalone: true,
	imports: [ImageUploadComponent, ReactiveFormsModule],
	template: `
		<ss-lib-image-upload
			[formControl]="control"
			[disabled]="disabled()"
			[maxSize]="maxSize()"
			[maxHeight]="maxHeight()"
			[maxWidth]="maxWidth()"
			[src]="src()"
			(fileChanged)="onFileChanged($event)"
		></ss-lib-image-upload>
	`,
})
export class ImageUploadWrapperComponent {
	control = new FormControl<string | null>(null);
	disabled = input<boolean>(false);
	maxSize = input<number>(0);
	maxHeight = input<number>(0);
	maxWidth = input<number>(0);
	src = input<string | null>(null);

	onFileChanged(file: File | null): void {
		console.log('File changed:', file);
	}
}
