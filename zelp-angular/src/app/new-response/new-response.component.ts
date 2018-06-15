import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { SearchServiceClient } from "../services/search.service.client";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Restaurant} from '../models/restaurant.model.client';

@Component({
  selector: "app-new-response",
  templateUrl: "./new-response.component.html",
  styleUrls: ["./new-response.component.css"]
})
export class NewResponseComponent implements OnInit {
  @Input() postId: String;
  responseForm: FormGroup;
  restaurant: Restaurant = new Restaurant();
  description;

  constructor(private router: Router,
              private service: SearchServiceClient,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.responseForm = this.formBuilder.group({
    description: ["", Validators.required]
  });}

  receiveMessage($event) {
    this.restaurant = $event;
  }

  createResponse() {


  }

  get form() {
    return this.responseForm.controls;
  }

  check() {
    console.log(this.restaurant);
  }
}
