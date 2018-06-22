import { Component, OnInit, Input } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import { Response } from "../models/response.model.client";
import {ResponseServiceClient} from '../services/response.service.client';

@Component({
  selector: "app-response-list-item",
  templateUrl: "./response-list-item.component.html",
  styleUrls: ["./response-list-item.component.css"]
})
export class ResponseListItemComponent implements OnInit {
  @Input() response: Response;

  authorUsername: String;

  constructor(private userService: UserServiceClient,
              private responseService: ResponseServiceClient) {}

  vote(type) {
    this.responseService.vote(type, this.response._id).then(response => {this.response = response});
  }

  ngOnInit() {
    this.userService
      .findUserById(this.response.userId)
      .then(user => (this.authorUsername = user.username));
  }
}
