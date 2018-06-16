import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { User } from "../models/user.model.client";
import { UserServiceClient } from "../services/user.service.client";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private service: UserServiceClient, private router: Router) {}

  user: User = new User();
  userId: string;

  updateUser() {
    this.service
      .updateUser(
        this.userId,
        this.user.username,
        this.user.password,
        this.user.firstName,
        this.user.lastName,
        this.user.email
      )
      .then(response => alert("User updated."));
  }

  logout() {
    // this.service.logout().then(() => this.router.navigate(["login"]));
    this.service.logout();
  }

  ngOnInit() {
    this.service.profile().then(user => {
      this.user = user;
      this.userId = user._id;
      console.log(user.firstName + user.lastName);
    });
  }
}
