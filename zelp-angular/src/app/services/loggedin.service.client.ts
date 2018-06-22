import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoggedinServiceClient {

  private messageSource = new BehaviorSubject<boolean>(false || localStorage.getItem('loggedIn') === 'true');
  currentMessage = this.messageSource.asObservable();

  private roleSource = new BehaviorSubject<string>(localStorage.getItem('userRole'));
  currentUserRole = this.roleSource.asObservable();

  constructor() {}

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  changeUserType(message: string) {
    this.roleSource.next(message);
  }
}
