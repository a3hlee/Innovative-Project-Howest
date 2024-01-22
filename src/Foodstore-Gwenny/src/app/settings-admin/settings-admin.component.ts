import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';

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

  products = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['imageUrl', 'name', 'price', 'description', 'category', 'actions'];

  constructor(private productService: ProductService) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const path = `images/${new Date().getTime()}_${file.name}`;

    this.productService.uploadFile(file, path).subscribe((url) => {
      this.imageUrl = url;
    });
  }

  saveItem(): void {
    if (this.imageUrl && this.productName && this.productPrice) {
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
          this.imageUrl = null;
          this.productName = '';
          this.productPrice = 0;
          this.productDescription = '';
          this.productCategory = '';
        });
    } else {
      alert('Please select an image, a price and enter a name.');
    }
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    const collectionRef = this.productService.getCategories();
    collectionRef.subscribe((ss: any[]) => this.categories = ss);
  }

  getProducts() {
    const collectionRef = this.productService.getProducts();
    collectionRef.subscribe((ss: any[]) => this.products.data = ss);
  }

  deleteItem() {
    this.productService.deleteProduct();
  }
}
