import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  tests$: Observable<any[]> | undefined;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.tests$ = this.db.collection('Category').valueChanges();
  }
}
