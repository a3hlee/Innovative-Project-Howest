import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.css']
})
export class SettingsAdminComponent implements OnInit {
  imageUrl: string | null = null;
  productName: string = '';
  productPrice: number = 0;
  productDescription: string = '';
  productCategory: string = '';
  productAmount: number = 1;

  categories: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['imageUrl', 'name', 'price', 'description', 'category', 'actions'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
  }

  getProducts() {
    const collectionRef = this.productService.getProducts();
    collectionRef.subscribe((ss: any[]) => this.products.data = ss);
  }

  deleteItem() {
    this.productService.deleteProduct();
  }

  saveItem(): void {
    if (this.imageUrl && this.productName && this.productPrice > 0) {
      const newProduct = {
        name: this.productName,
        imageUrl: this.imageUrl,
        price: this.productPrice,
        description: this.productDescription,
        category: this.productCategory,
        amount: this.productAmount
      };
  
      this.productService.addProduct(newProduct)
        .then(() => {
          this.imageUrl = '';
          this.productName = '';
          this.productPrice = 0;
          this.productDescription = '';
          this.productCategory = '';
          this.productService.openSnackBar('✅Successfully added product!', 'Nice!');
        })
        .catch(() => {
          this.productService.openSnackBar('❗Error adding product. Please try again.', 'OK!');
        });
    } else {
      this.productService.openSnackBar('❗Please select an image, a valid price, and enter a name.', 'OK!');
    }
  }

  getCategories() {
    const collectionRef = this.productService.getCategories();
    collectionRef.subscribe((ss: any[]) => this.categories = ss);
  }

  saveCategory(): void {
    if (this.productCategory) {
      const newCategory = {
        name: this.productCategory
      };

      this.productService.addCategory(newCategory)
        .then(() => {
          this.productCategory = '';
        });
    } else {
      this.productService.openSnackBar('❗Please enter a category name.', 'OK!');
    }
  }

  deleteCategoryItem(): void {
    this.productService.deleteCategory();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const path = `images/${new Date().getTime()}_${file.name}`;

    this.productService.uploadFile(file, path).subscribe((url) => {
      this.imageUrl = url;
    });
  }
}
