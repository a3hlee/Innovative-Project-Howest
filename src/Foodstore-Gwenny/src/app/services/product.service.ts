import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  product: any;
  id: string = '';
  categoryId: string = '';

  get isAdmin(): boolean | undefined {
    return this.authService.isAdmin;
  }

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getProducts() {
    return this.db.collection('products').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          this.id = a.payload.doc.id;
          return { id: this.id, ...data };
        });
      })
    );
  }

  addProduct(product: any) {
    let productName = product.name;

    const collection = this.db.collection('products').ref.where('name', '==', productName).get().then((snapshot) => {
      if (snapshot.empty) {
        this.db.collection('products').add(product);
      } else {
        this.openSnackBar('❗Product already exists.', 'OK!');
      }
    }
    );

    return collection;
  }

  updateProduct(updateId: string ,product: any): Observable<void> {
    const productDoc = this.db.collection('products').doc(updateId);

    return new Observable<void>((observer) => {
      productDoc.ref.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          productDoc.update(product)
            .then(() => {
              observer.next();
              observer.complete();
              console.log("idUpdate: " + this.id);
              console.log("idUpdateVar: " + updateId);

            })
            .catch((error) => {
              console.error('Error updating product:', error);
              observer.error('Error updating product');
            });
        } else {
          console.error('Product not found');
          observer.error('Product not found');
        }
      });
    });
  }

  deleteProduct() {
    return this.db.collection('products').doc(this.id).delete();
  }

  getCategories() {
    return this.db.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          this.categoryId = a.payload.doc.id;
          return { id: this.categoryId, ...data };
        });
      })
    );
  }

  addCategory(category: any) {
    let categoryName = category.name;

    const collection = this.db.collection('categories').ref.where('name', '==', categoryName).get().then((snapshot) => {
      if (snapshot.empty) {
        this.db.collection('categories').add(category);
      } else {
        this.openSnackBar('❗Category already exists.', 'OK!');
      }
    }
    );

    return collection;
  }

  deleteCategory() {
    return this.db.collection('categories').doc(this.categoryId).delete();
  }

  uploadFile(file: File, path: string): Observable<string> {
    const storageRef = this.storage.ref(path);
    const uploadTask = storageRef.put(file);

    return new Observable<string>((observer) => {
      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          observer.next(downloadURL);
          observer.complete();
        });
      });
    });
  }
}
