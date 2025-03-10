import { Subject } from "rxjs";

export class ModalRefBase {
	public afterClosed = new Subject<any>();
	public afterSubmit = new Subject<any>();
	public afterClosed$ = this.afterClosed.asObservable();
	public afterSubmit$ = this.afterSubmit.asObservable();
}
