import { Component, OnInit } from "@angular/core";
import { AlertServiceClient } from "../services/alert.service.client";
import { Router, ActivatedRoute } from "@angular/router";
import { PostServiceClient } from "../services/post.service.client";
import { Post } from "../models/post.model.client";
import { Response } from "../models/response.model.client";
import { UserServiceClient } from "../services/user.service.client";
import { ResponseServiceClient } from "../services/response.service.client";
import { LoggedinServiceClient } from "../services/loggedin.service.client";
import { DataServiceClient } from "../services/data.service.client";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  showResponseForm = false;
  post: Post = new Post();
  userId;
  authorUsername: String;
  postId: number;
  responses: Response[] = [];

  loggedIn: boolean;
  favorite: boolean;
  userRole = "";

  constructor(
    private responseService: ResponseServiceClient,
    private postService: PostServiceClient,
    private userService: UserServiceClient,
    private router: Router,
    private alertService: AlertServiceClient,
    private loggedInService: LoggedinServiceClient,
    private route: ActivatedRoute,
    private data: DataServiceClient
  ) {
    this.route.params.subscribe(params => this.loadPost(params["postId"]));
  }

  loadPost(postId) {
    this.postService.findPostById(postId).then(post => {
      this.postId = postId;
      this.post = post;
      this.userService
        .findUserById(post.author)
        .then(user => {
          this.userId = user._id;
          (this.authorUsername = user.username)
        })
        .then(() => this.loadResponses())
        // IDEA: fetching from the server might be slower but more useful
        .then(() => {
          if (this.loggedIn) {
            this.data.currentFavorites.subscribe(favorites => {
              if (favorites !== null) {
                this.favorite = favorites.has(this.postId);
              }
            });
          }
        });
    });
  }

  reloadResponses(event) {
    this.showResponseForm = false;
    this.loadPost(this.postId);
  }

  createResponse() {
    // this is unncecessary since we've already made parent-child relationship for post and new response.
    this.router.navigate(["post", this.postId, "new-response"]);
    this.showResponseForm = true;
  }

  loadResponses() {
    this.responseService
      .findResponseByPostId(this.postId)
      .then(responses => (this.responses = responses))
      .then(() =>
        this.responses.sort((a, b) => {
          if (a.voteCounts < b.voteCounts) return 1;
          else if (a.voteCounts > b.voteCounts) return -1;
          else return 0;
        })
      );
  }

  prod() {
    // FIXME instead of having those in post-service.
    this.postService
      .addToFavorite(this.postId)
      .then(() => (this.favorite = !this.favorite))
      .then(() => {
        if (this.favorite) {
          this.alertService.success("Added to favorites!", false);
        } else {
          this.alertService.success("Removed from favorites", false);
        }
      });
  }

  isFavorite() {
    if (this.favorite) {
      return "fa fa-star";
    } else {
      return "fa fa-star outline";
    }
  }

  // deletePost() {
  //   this.postService.deletePost(this.postId).then(response => {
  //     if (response.conflict === true) {
  //       this.alertService.error("You can only delete your own post", false);
  //     } else {
  //       this.alertService.success("Post deleted successfully!", false);
  //     }
  //   });
  // }

  ngOnInit() {
    this.loggedInService.currentMessage.subscribe(
      loggedIn => (this.loggedIn = loggedIn)
    );
    this.loggedInService.currentUserRole.subscribe(
      userRole => (this.userRole = userRole)
    );
  }
}
