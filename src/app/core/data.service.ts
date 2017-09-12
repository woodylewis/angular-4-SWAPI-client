import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { ErrorService } from './error.service';

@Injectable()
export class DataService {
  
  constructor(public http: Http, public error: ErrorService) { }
  
  public getData(theUrl): Observable<any> {
    return this.http.get(theUrl)
               .catch((res: HttpResponse<any>) => this.error.handleError(res));
    }
}