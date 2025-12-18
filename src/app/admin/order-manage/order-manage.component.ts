import { Component, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrl: './order-manage.component.scss'
})
export class OrderManageComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  filteredDataSource = new MatTableDataSource<any>();
  ordersFilter = 'all';

  allColumns = [
    { def: 'name', label: 'Product Name', visible: true },
    { def: 'category', label: 'Category', visible: true },
    { def: 'price', label: 'Price', visible: true },
    { def: 'stock', label: 'Stock', visible: true }
  ];


  ngOnInit(): void {
    // Sample data
    const products = [
      { name: 'Phone', category: 'Electronics', price: 20000, stock: 50 },
      { name: 'Shirt', category: 'Clothing', price: 999, stock: 0 },
      { name: 'Laptop', category: 'Electronics', price: 75000, stock: 5 },
      { name: 'Shoes', category: 'Footwear', price: 1999, stock: 10 }
    ];

    this.dataSource.data = products;
    this.filteredDataSource.data = products;
    this.visibleColumnDefs = this.allColumns.filter(c => c.visible).map(c => c.def);
  this.filteredDataSource.data = [...this.dataSource.data];
}
visibleColumnDefs: string[] = [];
get visibleColumns() {
  return this.allColumns
    .filter(col => this.visibleColumnDefs.includes(col.def))
    .map(col => col.def)
    .concat('actions');
}
  applyFilter(event: any) {
    this.hideMultipleSelectionIndicator.update((value: any) => !value);
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredDataSource.data = this.dataSource.data.filter((product: { [s: string]: unknown; } | ArrayLike<unknown>) =>
      Object.values(product).some(val =>
        String(val).toLowerCase().includes(value)
      ) && this.matchesStockFilter(product)
    );
  }
    hideMultipleSelectionIndicator = signal(false);
  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update(value => !value);
  }
  applyStockFilter() {
    this.filteredDataSource.data = this.dataSource.data.filter((product: any) =>
      this.matchesStockFilter(product)
    );
  }

  matchesStockFilter(product: any): boolean {
    switch (this.ordersFilter) {
      case 'delivery': return product.stock > 10;
      case 'notdelivery': return product.stock === 0;
      case 'cancelled': return product.stock > 0 && product.stock <= 10;
      default: return true;
    }
  }

  editProduct(product: any) {
    console.log('Edit', product);
  }

  deleteProduct(product: any) {
    console.log('Delete', product);
  }
}

