import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Restaurant } from "../models/restaurant.model.client";
import { ResponseServiceClient } from "../services/response.service.client";
import { AlertServiceClient } from "../services/alert.service.client";

@Component({
  selector: "app-new-response",
  templateUrl: "./new-response.component.html",
  styleUrls: ["./new-response.component.css"]
})
export class NewResponseComponent implements OnInit {
  @Input() postId: String;
  @Output() responseCreated = new EventEmitter<String>();

  responseForm: FormGroup;
  restaurant: Restaurant = new Restaurant();
  submitted = false;

  constructor(
    private router: Router,
    private service: ResponseServiceClient,
    private alertService: AlertServiceClient,
    private formBuilder: FormBuilder
  ) {}

  receiveMessage($event) {
    this.restaurant = $event;
  }

  createResponse(description) {
    this.submitted = true;

    if (!this.restaurant.name) {
      this.alertService.error("Please search for a restaurant.", false);
      return;
    }

    // stop if form is invalid
    if (this.responseForm.invalid) {
      return;
    }

    this.service
      .createResponse(this.postId, this.restaurant, description)
      .then(
        data => this.success(data),
        err => this.alertService.error(err, false)
      );
  }

  success(data) {
    this.alertService.success("Recommendation added!", false);
    this.responseCreated.emit("responseCreated");
    // this.router.navigate(["post", this.postId, "new-response"]).then(() => {
    // this.alertService.success("Recommendation added!", false);
    // });
  }

  get form() {
    return this.responseForm.controls;
  }

  ngOnInit() {
    this.responseForm = this.formBuilder.group({
      description: ["", Validators.required]
    });
  }
}
