import { Routes } from '@angular/router';
import { AdditemComponent } from './pages/additem/additem.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:'addtodo',
    component: AdditemComponent
  }
];
