import { Subject } from 'rxjs';

export class ModalRefBase {
	public afterClosed = new Subject<unknown>();
	public afterSubmit = new Subject<unknown>();
	public afterDelete = new Subject<unknown>();
	public afterClosed$ = this.afterClosed.asObservable();
	public afterSubmit$ = this.afterSubmit.asObservable();
	public afterDelete$ = this.afterDelete.asObservable();
}
