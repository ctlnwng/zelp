
import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {AlertServiceClient} from '../services/alert.service.client';
import {UserServiceClient} from '../services/user.service.client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  login(username, password) {
    console.log('Login process check!')
    console.log([username, password]);
    this.service
      .loginUser(username, password)
      .then(data => this.success(),
      error => this.alertService.error(error))
  }

  constructor(private router: Router,
              private service: UserServiceClient,
              private alertService: AlertServiceClient) { }
  success() {
    this.router.navigate(['login'])
      .then(() => this.alertService.success('Login successful!', true));
  }

  ngOnInit() {}
}
