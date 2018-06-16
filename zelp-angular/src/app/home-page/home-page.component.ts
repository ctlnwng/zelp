import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model.client";
import { PostServiceClient } from "../services/post.service.client";
import { UserServiceClient } from "../services/user.service.client";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  constructor(
    private service: PostServiceClient,
    private userService: UserServiceClient
  ) {}

  posts: Post[] = [];
  loggedIn = false;
  authorUsername: String;

  validate(user) {
    if (user._id) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  getUsername(userId) {
    var username = "";
    this.userService
      .findUserById(userId)
      .then(user => (username = user.username));
    return username;
  }

  ngOnInit() {
    this.service.findAllPosts().then(posts => (this.posts = posts));
    this.userService.profile().then(user => this.validate(user));
  }
}
