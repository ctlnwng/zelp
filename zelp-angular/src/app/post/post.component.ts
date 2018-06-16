import { Component, OnInit } from "@angular/core";
import { AlertServiceClient } from "../services/alert.service.client";
import { Router, ActivatedRoute } from "@angular/router";
import { PostServiceClient } from "../services/post.service.client";
import { Post } from "../models/post.model.client";
import { Response } from "../models/response.model.client";
import { UserServiceClient } from "../services/user.service.client";
import { ResponseServiceClient } from "../services/response.service.client";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  showResponseForm = false;
  constructor(
    private responseService: ResponseServiceClient,
    private postService: PostServiceClient,
    private userService: UserServiceClient,
    private router: Router,
    private alertService: AlertServiceClient,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.loadPost(params["postId"]));
  }

  post: Post = new Post();
  authorUsername: String;
  postId: Number;
  responses: Response[] = [];

  loadPost(postId) {
    this.postService.findPostById(postId).then(post => {
      this.postId = postId;
      this.post = post;
      this.userService
        .findUserById(post.author)
        .then(user => (this.authorUsername = user.username))
        .then(() => this.loadResponses());
    });
  }

  createResponse() {
    // this is unncecessary since we've already made parent-child relationship for post and new response.
    // this.router.navigate(["post", this.postId, "new-response"])
    this.showResponseForm = true;
  }

  loadResponses() {
    this.responseService.findResponseByPostId(this.postId)
      .then(responses => (this.responses = responses));
  }

  ngOnInit() {}
}
