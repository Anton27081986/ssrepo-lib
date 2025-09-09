import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {
	ImageUploadComponent,
	ProgressComponent,
	SpinnerComponent,
} from '../../../../../front-components/src/lib/components';
import { ToastTypeEnum } from '../../../../../front-components/src/lib/shared/models';
import { SharedPopupService } from '../../../../../front-components/src/lib/shared/services';

@Component({
	selector: 'app-image-upload-progress-demo',
	standalone: true,
	template: ` <div class="section">
		<h2 class="section-title">Image Upload & Progress Indicators</h2>

		<p class="section-description">
			Showcases image upload component with progress indicators.
		</p>

		<div class="component-row">
			<ss-lib-progress
				[total]="100"
				[current]="50"
			></ss-lib-progress>

			<ss-lib-spinner [displaySpinnerText]="true"></ss-lib-spinner>
		</div>

		<div class="sub-section">
			<ss-lib-image-upload
				class="spaced"
				[progress]="fileLoadProgress()"
				(fileChanged)="uploadFile($event)"
				(uploadCancel)="uploadCancel()"
			></ss-lib-image-upload>
		</div>
	</div>`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ImageUploadComponent, ProgressComponent, SpinnerComponent],
})
export class ImageUploadProgressDemoComponent {
	private readonly sharedPopupService = inject(SharedPopupService);
	private readonly http = inject(HttpClient);

	public fileLoadProgress = signal<number>(0);
	public fileLoadSubscription?: Subscription;

	public uploadFile(file: File | null): void {
		if (file) {
			this.fileLoadProgress.set(0);
			const formData = new FormData();

			formData.append('file', file);

			this.fileLoadSubscription = this.http
				.post<{ url: string }>(
					`https://erp-dev.ssnab.it/api/files/fileStorage/2/upload`,
					formData,
					{
						reportProgress: true,
						observe: 'events',
						headers: {
							authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5NTkwMjQ4IiwiTW9sSWQiOiI5NTk0MjQwIiwic3ViIjoi0KDRg9C00LXQvdC60L4g0J4u0JIuIiwiZW1haWwiOiJydWRlbmtvLm92QHNzbmFiLnJ1IiwianRpIjoiN2E5Y2I2ZDAtZjM2Mi00MWNjLWI2MWQtZmE1MTM3ZTBhMDQyIiwiYXVkIjoiaHR0cHM6Ly9lcnAtZGV2LnNzbmFiLml0IiwiaXNzIjoiU1MuRVJQLkRldiIsIm5iZiI6MTc0MjgxNTgxOSwiZXhwIjoxNzQzNDIwNjE5LCJpYXQiOjE3NDI4MTU4MTl9.DZTE2YLTg2F3gp35cwuak46ekRzgSo0pfaeEs6yUZL0',
						},
					},
				)
				.subscribe({
					next: (resp) => {
						if (resp.type === HttpEventType.Response) {
							this.fileLoadProgress.set(100);
						}

						if (
							resp.type === HttpEventType.UploadProgress &&
							resp.total
						) {
							this.fileLoadProgress.set(
								Math.round((100 * resp.loaded) / resp.total),
							);
						}
					},
					error: (err: unknown) => {
						this.sharedPopupService.openToast({
							text: 'Ошибка при загрузке файла, включи впн',
							type: ToastTypeEnum.Error,
						});

						console.error('Ошибка при загрузке файла:', err);
						this.fileLoadProgress.set(0);
					},
				});
		}
	}

	public uploadCancel(): void {
		if (this.fileLoadSubscription) {
			this.fileLoadSubscription.unsubscribe();
		}
	}
}
