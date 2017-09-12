import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorNameService {
  public stream = new Subject<string>();

    constructor() { }

    public show(displayObj: any): void {
        this.stream.next(displayObj);
    }
}