import { Component, OnInit } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private userService: UserServiceClient) {}

  ngOnInit() {}
}
