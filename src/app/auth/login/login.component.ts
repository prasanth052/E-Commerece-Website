import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginform = this.fb.group({
      username: ['admin', [Validators.required]],
      // password: ['admin', [Validators.required, Validators.minLength(8)]],
      password: ['admin', Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loginVaildbtn = false;
  login() {
    this.loginVaildbtn = true;
    if (this.loginform.invalid) return this.loginform.markAsTouched();
    let user = this.loginform.get('username')?.value;
    let password = this.loginform.get('password')?.value;
    console.log(user,password);
    
    if (user == 'admin' && password == 'admin') {
       this.router.navigate(['/admin'])
    }else{
      this.router.navigate(['/products'])
    }
  }
}
