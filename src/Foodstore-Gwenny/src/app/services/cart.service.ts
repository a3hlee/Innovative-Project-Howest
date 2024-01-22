import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  items: any[] = [];
  id: string = '';
  userId: string = '';
  productName: string = '';
  amount: number = 1;
  price!: number;
  totalPrice!: number;
  totalAmount!: number;

  constructor(
    private firestore: AngularFirestore, 
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getItems();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  addToCart(product: any) {
    this.authService.getUid().then(() => {
      this.userId = this.authService.userId;
      let productName = product.name;
      this.price = product.price;

      this.firestore.collection('carts').ref.where('name', '==', productName).get().then((snapshot) => {
        if (snapshot.empty) {
          this.firestore.collection('carts').add({
            userId: this.userId,
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            amount: this.amount
          });
        } else {
          snapshot.forEach(doc => {
            const amount = (doc.data() as any).amount;
            this.firestore.collection('carts').doc(doc.id).update({
              amount: amount + 1
            });
          });
        }
      }
      );
    }
    );
  }

  // getItems() {
  //   return this.firestore.collection('carts').snapshotChanges().pipe(
  //     map(actions => {
  //       let total = 0; // Initialize totalItemPrice
  //       this.items = actions.map(a => {
  //         const data = a.payload.doc.data() as any;
  //         this.id = a.payload.doc.id;
  //         total += data.price * data.amount; // Calculate totalItemPrice
  //         return { id: this.id, ...data };
  //       });
  //       this.totalItemPrice = total; // Update totalItemPrice property
  //       return this.items;
  //     })
  //   );
  // }

  getItems() {
    return this.firestore.collection('carts').snapshotChanges().pipe(
      map(actions => {
        let total = 0;
        let totalAmount = 0;
        this.items = actions.map(a => {
          const data = a.payload.doc.data() as any;
          this.id = a.payload.doc.id;
          total += data.price * data.amount;
          totalAmount += data.amount;
          return { id: this.id, ...data };
        });
        this.totalPrice = total;
        this.totalAmount = totalAmount; 
        return this.items;
      })
    );
  }

  checkout() {
   this.firestore.collection('carts').get().subscribe((snapshot) => {
     snapshot.forEach(doc => {
       this.firestore.collection('orders').add({
         userId: this.userId,
         imageUrl: (doc.data() as any).imageUrl,
         name: (doc.data() as any).name,
         price: (doc.data() as any).price,
         amount: (doc.data() as any).amount
       });
     });
   });
   this.clearCart();
  }

  clearCart() {
    this.firestore.collection('carts').get().subscribe((snapshot) => {
      snapshot.forEach(doc => {
        this.firestore.collection('carts').doc(doc.id).delete();
      });
    });
    return this.items;
  }

  deleteItem() {
    this.firestore.collection('carts').doc(this.id).delete();
  }

  updateAmount(product: any, operator: number) {
    this.authService.getUid().then(() => {
      this.userId = this.authService.userId;
      let productName = product.name;

      this.firestore.collection('carts').ref.where('name', '==', productName).get().then((snapshot) => {
        if (snapshot.empty) {
          this.openSnackBar('❗Product not found in cart', 'OK!');
        } else {
          snapshot.forEach(doc => {
            const amount = (doc.data() as any).amount;
            const updatedAmount = Math.max(0, amount + operator);

            if (updatedAmount === 0) {
              // If the updated amount is 0, remove the product from the collection
              this.firestore.collection('carts').doc(doc.id).delete();
            } else {
              // Update the amount in the collection
              this.firestore.collection('carts').doc(doc.id).update({
                amount: updatedAmount
              });
            }
          });
        }
      });
    });
  }
}