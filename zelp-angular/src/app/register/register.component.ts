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

    console.log([username, password, verifyPassword]);

    if (password !== verifyPassword) {
      this.alertService.error("password needs to match!");
      return;
    }

    if (this.role == "") {
      this.alertService.error("Please select a role.");
      return;
    }

    // Stop if there exists invalid form
    if (this.registerForm.invalid) {
      return;
    }

    // No invalid form so proceed
    this.service
      .createUser(username, password, this.role)
      .then(
        data => this.success(),
        error => this.alertService.error(error, false)
      );
  }

  setRole(role) {
    this.role = role;
  }

  get form() {
    return this.registerForm.controls;
  }

  // initial setting
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      verifyPassword: ["", Validators.required]
    });
  }

  success() {
    this.router
      .navigate(["login"])
      .then(() => this.alertService.success("Registration successful!", false));
  }
}
