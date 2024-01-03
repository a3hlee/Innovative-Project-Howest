import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit{
  categoriesArray: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    const collectionRef = this.db.collection('test');
    const collectionInstance = collectionRef.valueChanges();
    collectionInstance.subscribe(ss => this.categoriesArray = ss);
    }
}
