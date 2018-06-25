import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserServiceClient } from "../services/user.service.client";
import { AlertServiceClient } from "../services/alert.service.client";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  role = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserServiceClient,
    private alertService: AlertServiceClient
  ) {}

  register(username, password, verifyPassword) {
    this.submitted = true;

    if (password !== verifyPassword) {
      this.alertService.error("Passwords do not match");
      return;
    }

    if (this.role == "") {
      this.alertService.error("Please select a role");
      return;
    }

    // stop if invalid form exists
    if (this.registerForm.invalid) {
      return;
    }

    // proceed if form is valid
    this.service
      .createUser(username, password, this.role)
      .then(
        data => this.success(data),
        error => this.alertService.error(error, false)
      );
  }

  setRole(role) {
    this.role = role;
  }

  get form() {
    return this.registerForm.controls;
  }

  success(data) {
    if (data.status === 409) {
      this.alertService.error("username is already taken", false);
      return;
    }
    this.router
      .navigate(["login"])
      .then(() => this.alertService.success("Registration successful!", false));
  }

  // initial setting
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      verifyPassword: ["", Validators.required]
    });
  }
}
