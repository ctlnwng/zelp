import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";
import { AlertServiceClient } from "../services/alert.service.client";
import { UserServiceClient } from "../services/user.service.client";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  login(username, password) {
    this.submitted = true;

    // stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.service
      .login(username, password)
      .then(
        data => this.success(data),
        error => this.alertService.error(error)
      );
  }

  get form() {
    return this.loginForm.controls;
  }

  success(data) {
    if (data != null) {
      this.router
        .navigate(["profile"])
        .then(() => this.alertService.success("Login successful!", false));
    } else {
      this.alertService.error(
        "Invalid username and password combination.",
        false
      );
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserServiceClient,
    private alertService: AlertServiceClient
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required]]
    });
  }
}
