import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./master-parent/home/home.component";
import {DishesComponent} from "./master-parent/dishes/dishes.component";
import {DishDetailsComponent} from "./master-parent/dishes/dish-details/dish-details.component";
import {AddItemComponent} from "./master-parent/header/add-item/add-item.component";
import {ShopListComponent} from "./master-parent/shop-list/shop-list.component";
import {PageNotFoundComponent} from "./master-parent/page-not-found/page-not-found.component";
import { SignUpComponent} from "./master-parent/sign-up/sign-up.component";
import { SignInComponent} from "./master-parent/sign-in/sign-in.component";
import { AdminViewComponent } from "./master-parent/header/admin-view/admin-view.component";
import {AuthGuard} from "./guard/auth.guard";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: DishesComponent,
    children: [
      {path: "dish-item/:name", component: DishDetailsComponent, data: {roles: ['Client', 'Admin', 'Manager']}, canActivate: [AuthGuard]}
    ] },
  { path: 'new-dish', component: AddItemComponent },
  { path: 'shop-list', component: ShopListComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'admin-view', component: AdminViewComponent },
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
