import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SearchServiceClient} from '../services/search.service.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private service: SearchServiceClient, private router: Router, private alertService: AlertServiceClient) {}

  ngOnInit() {
  }

}
