import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: any[] = [];

  constructor(
    private productService: ProductService, 
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const collectionRef = this.productService.getProducts();
    collectionRef.subscribe(ss => this.products = ss);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
