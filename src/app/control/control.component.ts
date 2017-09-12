import { Component, OnInit, OnDestroy } from '@angular/core';
import { APP_CONFIG } from '../app.config'
import { ApiService } from '../core/api.service';
import { DisplayService } from '../core/display.service';
import { ErrorService } from '../core/error.service';
import { ErrorNameService } from '../core/errorName.service';

@Component({
  selector: 'control',
  templateUrl: 'control.html'
})
export class ControlComponent implements OnInit, OnDestroy {
  public displayObj: any = { hasError: Boolean };
  public actors: Array <any> = [];
  public actorMap: Map<number, Object> = new Map();
  public currentActor: any = {};
  public actorImageUrls: Array <any>;
  
  constructor(public apiService: ApiService, public displayService: DisplayService,
              public errorService: ErrorService, public errorNameService: ErrorNameService) 
  { }
  
  public ngOnInit() {
    this.displayObj.hasError = false
    this.currentActor.name = "";
    this.actorImageUrls = APP_CONFIG.actorImageUrls;
      this.actors = APP_CONFIG.actors;
      let i: number = 0;
      this.actors.forEach((a) => {
        a.id = i++;
      });
  }
  
  public getFilms(theId: number): void {
    this.displayObj.hasError = false
    let theActor = this.actors.find((a) => {
        return a.id === theId;
    });
    //-- get the actor's name for error display if no object to read
    this.errorNameService.show(theActor.name);
    //-- get the actor object if it's been cached --
    if(this.actorMap.has(theId)) {
      this.currentActor = this.actorMap.get(theId);
      this.displayObj = Object.assign({}, this.currentActor);
      this.displayService.show(this.displayObj);
    } else {
      //-- fetch the film URLs and the data for each film
      this.apiService.getActorFilms(theActor.url)
      .subscribe((response) => {
        this.apiService.getActorFilmsData(theActor.url);
        theActor.films = this.apiService.currentFilmObjs;
        this.actorMap.set(theActor.id, theActor);
        this.displayObj = Object.assign({}, theActor);
        this.displayService.show(this.displayObj);
      });
    }
  }
  
  public ngOnDestroy() {
  }
}