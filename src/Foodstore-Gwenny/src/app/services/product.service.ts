import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  products: any[] = [];
  product: any;
  id: string = '';

  get isAdmin(): boolean | undefined {
    return this.authService.isAdmin;
  }

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProducts();
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
        alert('Product already exists');
      }
    }
    );

    return collection;
  }

  updateProduct(id: any, product: any) {
    return this.db.collection('products').doc(id).update(product);
  }

  deleteProduct() {
    return this.db.collection('products').doc(this.id).delete();
  }

  // getProduct(id: any) {
  //   return this.db.collection('products').doc(id).get();
  // }

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
