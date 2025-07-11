// productadd.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.scss'],
})
export class ProductaddComponent implements OnInit {
  mainForm!: FormGroup;
  imagePreviews: string[] = [];
  categoryList = ['Select', 'Mobile', 'Clothes', 'Shoes', 'Laptop'];
  categorySpecifications: Record<
    string,
    { label: string; controlName: string; sideHeader?: string }[]
  > = {
    mobile: [
      // I. Core Components
      {
        label: 'Processor (CPU)',
        controlName: 'processor',
      },
      { label: 'RAM', controlName: 'ram' },
      { label: 'Storage Capacity (ROM)', controlName: 'storage' },

      // II. Display
      {
        label: 'Display Size & Resolution',
        controlName: 'displaySize',
      },
      { label: 'Refresh Rate', controlName: 'refreshRate' },

      // III. Camera
      {
        label: 'Megapixels (Main Camera)',
        controlName: 'megapixels',
      },
      { label: 'Lenses (Wide/UltraWide/Telephoto)', controlName: 'lenses' },
      {
        label: 'Computational Photography',
        controlName: 'computationalPhotography',
      },
      { label: 'ToF Sensor Support', controlName: 'tofSensor' },

      // IV. Battery
      {
        sideHeader: 'Battery',
        label: 'Battery Capacity (mAh)',
        controlName: 'batteryCapacity',
      },
      {
        label: 'Fast Charging Type (e.g., 80W SUPERVOOC)',
        controlName: 'fastCharging',
      },
      { label: 'Battery Type (Li-ion/Li-Po)', controlName: 'batteryType' },

      // V. Connectivity
      {
        label: '5G Support',
        controlName: 'support5g',
      },
      { label: 'Wi-Fi Version', controlName: 'wifi' },
      { label: 'Bluetooth Version', controlName: 'bluetooth' },
      { label: 'GPS Support', controlName: 'gps' },
      { label: 'IR Blaster', controlName: 'irBlaster' },

      // VI. Other Features
      {
        sideHeader: 'Other Features',
        label: 'Operating System (OS)',
        controlName: 'os',
      },
      {
        label: 'Biometric Security (Fingerprint/Face)',
        controlName: 'biometric',
      },
      { label: 'AI & Machine Learning Support', controlName: 'aiFeatures' },
      { label: 'Build Quality / Material', controlName: 'buildQuality' },
      { label: 'Water Resistance Rating', controlName: 'waterResistance' },
    ],
    clothes: [
      { label: 'FABRIC', controlName: 'fabric' },
      { label: 'Size', controlName: 'size' },
      { label: 'Material', controlName: 'material' },
      { label: 'Color', controlName: 'color' },
      { label: 'Fit Type', controlName: 'fitType' },
      { label: 'Sleeve Type', controlName: 'sleeveType' },
      { label: 'Neck Type', controlName: 'neckType' },
    ],
    shoes: [
      { label: 'Shoe Size', controlName: 'shoeSize' },
      { label: 'Material', controlName: 'material' },
      { label: 'Color', controlName: 'color' },
      { label: 'Sole Type', controlName: 'soleType' },
    ],
    laptop: [
      { label: 'Processor', controlName: 'processor' },
      { label: 'RAM', controlName: 'ram' },
      { label: 'Memory', controlName: 'Memory' },
      { label: 'Screen Size', controlName: 'screensize' },
      { label: 'Graphics Card', controlName: 'graphics' },
      { label: 'Battery', controlName: 'battery' },
      { label: 'Bluetooth Version', controlName: 'bluetooth' },
      { label: 'OS', controlName: 'os' },
      { label: 'Dimension', controlName: 'dimension' },
      { label: 'Weight', controlName: 'weight' },
      { label: 'Resolution', controlName: 'resolution' },
      { label: 'Slot', controlName: 'slot' },
    ],
  };

  specFields: { label: string; controlName: string }[] = [];
  sideHeader?: string;

  constructor(private fb: FormBuilder) {}

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
        currency: [''],
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

  onCategoryChange(category: string): void {
    const specs = this.categorySpecifications[category.toLowerCase()] || [];
    this.specFields = specs;
    const specGroup = this.fb.group({});
    specs.forEach((s) => {
      specGroup.addControl(
        s.controlName,
        new FormControl('', Validators.required)
      );
    });
    this.mainForm.setControl('specifications', specGroup);
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.imagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreviews.push(reader.result as string);
      reader.readAsDataURL(files[i]);
    }
  }

  onSubmit(): void {
    if (this.mainForm.valid) {
      console.log(this.mainForm.value);
    } else {
      this.mainForm.markAllAsTouched();
    }
  }
}
