import { Component, OnInit } from "@angular/core";
import { LoggedinServiceClient } from "../services/loggedin.service.client";
import { Router } from "@angular/router";
import { AlertServiceClient } from "../services/alert.service.client";
import { UserServiceClient } from "../services/user.service.client";
import { PostServiceClient } from "../services/post.service.client";
import { ResponseServiceClient } from "../services/response.service.client";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"]
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loggedInService: LoggedinServiceClient,
    private alertService: AlertServiceClient,
    private userService: UserServiceClient,
    private postService: PostServiceClient,
    private responseService: ResponseServiceClient
  ) {}

  // SELECT

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
    this.responseService
      .findResponseByPostId(post._id)
      .then(responses => (this.responsesForPost = responses));
    this.userView = false;
    this.postView = true;
  }

  // SET

  setView(val) {
    if (val != this.viewOption) {
      this.userView = false;
      this.postView = false;
      this.viewOption = val;
    }
  }

  setUserRoleView(val) {
    if (val === "0") {
      this.displayUser = this.users.filter(user => user.role !== val);
    } else {
      this.displayUser = this.users.filter(user => user.role === val);
    }
  }

  setPostTypeView(val) {
    if (val == "all") {
      this.displayPost = this.posts;
    } else {
      this.displayPost = this.posts.filter(post => post.type == val);
    }
  }

  setRole(role) {
    this.userRole = role;
  }

  // GET

  role(val) {
    switch (val) {
      case "0":
        return "Admin";
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
        return "Recommendation";
      case "1":
        return "Promotion";
      default:
        return "";
    }
  }

  username(userIdVal) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id == userIdVal) {
        return this.users[i].username;
      }
    }
    return null;
  }

  // CREATE

  create(username, password, firstName, lastName, email) {
    this.submitted = true;

    // stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.userRole == "") {
      this.alertService.error("Please select a role.");
      return;
    }

    // proceed if form is valid
    this.userService
      .createUserAd(
        username,
        password,
        firstName,
        lastName,
        email,
        this.userRole
      )
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

  // DELETE

  deleteUser(userId) {
    this.userService.deleteUser(userId).then(response => {
      if (response.status != 400) {
        this.users = this.users.filter(user => user._id != userId);
        this.displayUser = this.displayUser.filter(user => user._id != userId);
        this.userView = false;
      }
    });
  }

  deletePost(postId) {
    this.postService.deletePost(postId).then(posts =>
    {if (posts.status != 400) {
      this.posts = this.posts.filter(post => post._id != postId);
      this.displayPost = this.displayPost.filter(post => post._id != postId);
      this.postView = false;
    }}
    )
  }

  deleteResponse(rid) {
    this.responseService.deleteResponse(rid).then(response => {
      {if (response.status != 400) {
        this.responsesForPost = this.responsesForPost.filter(response => response._id != rid);
      }}
    });
  }

  // UPDATE

  updateSetUp() {
    this.userUpdate = true;
    this.registerForm.setValue({
      username: this.user.username,
      password: this.user.password,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    });
    this.userRole = this.user.role;
  }

  updateUser(username, password, firstName, lastName, email, role) {
    this.submitted = true;

    // stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.userRole !== "1" && this.userRole !== "2") {
      this.alertService.error("Please set roles for the user", false);
      return;
    }

    if (this.user.username === "admin") {
      this.alertService.error("The username 'admin' cannot be used.", false);
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
      role: this.userRole
    };

    if (index > -1) {
      this.users[index] = updatedUser; // will update item
    }
    if (index2 > -1) {
      this.displayUser[index2] = updatedUser; // will update item
    }

    this.user = updatedUser;

    this.userService
      .updateUser(this.user._id, username, password, firstName, lastName, email, role)
      .then(response => {
        this.alertService.success("User updated!", false);
        this.userUpdate = false;
        this.submitted = false;
        this.registerForm.reset();
      });
  }

  clear() {
    this.userUpdate = false;
    this.submitted = false;
    this.registerForm.reset();
  }

  get createForm() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.loggedInService.currentUserRole.subscribe(
      role => (this.isAdmin = role === "0")
    );
    if (!this.isAdmin) {
      this.router
        .navigate(["home"])
        .then(() =>
          this.alertService.error("Access Denied: you ain't admin", false)
        );
      return;
    }
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(0)]],
      firstName: [""],
      lastName: [""],
      email: [""]
    });
    this.userService
      .findAllUsers()
      .then(users => (this.users = users))
      .then(
        () => (this.displayUser = this.users.filter(user => user.role !== "0"))
      );
    this.postService
      .findAllPosts()
      .then(posts => (this.posts = posts))
      .then(() => (this.displayPost = this.posts));
  }
}
