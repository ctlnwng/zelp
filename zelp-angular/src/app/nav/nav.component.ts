import { Component, OnInit } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import {Router} from '@angular/router';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loggedIn = false

  constructor(private service: UserServiceClient,
              private router: Router) {}

  validate(user) {
    console.log(user);
    if (user._id) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    this.service.logout();
  }

  ngOnInit() {
    this.service.profile()
      .then((user) => this.validate(user));
  }
}
