import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SearchServiceClient} from '../services/search.service.client';
import {Restaurant} from '../models/restaurant.model.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private service: SearchServiceClient, private router: Router, private alertService: AlertServiceClient) {}

  restaurant: Restaurant = new Restaurant();


  ngOnInit() {
    this.service.getSearchResult("Love Art Sushi", "Boston, MA").then(restaurant => (this.restaurant = restaurant),
      error => this.alertService.error(error));
  }

}
