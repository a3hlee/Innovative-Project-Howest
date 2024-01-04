import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  id: string = '';

  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>, private db: AngularFirestore) {}

  delete() {
    this.db.collection('categories').doc(this.id).delete()
    .then(res => {
      this.dialogRef.close();
    })
    .catch(e => {
      console.log(e);
    });
  }
}
