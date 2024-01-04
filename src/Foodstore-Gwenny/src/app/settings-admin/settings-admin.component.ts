import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from "@angular/forms";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.css']
})
export class SettingsAdminComponent implements OnInit {
  categories: any[] = [];

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  findForm = new FormGroup({ getValue: new FormControl('') })
  single: any;
  message!: string;

  id: string = '';
  edit: boolean = false;
  editMessage: string = '';
  editForm = new FormGroup({ editValue: new FormControl('') })

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  const collectionRef = this.db.collection('categories');
  const collectionInstance = collectionRef.valueChanges();
  collectionInstance.subscribe(ss => this.categories = ss);
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.db.collection('categories').add({
        Name: this.addForm.value.name
      })
      .then(res => {
        this.addForm.reset();
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      alert('Please fill in the form!');
    }
  }

  getErrorMessage() {
    if (this.addForm.controls.name.hasError('required')) {
      return 'Name is required!';
    }
    return '';
  }

  onQuery() {
    const docRef = this.db.collection('categories', ref => ref.where("Name", "==", this.findForm.value.getValue));
    if (!this.findForm.value.getValue) {
      this.message = 'Cannot be empty';
      this.single = null;
    } else {
      docRef.get().subscribe(ss =>  {
          if (ss.docs.length === 0) {
            this.message = 'Document not found! Try again!';
            this.single = null;
          } else {
            ss.docs.forEach(doc => {
              this.message = '';
              this.single = doc.data();
            })
          }
          console.log(ss);
        })
        docRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.id = a.payload.doc.id;
          });
        }
      );
    }
  }

  openEdit() { 
    this.edit = !this.edit
  };

  onEdit() {
    if (!this.editForm.value.editValue) {
        this.editMessage = "Cannot Be Empty!";
    } else {
        this.db.collection('categories').doc(this.id).update({ Name: this.editForm.value.editValue });
        this.edit = false;
        this.editMessage = '';
        this.findForm.reset();
        this.editForm.reset();
        this.single = null;
    }
  }

  openDelete() {
    if (confirm('Delete?')) {
        this.db.collection('categories').doc(this.id).delete();
        this.message = '';
        this.findForm.reset();
      
        this.edit = false;
        this.single = null;
    }
  }

  // openDelete() {
  //   this.dialog.open(DeleteCategoryComponent, {
  //     width: '250px',
  //   });

  //     this.message = '';
  //     this.findForm.reset();
    
  //     this.edit = false;
  //     this.single = null;
  // }
}
