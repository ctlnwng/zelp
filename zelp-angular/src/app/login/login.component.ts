import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertServiceClient } from "../services/alert.service.client";
import { UserServiceClient } from "../services/user.service.client";
import { LoggedinServiceClient } from "../services/loggedin.service.client";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  role: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserServiceClient,
    private alertService: AlertServiceClient,
    private loggedInService: LoggedinServiceClient
  ) {}

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
      this.loggedInService.changeUserType(data.role);

      this.router
        .navigate(["profile"])
        .then(() => this.alertService.success("Login successful!", false));
      this.loggedInService.changeMessage(true);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("loggedIn", "true");
    } else {
      this.alertService.error(
        "Invalid username and password combination",
        false
      );
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required]]
    });
  }
}
