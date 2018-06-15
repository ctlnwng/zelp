import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model.client";
import { PostServiceClient } from "../services/post.service.client";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  constructor(private service: PostServiceClient) {}

  posts: Post[] = [];

  ngOnInit() {
    this.service.findAllPosts().then(posts => (this.posts = posts));
  }
}
