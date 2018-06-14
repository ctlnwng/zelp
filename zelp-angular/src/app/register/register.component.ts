import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceClient } from '../services/user.service.client';
import {AlertServiceClient} from '../services/alert.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private service: UserServiceClient,
              private alertService: AlertServiceClient) { }

  // username;
  // password;
  // password2;

  register(username, password, password2) {
    console.log([username, password, password2]);
    this.service
      .createUser(username, password)
      .then(data => this.success(),
          error => this.alertService.error(error));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  success() {
    this.router.navigate(['login'])
      .then(() => this.alertService.success('Registration successful!', true));
  }

}
