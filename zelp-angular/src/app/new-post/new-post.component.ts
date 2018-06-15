import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertServiceClient } from "../services/alert.service.client";
import { PostServiceClient } from "../services/post.service.client";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.css"]
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertServiceClient,
    private service: PostServiceClient
  ) {}

  createPost(title, description) {
    this.submitted = true;

    console.log("Create" + title + description);

    if (this.postForm.invalid) {
      return;
    }

    this.service
      .createPost(title, description)
      .then(
        data => alert("success"),
        error => this.alertService.error(error, false)
      );
  }

  get form() {
    return this.postForm.controls;
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: [""]
    });
  }

  // success() {
  //   this.router
  //     .navigate(["login"])
  //     .then(() => this.alertService.success("Registration successful!", false));
  // }
}
