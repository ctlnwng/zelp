import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertServiceClient {
  private subject = new Subject<any>();
  private locationChange = false;

  constructor(private router: Router) {
    // when the route changes, alert message has to get cleared.
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.locationChange) {
          this.locationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, locationChange = false) {
    this.locationChange = locationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, locationChange = false) {
    this.locationChange = locationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
