import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginform = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  Login: boolean = true
  SignUp: boolean = false
  ngOnInit(): void {

  }
  showLogIn() {
    this.SignUp = false
    this.Login = true
  }
  showSignup() {
    this.SignUp = true
    this.Login = false
  }
  Save() {
    if (this.loginform.invalid) {
      return
    } else {
      sessionStorage.setItem('Username', JSON.stringify(this.loginform.controls['userName'].value));
      this.router.navigate(['/dash'])
    }
  }
}
