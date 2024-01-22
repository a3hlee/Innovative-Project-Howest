import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: any[] = [];
  amount!: number;
  totalItemPrice!: number;

  displayedColumns: string[] = ['imageUrl', 'name', 'amount', 'price', 'totalItemPrice', 'actions'];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    const collectionRef = this.cartService.getItems();
    collectionRef.subscribe(ss => this.items = ss);
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    return this.items;
  }

  removeItem() {
    this.cartService.deleteItem();
  }

  addOne(item: any) {
    this.cartService.updateAmount(item, 1);
  }

  removeOne(item: any) {
    this.cartService.updateAmount(item, -1);
  }

  clear() {
    this.cartService.clearCart();
  }
}
