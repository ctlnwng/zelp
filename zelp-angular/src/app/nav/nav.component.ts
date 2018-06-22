import { Component, OnInit } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from '@angular/router';
import {SearchServiceClient} from '../services/search.service.client';
import {AlertServiceClient} from '../services/alert.service.client';
import {Post} from '../models/post.model.client';
import {DataServiceClient} from '../services/data.service.client';
import {LoggedinServiceClient} from '../services/loggedin.service.client';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  searchForm: FormGroup;
  loggedIn: boolean;
  submitted = false;
  posts: Post[] = [];

  message: Post[];

  constructor(private formBuilder: FormBuilder,
              private service: UserServiceClient,
              private searchService: SearchServiceClient,
              private alertService: AlertServiceClient,
              private data: DataServiceClient,
              private loggedInService: LoggedinServiceClient,
              private router: Router) {}


  get form() {
    return this.searchForm.controls;
  }

  search(input) {
    this.submitted = true;

    if (this.searchForm.invalid) {
      this.alertService.error("Please provide the value to search.", false);
      this.submitted = false;
      return;
    }

    this.data.changeTitle(input);

    this.searchService.getPosts(input)
      .then(response => this.posts = response)
      .then(() => this.newMessage(this.posts))
      .then(() => this.router
        .navigate(["searchresult"]))
      .then(() => this.submitted = false)
      .then(() => this.searchForm.setValue({search: ''}));
  }

  newMessage(message) {
    this.data.changeMessage(message);
  }


  logout() {
    this.service.logout();
    this.loggedInService.changeMessage(false);
    localStorage.clear();
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ["", Validators.required]
    });
    this.loggedInService.currentMessage.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.data.currentMessage
      .subscribe(message => this.message = message);

  }
}
