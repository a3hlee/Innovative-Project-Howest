import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { HomeComponent } from './home/home.component';
import { SettingsAdminComponent } from './settings-admin/settings-admin.component';
import { LoginComponent } from './login-register/login-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestingComponent },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'settings', component: SettingsAdminComponent },
  { path: 'login-register', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
