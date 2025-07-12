import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss']
})
export class ProductManageComponent implements OnInit ,AfterViewInit{
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>();
  originalData: any[] = [];
  selectedStock: string[] = [];
  selectedItemDeliver: string[] = [];
  Stock = [
    { label: 'In Stock', key: 'instock' },
    { label: 'Low Stock', key: 'lowstock' },
    { label: 'Out of Stock', key: 'outofstock' },
  ];
  ProductDeliver = [
    { label: 'Publish', key: 'Publish' },
    { label: 'Draft', key: 'draft' }
  ]
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.originalData = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', stock: 'instock', ItemDeilver: 'Publish' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', stock: 'outofstock', ItemDeilver: 'draft' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', stock: 'instock', ItemDeilver: 'Publish' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', stock: 'instock', ItemDeilver: 'Publish' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', stock: 'lowstock', ItemDeilver: 'draft' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', stock: 'outofstock', ItemDeilver: 'Publish' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', stock: 'instock', ItemDeilver: 'Publish' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', stock: 'instock', ItemDeilver: 'draft' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', stock: 'outofstock', ItemDeilver: 'Publish' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', stock: 'lowstock', ItemDeilver: 'Publish' }
    ];

    this.dataSource.data = [...this.originalData];
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.symbol.toLowerCase().includes(filter) ||
        data.stock.toLowerCase().includes(filter)
      );
    }
  }

  onStockFilterChange(): void {
    if (this.selectedStock.length > 0) {
      this.dataSource.data = this.originalData.filter((item) => this.selectedStock.includes(item.stock)
      );
    } else {
      this.dataSource.data = [...this.originalData];
    }
  }
  onItemDeliverFilterChange() {
    if (this.selectedItemDeliver.length > 0) {
      this.dataSource.data = this.originalData.filter((item: any) => this.selectedItemDeliver.includes(item.ItemDeilver))
    } else {
      this.dataSource.data = [...this.originalData];
    }
  }
  Search(e: any): void {
    const searchValue = (e.target.value || '').trim().toLowerCase();
    this.dataSource.filter = searchValue;
  }

}
