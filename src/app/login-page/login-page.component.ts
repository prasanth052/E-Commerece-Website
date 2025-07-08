import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginform!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.loginform = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  Login: boolean = true
  SignUp: boolean = false;
  signupForm!: FormGroup;
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      Repassword: ['', Validators.required],
      checkbox: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

  }
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const repassword = form.get('Repassword')?.value;

    return password === repassword ? null : { mismatch: true };
  }
  showLogIn() {
    this.SignUp = false
    this.Login = true
  }
  showSignup() {
    this.SignUp = true
    this.Login = false
  }
  @ViewChild('termsAndConditions') termsTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  openTerms(): void {
    this.dialogRef = this.dialog.open(this.termsTemplate, {
      width: '700px',
      maxHeight: '80vh',
      panelClass: 'terms-dialog',
      autoFocus: true,
      disableClose: true
    });
  }
  closeDialog() {
    console.log('werwr');
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      // fallback for templateRef usage
      this.dialog.closeAll();
    }
  }
  signupVaildbtn:boolean=false
  getSignUp() {
    this.signupVaildbtn=true
    if (this.signupForm.valid) {
      console.log("Form submitted:", this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
