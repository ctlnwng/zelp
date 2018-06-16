import { Component, OnInit } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from '@angular/router';
import {SearchServiceClient} from '../services/search.service.client';
import {AlertServiceClient} from '../services/alert.service.client';
import {Post} from '../models/post.model.client';
import {DataServiceClient} from '../services/data.service.client';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  searchForm: FormGroup;
  loggedIn = false;
  submitted = false;
  posts: Post[] = [];

  message: Post[];

  constructor(private formBuilder: FormBuilder,
              private service: UserServiceClient,
              private searchService: SearchServiceClient,
              private alertService: AlertServiceClient,
              private data: DataServiceClient,
              private router: Router) {}

  validate(user) {
    if (user._id) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  get form() {
    return this.searchForm.controls;
  }

  search(input) {
    this.submitted = true;

    if (this.searchForm.invalid) {
      this.alertService.error("Please provide the value to search.", false);
      return;
    }

    this.searchService.getPosts(input)
      .then(response => this.posts = response)
      .then(() => this.newMessage(this.posts))
      .then(() => this.router
        .navigate(["searchresult"]));
  }

  newMessage(message) {
    this.data.changeMessage(message);
  }


  logout() {
    this.service.logout();
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ["", Validators.required]
    });
    this.service.profile()
      .then((user) => this.validate(user));
    this.data.currentMessage
      .subscribe(message => this.message = message);

  }
}
