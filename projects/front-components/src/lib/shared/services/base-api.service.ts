import {inject, Injectable, WritableSignal} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {CanvasState} from '../../components/canvas/canvas.state';
import {SidebarType} from '../models/enums/sidebar-type';

@Injectable({providedIn: 'root'})
export class BaseApiService {
  protected http: HttpClient = inject(HttpClient);
  protected httpReq: HttpRequest<any> | null = null;
  protected canvasState: CanvasState = inject(CanvasState);
  type: WritableSignal<SidebarType> = this.canvasState.sidebarType;

  constructor() {}

  public createObjRequest<TBody>(method: 'GET' | 'HEAD | POST', url: string, body: TBody,reportProgress = false ) {
    this.httpReq = new HttpRequest(method, url, {
      reportProgress: reportProgress,
    });
  }

  // initializationRequest(): Observable<HttpEvent<unknown>> {
  //     return this.http.request(this.httpReq!)
  //       .pipe(
  //       map((event) =>{
  //       return this.getEventMessage(event)
  //     }),tap(val => {
  //         console.log('after',val)
  //     }))
  // }
}
