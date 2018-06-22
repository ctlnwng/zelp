import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../models/post.model.client';

@Injectable()
export class DataServiceClient {

  private messageSource = new BehaviorSubject<Post[]>([]);
  currentMessage = this.messageSource.asObservable();

  private titleSource = new BehaviorSubject<string>('');
  currentTitle = this.titleSource.asObservable();

  private favoriteSource = new BehaviorSubject<Set<number>>(null);
  currentFavorites = this.favoriteSource.asObservable();

  constructor() {}

  changeMessage(message: Post[]) {
    this.messageSource.next(message);
  }

  changeTitle(message: string) {
    this.titleSource.next(message);
  }

  changeFavoritePosts(message: Set<number>) {
    this.favoriteSource.next(message);
  }
}
