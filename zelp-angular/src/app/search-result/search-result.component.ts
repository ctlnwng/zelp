import { Component, OnInit } from '@angular/core';
import {Post} from '../models/post.model.client';
import {DataServiceClient} from '../services/data.service.client';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  message: Post[];
  title: string;
  constructor(private data: DataServiceClient) { }

  ngOnInit() {
    this.data.currentMessage
      .subscribe(message => this.message = message);
    this.data.currentTitle
      .subscribe(title => this.title = title);
  }

}
