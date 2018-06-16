import { Component, OnInit, Input } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import { Response } from "../models/response.model.client";

@Component({
  selector: "app-response-list-item",
  templateUrl: "./response-list-item.component.html",
  styleUrls: ["./response-list-item.component.css"]
})
export class ResponseListItemComponent implements OnInit {
  @Input() response: Response;

  authorUsername: String;

  constructor(private userService: UserServiceClient) {}

  ngOnInit() {
    this.userService
      .findUserById(this.response.userId)
      .then(user => (this.authorUsername = user.username));
  }
}
