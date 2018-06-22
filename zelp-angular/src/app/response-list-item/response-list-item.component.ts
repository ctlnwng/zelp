import { Component, OnInit, Input } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import { Response } from "../models/response.model.client";
import {ResponseServiceClient} from '../services/response.service.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: "app-response-list-item",
  templateUrl: "./response-list-item.component.html",
  styleUrls: ["./response-list-item.component.css"]
})
export class ResponseListItemComponent implements OnInit {
  @Input() response: Response;
  @Input() loggedIn: boolean;

  authorUsername: String;

  constructor(private userService: UserServiceClient,
              private responseService: ResponseServiceClient,
              private alertService: AlertServiceClient) {}

  vote(type) {
    if(!this.loggedIn) {
      this.alertService.error("You need to be logged in to vote", false);
      return;
    }
    this.responseService.vote(type, this.response._id).then(response => {
      if(response.conflict) {
        this.alertService.error("You've already voted (You could still change your vote)", false);
      } else if (response.status === 404) {
        this.alertService.error("Invalid Credentials", false);
      } else {
        this.response = response
        this.alertService.success("Vote successful", false);
      }
    });
  }

  delete() {
    this.responseService.deleteResponse(this.response._id)
      .then(response => {
        console.log(response)
        if(response.status === 409) {
          this.alertService.error("This response wasn't made by you", false)
        } else {
          this.alertService.success("Vote successful", false)
        }});
  }


  ngOnInit() {
    this.userService
      .findUserById(this.response.userId)
      .then(user => (this.authorUsername = user.username));
  }
}
