import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
signupForm!:FormGroup
  constructor(private fb:FormBuilder,private dialog:MatDialog){}
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


