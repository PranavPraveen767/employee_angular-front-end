import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'' , component:LoginComponent
  },
  {
    path:'dashboard' , component:DashboardComponent,canActivate:[authGuard]
  },
  {
    path:'employees' , component:UserlistComponent,canActivate:[authGuard]
  },
  {
    path:'employee/add' ,component:AddComponent
  },
  {
    path:'employee/edit/:id' ,component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
