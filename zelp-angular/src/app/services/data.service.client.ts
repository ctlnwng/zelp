import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../models/post.model.client';

@Injectable()
export class DataServiceClient {

  private messageSource = new BehaviorSubject<Post[]>([]);
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: Post[]) {
    this.messageSource.next(message);
  }


}
