import { Subject } from 'rxjs';

export class ModalRefBase {
	protected afterClosed = new Subject<any>();
	protected afterSubmit = new Subject<any>();
	public afterClosed$ = this.afterClosed.asObservable();
	public afterSubmit$ = this.afterSubmit.asObservable();
}
