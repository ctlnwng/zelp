import { Component, OnInit } from '@angular/core';
import {LoggedinServiceClient} from '../services/loggedin.service.client';
import {Router} from '@angular/router';
import {AlertServiceClient} from '../services/alert.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {PostServiceClient} from '../services/post.service.client';
import {ResponseServiceClient} from '../services/response.service.client';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  isAdmin: boolean;
  viewOption = -1;

  registerForm: FormGroup;
  userRole = "";
  submitted = false;
  userUpdate = false;

  users = [];
  displayUser = [];
  user;
  userId;

  posts = [];
  displayPost = [];
  post;
  postId;

  responsesForPost = [];

  userView: boolean;
  postView: boolean;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loggedInService: LoggedinServiceClient,
              private alertService: AlertServiceClient,
              private userService: UserServiceClient,
              private postService: PostServiceClient,
              private responseService: ResponseServiceClient) { }

  ngOnInit() {
    this.loggedInService.currentUserRole.subscribe(role => this.isAdmin = (role === "0"));
    if (!this.isAdmin) {
      this.router
        .navigate(["home"])
        .then(() => this.alertService.error("Access Denied: you ain't admin", false));
      return;
    }
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      firstName: [""],
      lastName: [""],
      email: [""]
    });
    this.userService.findAllUsers().then(users => this.users = users)
      .then(() => this.displayUser = this.users.filter(
        user => user.role !== "0"));
    this.postService.findAllPosts().then(posts => this.posts = posts)
      .then(() => this.displayPost = this.posts);
  }

  selectUser(user) {
    this.userId = user._id;
    this.user = user;
    this.userView = true;
    this.postView = false;
    this.userUpdate = false;
    this.submitted = false;
    this.registerForm.reset();
  }

  selectPost(post) {
    this.postId = post._id;
    this.post = post;
    this.responseService.findResponseByPostId(post._id)
      .then(responses => this.responsesForPost = responses);
    this.userView = false;
    this.postView = true;
  }

  setView(val) {
    if(val != this.viewOption) {
      this.userView = false;
      this.postView = false;
      this.viewOption = val;
    }
  }

  setUserRoleView(val) {
    if(val === "0") {
      this.displayUser = this.users.filter(
        user => user.role !== val);
    } else {
      this.displayUser = this.users.filter(
        user => user.role === val)
    }
  }

  setPostTypeView(val) {
    if(val == "all") {
      this.displayPost = this.posts;
    } else {
      this.displayPost = this.posts.filter(
        post => post.type == val);
    }
  }

  role(val) {
    switch (val) {
      case "0":
        return  "Admin";
      case "1":
        return "Regular Foodie";
      case "2":
        return "Restaurant Owner";
      default:
        return "";
    }
  }

  type(val) {
    switch (val) {
      case "0":
        return "Regular Post";
      case "1":
        return "Promotion";
      default:
        return "";
    }
  }

  username(userIdVal) {
      for (var i=0; i<this.users.length; i++) {
        if (this.users[i]._id == userIdVal) {
          return this.users[i].username;
        }
      }
      return null;
  }

  create(username, password, firstName, lastName, email) {
    this.submitted = true;

    // Stop if there exists invalid form
    if (this.registerForm.invalid) {
      return;
    }

    if (this.userRole == "") {
      this.alertService.error("Please select a role.");
      return;
    }

    // No invalid form so proceed
    this.userService
      .createUserAd(username, password, firstName, lastName, email, this.userRole)
      .then(
        data => this.successCreate(data),
        error => this.alertService.error(error, false)
      );
  }

  successCreate(user) {
    this.users.push(user);
    this.displayUser.push(user);
    this.submitted = false;
    this.registerForm.reset();
    this.userRole = "";
    this.alertService.success("User created successfully!", false);
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId)
      .then(response => {if (response.status != 400) {
        this.users = this.users.filter(user => user._id != userId);
        this.displayUser = this.displayUser.filter(user => user._id != userId);
      }});
  }

  updateUser(username, password, firstName, lastName, email) {
    this.submitted = true;
    // Stop if there exists invalid form
    if (this.registerForm.invalid) {
      return;
    }

    if(this.user.username === "admin") {
      this.alertService.error("C'mon, Admin is a special name! Don't try to own that name!", false);
      return;
    }

    var index = this.users.indexOf(this.user);
    var index2 = this.displayUser.indexOf(this.user);

    var updatedUser = {
      _id: this.user._id,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: this.user.role
    }

    if(index > -1){
      this.users[index] = updatedUser; // will update item
    }
    if(index2 > -1){
      this.displayUser[index2] = updatedUser; // will update item
    }

    this.user = updatedUser;

    this.userService
      .updateUser(
        this.user._id,
        username,
        password,
        firstName,
        lastName,
        email
      )
      .then(response => {this.alertService.success("User updated!", false)
        this.userUpdate = false;
        this.submitted = false;
        this.registerForm.reset();});
  }

  clear() {
    this.userUpdate = false;
    this.submitted = false;
    this.registerForm.reset();
  }

  updateSetUp() {
    this.userUpdate = true;
    this.registerForm.setValue({
      username: this.user.username,
      password: this.user.password,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email})
    this.userRole = this.user.role;
  }

  deletePost(postId) {
    this.alertService.error("Need to implement delete Post on backend first", false);
  }

  deleteResponse(rid) {
    this.responseService.deleteResponse(rid).then(response => {
      this.responseService.findResponseByPostId(this.postId)
        .then(responses => this.responsesForPost = responses);
    });
  }

  setRole(role) {
    this.userRole = role;
  }

  get createForm() {
    return this.registerForm.controls;
  }
}
