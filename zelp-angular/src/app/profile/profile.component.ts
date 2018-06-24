import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { User } from "../models/user.model.client";
import { UserServiceClient } from "../services/user.service.client";
import { Router } from "@angular/router";
import { AlertServiceClient } from "../services/alert.service.client";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private service: UserServiceClient,
    private alertService: AlertServiceClient,
    private router: Router
  ) {}

  user: User = new User();
  userId: string;
  userRole: string;

  updateUser() {
    if(this.userRole === "Admin" && this.user.username !== "admin") {
      this.alertService.error("C'mon, Admin is a special name! Don't try to change!", false);
      return;
    }

    if(this.user.username === "admin") {
      this.alertService.error("C'mon, Admin is a special name! Don't try to own that name!", false);
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
      .then(response => this.alertService.success("User updated!", false));
  }

  logout() {
    // this.service.logout().then(() => this.router.navigate(["login"]));
    this.service.logout();
  }

  ngOnInit() {
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
