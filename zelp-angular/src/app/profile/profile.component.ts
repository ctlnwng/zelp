import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { User } from "../models/user.model.client";
import { UserServiceClient } from "../services/user.service.client";
import { AlertServiceClient } from "../services/alert.service.client";
import {LoggedinServiceClient} from '../services/loggedin.service.client';
import {Router} from '@angular/router';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private service: UserServiceClient,
    private alertService: AlertServiceClient,
    private loggedInService: LoggedinServiceClient,
    private router: Router
  ) {}

  user: User = new User();
  userId: string;
  userRole: string;
  loggedIn = false;

  updateUser() {
    if (!this.user.username) {
      this.alertService.error('Username is required!', false);
      return;
    }

    if (this.userRole === "Admin" && this.user.username !== "admin") {
      this.alertService.error("The username 'admin' cannot be changed", false);
      return;
    }

    if (this.userRole !== "Admin" && this.user.username === "admin") {
      this.alertService.error("The username 'admin' cannot be taken", false);
      return;
    }

    this.service
      .updateUser(
        this.userId,
        this.user.username,
        this.user.password,
        this.user.firstName,
        this.user.lastName,
        this.user.email
      )
      .then(response => this.updateSuccess(response),
        err => this.alertService.error(err, false));
  }

  updateSuccess(response) {
    if (response.status === 409) {
      this.alertService.error("username is already taken", false);
      return;
    }
    this.alertService.success("User updated!", false)
  }

  logout() {
    this.service.logout();
  }

  ngOnInit() {
    this.loggedInService.currentMessage.subscribe(loggedIn => this.loggedIn = loggedIn);

    if (!this.loggedIn) {
      this.router
        .navigate(["login"])
        .then(() => this.alertService.error("You need to be logged in!", false));
      return;
    }

    this.service.profile().then(user => {
      this.user = user;
      this.userId = user._id;

      switch (user.role) {
        case "0":
          this.userRole = "Admin";
          break;
        case "1":
          this.userRole = "Regular Foodie";
          break;
        case "2":
          this.userRole = "Restaurant Owner";
          break;
        default:
          this.userRole = "";
      }
    });
  }
}
