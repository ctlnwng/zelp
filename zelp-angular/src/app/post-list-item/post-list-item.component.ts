import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../models/post.model.client";
import { UserServiceClient } from "../services/user.service.client";

@Component({
  selector: "app-post-list-item",
  templateUrl: "./post-list-item.component.html",
  styleUrls: ["./post-list-item.component.css"]
})
export class PostListItemComponent implements OnInit {
  @Input() post: Post;

  authorUsername: String;

  constructor(private userService: UserServiceClient) {}

  ngOnInit() {
    this.userService
      .findUserById(this.post.author)
      .then(user => (this.authorUsername = user.username));
  }
}
