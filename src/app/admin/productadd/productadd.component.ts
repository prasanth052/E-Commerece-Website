import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrl: './productadd.component.scss'
})
export class ProductaddComponent implements OnInit {
  form!: FormGroup
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      PrdName: ['', Validators.required],
      PrdType: ['', Validators.required],
      PrdBrand: ['', Validators.required],
      PrdGender: [''],
      PrdDesc: ['', Validators.required]
    })
  }

}
