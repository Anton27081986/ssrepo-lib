import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilesUploadComponent } from '../../../../../front-components/src/lib/components';
import {
	FileFormats,
	ExtraSize,
	IconType,
	ButtonType,
	Colors,
	TextType,
} from '../../../../../front-components/src/lib/shared/models';

@Component({
	selector: 'app-files-upload-demo',
	standalone: true,
	template: `
		<div class="section">
			<h2 class="section-title">Multi-File Upload Demo</h2>
			<p class="section-description">
				Multi-file upload component with drag-and-drop, file list, and
				validation support.
			</p>

			<!-- Default Configuration -->
			<div class="sub-section">
				<h3 class="sub-section-title">Default Configuration</h3>
				<div class="component-row">
					<ss-lib-files-upload
						[maxSize]="5"
						[maxFiles]="3"
						[allowedFormatsList]="[
							FileFormats.JPEG,
							FileFormats.PNG,
						]"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>
				</div>
			</div>

			<!-- Disabled State -->
			<div class="sub-section">
				<h3 class="sub-section-title">Disabled State</h3>
				<div class="component-row">
					<ss-lib-files-upload
						[disabled]="true"
						[maxSize]="5"
						[maxFiles]="3"
						[allowedFormatsList]="[
							FileFormats.JPEG,
							FileFormats.PNG,
						]"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>
				</div>
			</div>

			<!-- Different File Limits -->
			<div class="sub-section">
				<h3 class="sub-section-title">Different File Limits</h3>

				<div class="component-row">
					<ss-lib-files-upload
						[maxSize]="10"
						[maxFiles]="1"
						[allowedFormatsList]="[FileFormats.JPEG]"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>

					<ss-lib-files-upload
						[maxSize]="2"
						[maxFiles]="5"
						[allowedFormatsList]="[
							FileFormats.PNG,
							FileFormats.GIF,
						]"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>
				</div>
			</div>

			<!-- Different Allowed Formats -->
			<div class="sub-section">
				<h3 class="sub-section-title">Different Allowed Formats</h3>

				<div class="component-row">
					<ss-lib-files-upload
						[maxSize]="5"
						[maxFiles]="3"
						[allowedFormatsList]="[FileFormats.PDF]"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>

					<ss-lib-files-upload
						[maxSize]="5"
						[maxFiles]="3"
						[allowedFormatsList]="[
							FileFormats.JPEG,
							FileFormats.PNG,
							FileFormats.GIF,
						]"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>
				</div>
			</div>

			<!-- Preloaded Files -->
			<div class="sub-section">
				<h3 class="sub-section-title">Preloaded Files</h3>
				<div class="component-row">
					<ss-lib-files-upload
						[maxSize]="5"
						[maxFiles]="3"
						[allowedFormatsList]="[
							FileFormats.JPEG,
							FileFormats.PNG,
						]"
						[files]="preloadedFiles"
						(filesChanged)="onFilesChanged($event)"
						(uploadCancel)="onUploadCancel($event)"
					></ss-lib-files-upload>
				</div>
			</div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FilesUploadComponent],
})
export class FilesUploadDemoComponent {
	// Sample preloaded files for demo
	protected readonly preloadedFiles: File[] = [
		new File([''], 'sample-image.jpg', { type: FileFormats.JPEG }),
		new File([''], 'sample-image.png', { type: FileFormats.PNG }),
	];

	protected readonly ExtraSize = ExtraSize;
	protected readonly IconType = IconType;
	protected readonly ButtonType = ButtonType;
	protected readonly Colors = Colors;
	protected readonly TextType = TextType;
	protected readonly FileFormats = FileFormats;

	public onFilesChanged(files: File[]): void {
		// eslint-disable-next-line no-console
		console.log('Files changed:', files);
	}

	public onUploadCancel(file: File): void {
		// eslint-disable-next-line no-console
		console.log('Upload canceled for file:', file);
	}
}
