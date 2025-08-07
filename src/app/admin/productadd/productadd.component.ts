// productadd.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AdminserviceService } from '../service/adminservice.service';


@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.scss'],
})
export class ProductaddComponent implements OnInit {
  mainForm!: FormGroup;
  imagePreviews: string[] = [];
  categoryList = ['Select', 'Mobile', 'Clothes', 'Shoes', 'Laptop'];
  sideHeader?: string;

  constructor(private fb: FormBuilder, private adminservice: AdminserviceService) { }

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      basic: this.fb.group({
        productName: ['', Validators.required],
        sku: ['', Validators.required],
        brand: ['', Validators.required],
        category: ['', Validators.required],
        subcategory: [''],
        tags: [''],
        fullDescription: [''],
      }),
      pricing: this.fb.group({
        mrp: [''],
        sellingPrice: [''],
        discount: [''],
        stock: [''],
        lowStockAlert: [''],
        freeShipping: [false],
        shippingCharges: [''],
        returnWindow: [''],
        returnable: [true],
      }),
      specifications: this.fb.group({}),
    });
  }
  get basic(): FormGroup {
    return this.mainForm.get('basic') as FormGroup;
  }
  get pricing(): FormGroup {
    return this.mainForm.get('pricing') as FormGroup;
  }
  get details(): FormGroup {
    return this.mainForm.get('details') as FormGroup;
  }
  get specifications(): FormGroup {
    return this.mainForm.get('specifications') as FormGroup;
  }
  specFields: { label: string; controlName: string }[] = [];

  onCategoryChange(category: string): void {
    console.log('Selected Category:', category);

    this.adminservice.CategorySpec(category).subscribe({
      next: (res: string[]) => {
        console.log('API Response:', res);

        // Convert array of strings to array of { label, controlName } objects
        this.specFields = res.map((field) => ({
          controlName: field,
          label: this.toTitleCase(field)
        }));

        // Create new FormGroup for specifications
        const specGroup = this.fb.group({});
        this.specFields.forEach((spec) => {
          specGroup.addControl(spec.controlName, new FormControl('', Validators.required));
        });
        console.log('Specification Fields:', this.specFields);
        this.mainForm.setControl('specifications', specGroup);
      },
      error: (err) => {
        console.error('Failed to load category specs', err);
      }
    });
  }
  toTitleCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')        // insert space before capital letters
      .replace(/[_-]/g, ' ')             // replace _ or - with space
      .replace(/\s+/g, ' ')              // remove extra spaces
      .trim()
      .replace(/^./, (c) => c.toUpperCase()); // capitalize first letter
  }
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  validationError: string | null = null;

  get selectedFileSize(): string {
    if (!this.selectedFile) return '';
    const sizeInKB = this.selectedFile.size / 1024;
    console.log(sizeInKB);

    return sizeInKB > 1024
      ? (sizeInKB / 1024).toFixed(2) + ' MB'
      : sizeInKB.toFixed(2) + ' KB';
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
      this.reset();
      return;
    }

    const maxSizeMB = 2; // Max size in MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      this.validationError = 'Only JPG, PNG, or WEBP images are allowed.';
      this.reset();
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      this.validationError = `Image must be smaller than ${maxSizeMB} MB.`;
      this.reset();
      return;
    }

    this.validationError = null;
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  reset(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }


  onSubmit(): void {
    if (this.mainForm.valid) {
      console.log(this.mainForm.value);
    } else {
      this.mainForm.markAllAsTouched();
    }
  }
}
