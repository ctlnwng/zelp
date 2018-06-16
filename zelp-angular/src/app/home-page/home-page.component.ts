import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model.client";
import { PostServiceClient } from "../services/post.service.client";

import {UserServiceClient} from '../services/user.service.client';
import {LoggedinServiceClient} from '../services/loggedin.service.client';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {

  constructor(private service: PostServiceClient,
              private userService: UserServiceClient,
              private loggedInService: LoggedinServiceClient) {}


  posts: Post[] = [];
  loggedIn = false;
  authorUsername: String;


  ngOnInit() {
    this.loggedInService.currentMessage.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.service.findAllPosts().then(posts => (this.posts = posts));
  }
}
