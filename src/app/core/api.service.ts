import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { ErrorService } from './error.service';
import { DataService } from './data.service';

@Injectable()
export class ApiService {
  public actor: any;
  public currentFilms: Array <any>;
  public currentFilmObjs: Array <any> = [];
  
  constructor(private dataService: DataService, private http: Http) { }
  
  public getActors(theUrl: string): Observable<any> {
    let source: Observable<any> = Observable.create((observer: Observer<any>) => {
      this.dataService.getData(theUrl)
      .subscribe((data) => {
        let fileObj = Object.assign({}, JSON.parse(data._body));
        observer.next({ actors : fileObj.characters });
      });
    });
    return source;
  }
  
  public getActorFilms(theUrl: string): Observable<any> {
    let source: Observable<any> = Observable.create((observer: Observer<any>) => {
      this.dataService.getData(theUrl)
      .subscribe((data) => {
        let actor = Object.assign({}, JSON.parse(data._body));
        observer.next({ films : actor.films });
      });
    });
    return source;
  }
  
  public getActorFilmsData(theUrl: string): void {
    this.clearFilmObjects();
    this.getActorFilms(theUrl)
      .subscribe((response) => {
        this.currentFilms = response.films;
        this.fetchActorFilmsData();
      });
  }
  
  public fetchActorFilmsData(): void {
    let requests: Array<any> = [];
    //-- create observables array --
    this.currentFilms.forEach((film) => {
      let r = this.http.get(film).map(res => res.json());
      requests.push(r);
    });
    //-- call forkJoin on the observables array
    Observable.forkJoin(requests).subscribe((results) => {
      results.forEach((r) => {
        this.currentFilmObjs.push(r);
      });
      this.currentFilms = [];
    });
  }
  
  private clearFilmObjects() {
    this.currentFilmObjs = [];
  }
}