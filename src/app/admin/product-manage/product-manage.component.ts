import { SharedService } from './../../shared/services/shared.service';
import { AdminserviceService } from './../service/adminservice.service';
import { ApiService } from './../../core/api.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss'],
})
export class ProductManageComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  originalData: any[] = [];

  selectedStock: string[] = [];
  selectedItemDeliver: string[] = [];
  ordersFilter: string = 'all';

  ProductDeliver = [
    { label: 'Publish', key: 'Publish' },
    { label: 'Draft', key: 'draft' },
  ];

  allColumns = [
    { def: 'Sno', label: 'Sno', visible: true },
    { def: 'productName', label: 'Product Name', visible: true },
    { def: 'brand', label: 'Brand', visible: true },
    { def: 'category', label: 'Category', visible: true },
    { def: 'basePrice', label: 'Base Price', visible: true },
    { def: 'finalPrice', label: 'Final Price', visible: true },
    { def: 'stock', label: 'Stock', visible: true },
    { def: 'stockStatus', label: 'Stock Status', visible: true },
    { def: 'actions', label: 'Actions', visible: true },
  ];

  Stock: any[] = [
    { label: 'All', key: 'all' }, // Default filter
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ApiService: ApiService,private SharedService:SharedService,

    private Adminservice: AdminserviceService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.ApiService.getAllproducts().subscribe({
      next: (res: any) => {
        this.originalData = res;
        this.originalData = this.originalData.map((item: any, i: number) => ({
          Sno: i + 1,
          ...item,
        }));
        this.dataSource.data = [...this.originalData];
        this.buildFilterOptions(this.originalData);
        console.log(this.dataSource.data);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchFilter = filter.trim().toLowerCase();
      const status = data.stockStatus?.toLowerCase() || 'not_updated';
      return (
        status.includes(this.ordersFilter.toLowerCase()) &&
        Object.values(data).some((val) =>
          String(val).toLowerCase().includes(searchFilter)
        )
      );
    };
  }
  // Stock
  buildFilterOptions(data: any[]): void {
    const normalize = (
      val: string | undefined | null,
      fallback: string = 'Not Updated'
    ) => {
      return val?.trim() ? val.trim() : fallback;
    };

    const toTitleCase = (str: string) =>
      str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // === Stock Status Filter ===
    const stockSet = new Set<string>();
    data.forEach((item) =>
      stockSet.add(normalize(item.stockStatus, 'Not Updated').toLowerCase())
    );

    const sortedStock = Array.from(stockSet).sort((a, b) => a.localeCompare(b));
    this.Stock = [
      { label: 'All', key: 'all' },
      ...sortedStock.map((status) => ({
        label:
          status === 'not updated' ? 'Stock Not Updated' : toTitleCase(status),
        key: status,
      })),
    ];

    // === Brand Filter ===
    const brandSet = new Set<string>();
    data.forEach((item) => {
      const normalized = normalize(item.brand, 'Not Updated').toLowerCase();
      brandSet.add(normalized);
    });

    const sortedBrands = Array.from(brandSet).sort((a, b) =>
      a.localeCompare(b)
    );
    this.uniqueBrands = [
      { label: 'All', key: 'all' },
      ...sortedBrands.map((brand) => ({
        label:
          brand === 'not updated' ? 'Brand Not Updated' : brand.toUpperCase(),
        key: brand, // now all lowercase
      })),
    ];

    console.log('✅ Stock Filters:', this.Stock);
    console.log('✅ Brand Filters:', this.uniqueBrands);
  }

  uniqueBrands: any;
  selectedBrand: any = 'all';
  getUniqueBrands(): void {
    const brands = new Set<string>();
    this.originalData.forEach((item) => {
      if (item.brand) brands.add(item.brand);
    });
    this.uniqueBrands = Array.from(brands);
  }
  onStockFilterChange(value: any): void {
    this.ordersFilter = value; // ✅ value is already the selected key (not an event)
    this.applyCombinedFilters();
  }

  onBrandFilterChange(selected: any): void {
    this.selectedBrand = selected; // Store the full { label, key } object
    this.applyCombinedFilters();
  }
  applyCombinedFilters(searchValue: string = ''): void {
    const search = searchValue.trim().toLowerCase();

    this.dataSource.data = this.originalData.filter((item) => {
      const stockStatus = (item.stockStatus || 'not updated')
        .trim()
        .toLowerCase();
      const brand = (item.brand || 'not updated').trim().toLowerCase();

      const selectedStock = this.ordersFilter?.toLowerCase() || 'all';
      const selectedBrand = this.selectedBrand?.key?.toLowerCase() || 'all';

      const matchStock =
        selectedStock === 'all' || stockStatus === selectedStock;
      const matchBrand = selectedBrand === 'all' || brand === selectedBrand;

      const matchesSearch = Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search)
      );

      return matchStock && matchBrand && matchesSearch;
    });
  }

  Search(e: any): void {
    const value = (e.target.value || '').trim().toLowerCase();
    this.applyCombinedFilters(value);
  }

  editRowId: string | null = null;
  originalRow: any;
  isSidenavOpen: boolean = true;
  editingCell = {
    rowId: null,
    field: null,
  };
  editProduct(row: any) {
    this.SharedService.toggle();
    this.originalRow = { ...row };
    this.editRowId = row._id;
  }

  saveProduct(row: any) {
    this.editRowId = null;
    const updateData: any = { id: row._id };

    for (const key in row) {
      if (key !== '_id' && this.originalRow[key] !== row[key]) {
        updateData[key] = row[key];
      }
    }

    if (Object.keys(updateData).length === 1) {
      alert('No changes detected.');
      return;
    }

    this.Adminservice.updateProduct(updateData).subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert(err.message);
      },
    });
  }

  cancelEdit() {
    this.editRowId = null;
  }

  deleteProduct(row: any) {
    // Placeholder for delete logic
    console.log('Deleting product:', row);
  }

  get visibleColumns(): string[] {
    return this.allColumns.filter((col) => col.visible).map((col) => col.def);
  }

  hideMultipleSelectionIndicator = signal(false);
  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update((v) => !v);
  }
}
