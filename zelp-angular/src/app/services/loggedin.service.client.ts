import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoggedinServiceClient {

  private messageSource = new BehaviorSubject<boolean>(false || localStorage.getItem('loggedIn') === 'true');
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }
}
