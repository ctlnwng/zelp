import { Component, OnInit } from '@angular/core';
import {LoggedinServiceClient} from '../services/loggedin.service.client';
import {Router} from '@angular/router';
import {AlertServiceClient} from '../services/alert.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {PostServiceClient} from '../services/post.service.client';
import {ResponseServiceClient} from '../services/response.service.client';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  isAdmin: boolean;
  viewOption = -1;

  users = [];
  displayUser = [];
  user;
  userId;

  posts = [];
  displayPost = [];
  post;
  postId;

  responsesForPost = [];

  userView: boolean;
  postView: boolean;


  constructor(private router: Router,
              private loggedInService: LoggedinServiceClient,
              private alertService: AlertServiceClient,
              private userService: UserServiceClient,
              private postService: PostServiceClient,
              private responseService: ResponseServiceClient) { }

  ngOnInit() {
    this.loggedInService.currentUserRole.subscribe(role => this.isAdmin = (role === "0"));
    if (!this.isAdmin) {
      this.router
        .navigate(["home"])
        .then(() => this.alertService.error("Access Denied: you ain't admin", false));
      return;
    }
    this.userService.findAllUsers().then(users => this.users = users)
      .then(() => this.displayUser = this.users.filter(
        user => user.role !== "0"));
    this.postService.findAllPosts().then(posts => this.posts = posts)
      .then(() => this.displayPost = this.posts);
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
    this.responseService.findResponseByPostId(post._id)
      .then(responses => this.responsesForPost = responses);
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

  setUserRoleView(val) {
    if(val === "0") {
      this.displayUser = this.users.filter(
        user => user.role !== val);
    } else {
      this.displayUser = this.users.filter(
        user => user.role === val)
    }
  }

  setPostTypeView(val) {
    if(val == "all") {
      this.displayPost = this.posts;
    } else {
      this.displayPost = this.posts.filter(
        post => post.type == val);
    }
  }

  role(val) {
    switch (val) {
      case "0":
        return  "Admin";
      case "1":
        return "Regular Foodie";
      case "2":
        return "Restaurant Owner";
      default:
        return "";
    }
  }

  type(val) {
    switch (val) {
      case "0":
        return "Regular Post";
      case "1":
        return "Promotion";
      default:
        return "";
    }
  }

  username(userIdVal) {
    let username;
    let result = this.users.filter(user => user._id = userIdVal)
    username = result[0].username;
    return username;
  }

  check() {

  }

}
