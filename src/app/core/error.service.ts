import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {
  public stream = new Subject<string>();
  
  constructor() { }

  public handleError(error: HttpResponse<any>): any {
    let msgText: string = error['message'] ? ' - ' + error['message'] : '';
    this.stream.next(msgText);

    return Observable.throw(error);
  }
}