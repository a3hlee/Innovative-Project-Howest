import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from "@angular/forms";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  categoriesArray: any[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('')
  });

  secondForm = new FormGroup({ valueToGet: new FormControl('') })
  single: any;
  message!: string;

  id: string = '';
  edit: boolean = false;
  message2: string = '';
  editForm = new FormGroup({ replaceValue: new FormControl('') })

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  const collectionRef = this.db.collection('test');
  const collectionInstance = collectionRef.valueChanges();
  collectionInstance.subscribe(ss => this.categoriesArray = ss);
  }

  onSubmit() {
    if (this.form.valid) {
      this.db.collection('test').add({
        Name: this.form.value.name,
        Age: this.form.value.age
      })
      .then(res => {
        this.form.reset();
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      alert('Please fill in the form!');
    }
  }

  onQuery() {
    const docRef = this.db.collection('test', ref => ref.where("Name", "==", this.secondForm.value.valueToGet));
    if (!this.secondForm.value.valueToGet) {
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

  onRename() {
    if (!this.editForm.value.replaceValue) {
        this.message2 = "Cannot Be Empty!";
    } else {
        this.db.collection('test').doc(this.id).update({ Name: this.editForm.value.replaceValue });
        this.edit = false;
        this.message2 = '';
        this.secondForm.reset();
        this.editForm.reset();
        this.single = null;
    }
  }

  delete() {
    if (confirm('Delete?')) {
        this.db.collection('test').doc(this.id).delete();
        this.message = '';
        this.secondForm.reset();
      
        this.edit = false;
        this.single = null;
    }
  }
}
