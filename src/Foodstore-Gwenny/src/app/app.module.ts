import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material-module';
import { FormsModule } from  '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { TestingComponent } from './testing/testing.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SettingsAdminComponent } from './settings-admin/settings-admin.component';
import { DeleteCategoryComponent } from './dialogs/delete-category/delete-category.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    CategoriesListComponent,
    NavMenuComponent,
    HomeComponent,
    SettingsAdminComponent,
    DeleteCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
