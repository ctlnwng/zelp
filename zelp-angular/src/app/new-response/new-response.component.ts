import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Restaurant} from '../models/restaurant.model.client';
import {ResponseServiceClient} from '../services/response.service.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: "app-new-response",
  templateUrl: "./new-response.component.html",
  styleUrls: ["./new-response.component.css"]
})
export class NewResponseComponent implements OnInit {
  @Input() postId: String;
  responseForm: FormGroup;
  restaurant: Restaurant = new Restaurant();
  submitted = false;

  constructor(private router: Router,
              private service: ResponseServiceClient,
              private alertService: AlertServiceClient,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.responseForm = this.formBuilder.group({
    description: ["", Validators.required]
  });
  }

  receiveMessage($event) {
    this.restaurant = $event;
  }

  createResponse(description) {
    this.submitted = true;

    if (!this.restaurant.name) {
      this.alertService.error('Please Search The restaurant', false);
      return;
    }
    
    // Stop if there exists invalid form
    if (this.responseForm.invalid) {
      return;
    }

    this.service.createResponse(this.postId, this.restaurant, description)
      .then(data => this.success(data),
        err => this.alertService.error(err, false));
  }

  success(data) {
    console.log(data);
    console.log('Working!!!');
  }

  get form() {
    return this.responseForm.controls;
  }
}
