import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { SearchServiceClient } from "../services/search.service.client";
import { AlertServiceClient } from "../services/alert.service.client";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Restaurant } from "../models/restaurant.model.client";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private service: SearchServiceClient,
    private router: Router,
    private alertService: AlertServiceClient
  ) {}

  searchForm: FormGroup;
  restaurant: Restaurant = new Restaurant();
  submitted = false;
  searchable = false;

  searchRestaurant(name, location) {
    this.submitted = true;
    this.service
      .getSearchResult(name, location)
      .then(
        data => this.success(data),
        error => this.alertService.error(error)
      );
  }

  success(data) {
    this.searchable = true;
    this.restaurant = data;
    this.sendMessage();
  }

  cancel() {
    this.searchable = false;
    this.searchForm.reset();
    this.submitted = false;
    // Not really necessary but it is proper to do it.
    this.restaurant = new Restaurant();
    this.sendMessage();
  }

  get form() {
    return this.searchForm.controls;
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: ["", Validators.required],
      location: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  sendMessage() {
    this.messageEvent.emit(this.restaurant);
  }
}
