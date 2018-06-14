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
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private service: UserServiceClient,
              private alertService: AlertServiceClient) { }

  register(username, password, password2) {
    console.log([username, password, password2]);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.service
      .createUser(username, password)
      .then(data => this.success(),
          error => this.alertService.error(error));
  }

  get form() { return this.registerForm.controls; }

  // initial setting
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]

    });
  }

  success() {
    this.router.navigate(['login'])
      .then(() => this.alertService.success('Registration successful!', true));
  }

}
