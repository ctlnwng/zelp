import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestaurantServiceClient } from "../services/restaurant.service.client";
import { Restaurant } from "../models/restaurant.model.client";
import { AlertServiceClient } from "../services/alert.service.client";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.css"]
})
export class RestaurantComponent implements OnInit {
  restaurant: Restaurant = new Restaurant();
  constructor(
    private service: RestaurantServiceClient,
    private router: Router,
    private alertService: AlertServiceClient
  ) {}

  ngOnInit() {
    this.service
      .getRestaurant("Love Art Sushi", "Boston, MA")
      .then(
        restaurant => (this.restaurant = restaurant),
        error => this.alertService.error(error)
      );
  }
}
