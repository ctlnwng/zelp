import { Component, OnInit } from '@angular/core';
import {AlertServiceClient} from '../services/alert.service.client';
import {Router} from '@angular/router';
import {Restaurant} from '../models/restaurant.model.client';
import {PostServiceClient} from '../services/post.service.client';
import {Post} from '../models/post.model.client';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(private service: PostServiceClient, private router: Router, private alertService: AlertServiceClient) {}

  post: Post = new Post();


  ngOnInit() {
    this.service.findPostById('5b23bfe75b20fa59e852af95')
      .then(post => (this.post = post),
      error => this.alertService.error(error));
  }
}
