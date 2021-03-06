import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model.client";
import { PostServiceClient } from "../services/post.service.client";

import { UserServiceClient } from "../services/user.service.client";
import { LoggedinServiceClient } from "../services/loggedin.service.client";
import { DataServiceClient } from "../services/data.service.client";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  posts: Post[] = [];
  myPosts: Post[] = [];
  favorites;
  loggedIn: boolean;
  userRole: string;

  // store prodded post Id
  favoritePostsId: Set<number> = new Set<number>();

  constructor(
    private service: PostServiceClient,
    private userService: UserServiceClient,
    private loggedInService: LoggedinServiceClient,
    private postService: PostServiceClient,
    private dataService: DataServiceClient
  ) {}

  extractPostsId(posts) {
    let i;
    for (i = 0; i < posts.length; i++) {
      this.favoritePostsId.add(posts[i].post._id);
    }
  }

  filterPosts(pid) {
    this.posts = this.posts.filter(post => post._id != pid);
    this.myPosts = this.myPosts.filter(post => post._id != pid);
  }

  ngOnInit() {
    this.loggedInService.currentMessage.subscribe(
      loggedIn => (this.loggedIn = loggedIn)
    );
    this.loggedInService.currentUserRole.subscribe(
      userRole => (this.userRole = userRole)
    );
    this.service.findAllPosts().then(posts => (this.posts = posts));
    if (this.loggedIn) {

      this.userService.profile().then(user => {
        this.postService.findPostByUserId(user._id)
          .then(posts => {
            this.myPosts = posts
          });
      });

      this.postService
        .findPostsForUser()
        .then(favorites => (this.favorites = favorites))
        .then(() => this.extractPostsId(this.favorites))
        .then(() => this.dataService.changeFavoritePosts(this.favoritePostsId));
    }
  }
}
