import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.doLogin(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          sessionStorage.setItem('storeId', data['STORE_ID']);
          sessionStorage.setItem('userId', data['userId']);
          sessionStorage.setItem('WCToken', data['WCToken']);
          sessionStorage.setItem('WCTrustedToken', data['WCTrustedToken']);
          sessionStorage.setItem('personalizationID', data['personalizationID']);
          this.router.navigate(['/home']);
          this.loading = false;
        },
        error => {
          console.log('in error' , error);
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
