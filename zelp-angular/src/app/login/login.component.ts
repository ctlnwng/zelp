
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertServiceClient } from '../services/alert.service.client';
import { UserServiceClient } from '../services/user.service.client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  login(username, password) {
    this.service
      .login(username, password)
      .then(data => this.success(data),
        error => this.alertService.error(error));
  }

  success(data) {
    console.log(data);
    this.router.navigate(['profile'])
      .then(() => this.alertService.success('Login successful!', true));
  }

  constructor(private router: Router,
              private service: UserServiceClient,
              private alertService: AlertServiceClient) { }


  ngOnInit() {}
}
