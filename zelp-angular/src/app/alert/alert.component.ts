import { Component, OnInit, OnDestroy } from '@angular/core';
import {AlertServiceClient} from '../services/alert.service.client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  msg: any;

  constructor(private alertServiceClient: AlertServiceClient) { }

  ngOnInit() {
    this.subscription =
      this.alertServiceClient.getMessage()
        .subscribe(msg => {
      this.msg = msg;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
