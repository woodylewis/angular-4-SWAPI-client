import { Component, OnInit, OnDestroy } from '@angular/core';
import { APP_CONFIG } from './app.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public bannerUrl: string;  
  
  constructor() { }
  
  public ngOnInit() {
    this.bannerUrl = APP_CONFIG.bannerUrl;
  }
  
  public ngOnDestroy() {
  }
}
