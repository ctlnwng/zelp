import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertServiceClient } from "../services/alert.service.client";
import { PostServiceClient } from "../services/post.service.client";
import { Post } from "../models/post.model.client";
import { LoggedinServiceClient } from "../services/loggedin.service.client";
import { Restaurant } from "../models/restaurant.model.client";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;
  userRole = "";
  restaurant: Restaurant = new Restaurant();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertServiceClient,
    private service: PostServiceClient,
    private loggedInService: LoggedinServiceClient
  ) {}

  createPost(title, description) {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    this.service
      .createPost(title, description, this.restaurant)
      .then(
        data => this.success(data),
        error => this.alertService.error(error, false)
      );
  }

  get form() {
    return this.postForm.controls;
  }

  success(data) {
    this.alertService.success("Post created!", false);
    this.router
      .navigate(["post", data._id, "new-response"])
      .then(() => this.alertService.success("Post created!", false));
  }

  receiveMessage($event) {
    this.restaurant = $event;
  }

  ngOnInit() {
    this.loggedInService.currentUserRole.subscribe(
      userRole => (this.userRole = userRole)
    );
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: [""]
    });
  }
}
