import { Component, OnInit } from '@angular/core';
import {LoggedinServiceClient} from '../services/loggedin.service.client';
import {Router} from '@angular/router';
import {AlertServiceClient} from '../services/alert.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {PostServiceClient} from '../services/post.service.client';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  isAdmin: boolean;
  viewOption = -1;

  users = [];
  user;
  userId;

  posts = [];
  post;
  postId;

  responsesForPost = [];

  userView: boolean;
  postView: boolean;


  constructor(private router: Router,
              private loggedInService: LoggedinServiceClient,
              private alertService: AlertServiceClient,
              private userService: UserServiceClient,
              private postService: PostServiceClient) { }

  ngOnInit() {
    this.loggedInService.currentUserRole.subscribe(role => this.isAdmin = (role === "0"));
    if (!this.isAdmin) {
      this.router
        .navigate(["home"])
        .then(() => this.alertService.error("Access Denied: you ain't admin", false));
      return;
    }
    this.userService.findAllUsers().then(users => this.users = users);
    this.postService.findAllPosts().then(posts => this.posts = posts);
  }

  selectUser(user) {
    this.userId = user._id;
    this.user = user;
    this.userView = true;
    this.postView = false;
  }

  selectPost(post) {
    this.postId = post._id;
    this.post = post;
    this.userView = false;
    this.postView = true;
  }

  setView(val) {
    if(val != this.viewOption) {
      this.userView = false;
      this.postView = false;
      this.viewOption = val;
    }
  }

  check() {

  }

}
