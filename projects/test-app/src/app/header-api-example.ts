import {inject, Injectable} from '@angular/core';
import {BaseApiService} from '../../../front-components/src/lib/shared/services/base-api.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderApiExample {
  protected baseApiService: BaseApiService = inject(BaseApiService);

  exampleFunc(): Observable<any> {
    this.baseApiService.createObjRequest<null>('GET','https://jsonplaceholder.typicode.com/posts', null);
     // return this.baseApiService.initializationRequest()
    return of()
  }

}
