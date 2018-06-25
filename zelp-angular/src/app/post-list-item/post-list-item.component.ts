import { Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { Post } from "../models/post.model.client";
import { UserServiceClient } from "../services/user.service.client";
import {PostServiceClient} from '../services/post.service.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: "app-post-list-item",
  templateUrl: "./post-list-item.component.html",
  styleUrls: ["./post-list-item.component.css"]
})
export class PostListItemComponent implements OnInit {
  @Input() post: Post;
  @Input() userRole: string;
  @Input() able:boolean;

  currentUserId: string;
  authorUsername: string;
  @Output() postDeleted = new EventEmitter<String>();

  constructor(private userService: UserServiceClient,
              private postService: PostServiceClient,
              private alertService: AlertServiceClient) {}

  delete() {
    this.postService.deletePost(this.post._id).then(response => {
      if (response.conflict === true) {
        this.alertService.error("You can only delete your own post", false);
      } else {
        this.postDeleted.emit(this.post._id);
        this.alertService.success("Post deleted successfully!", false);
      }
    });
  }

  ngOnInit() {
    this.userService.profile().then(user => {
      this.currentUserId = user._id;
    });
    this.userService
      .findUserById(this.post.author)
      .then(user => (this.authorUsername = user.username));
  }
}
