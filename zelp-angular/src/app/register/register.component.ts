import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceClient } from '../services/user.service.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient,
              private alertService: AlertServiceClient) { }

  username;
  password;
  password2;
  register(username, password, password2) {
    console.log([username, password, password2]);
    this.service
      .createUser(username, password)
      .then(data => this.success(),
          error => this.alertService.error(error));
  }

  ngOnInit() {
  }

  success() {
    this.router.navigate(['login'])
      .then(() => this.alertService.success('Registration successful!', true));
  }

}
