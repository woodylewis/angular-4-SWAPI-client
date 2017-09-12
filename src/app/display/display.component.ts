import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';
import { APP_CONFIG } from '../app.config'
import { DisplayService } from '../core/display.service';
import { ErrorService } from '../core/error.service';
import { ErrorNameService } from '../core/errorName.service';

@Component({
  selector: 'display',
  templateUrl: 'display.html'
})
export class DisplayComponent implements OnInit, OnDestroy {
  public displaySubscription: Subscription;
  public errorSubscription: Subscription;
  public errorNameSubscription: Subscription;
  public showActor: Boolean = false;
  public errorName: string = "";
  public hasError: Boolean = false;
  public currentActor: any = {};
  
  constructor(public displayService: DisplayService, 
              public errorService: ErrorService, public errorNameService: ErrorNameService) { }
  
  public ngOnInit() {
    this.displaySubscription = this.displayService.stream
    .subscribe((displayObj: any) => {
      this.currentActor = Object.assign({}, displayObj);
      this.hasError = this.currentActor.hasError;
      this.showActor = true;
      //console.log(this.currentActor);
    });
    
    this.errorSubscription = this.errorService.stream
    .subscribe((error: any) => {
      this.hasError = true;
      this.currentActor = {};
    });
    
    this.errorNameSubscription = this.errorNameService.stream
    .subscribe((errorActorName: string) => {
      this.errorName = errorActorName;
    });
  }
  
  public ngOnDestroy() {
    this.displaySubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.errorNameSubscription.unsubscribe();
  }
}