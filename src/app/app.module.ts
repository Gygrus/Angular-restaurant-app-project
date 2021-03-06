import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";

import { AppComponent } from './app.component';
import { DishesComponent } from './master-parent/dishes/dishes.component';
import { HeaderComponent } from './master-parent/header/header.component';
import { DishComponent } from './master-parent/dishes/dish/dish.component';
import { MasterParentComponent } from './master-parent/master-parent.component';
import { AddItemComponent } from './master-parent/header/add-item/add-item.component';
import { ListOfDishesService } from './services/serviceListOfDishes/list-of-dishes.service'
import { CurrencyAndShopListService } from './services/serviceCurrencyAndShopList/currency-and-shop-list.service';
import { ShopListComponent } from './master-parent/shop-list/shop-list.component';
import { FilterDishesComponent } from './master-parent/dishes/filter-dishes/filter-dishes.component';
import { FormsModule } from '@angular/forms';
import { FilterDishesPipe } from './filter-pipe/filter-dishes.pipe';
import { HomeComponent } from './master-parent/home/home.component';
import { PageNotFoundComponent } from './master-parent/page-not-found/page-not-found.component';
import { DishDetailsComponent } from './master-parent/dishes/dish-details/dish-details.component';
import { PaginationBarComponent } from './master-parent/dishes/pagination-bar/pagination-bar.component';
import { DatabaseDataService } from './services/service-database/database-data.service';
import {PaginationService} from "./services/service-pagination/pagination.service";
import {FilterDataService} from "./services/service-filter/filter-data.service";
import { SignInComponent } from './master-parent/sign-in/sign-in.component';
import { SignUpComponent } from './master-parent/sign-up/sign-up.component';
import { AdminViewComponent } from './master-parent/header/admin-view/admin-view.component';
import {AuthService} from "./services/serviceauth/auth.service";
import {AuthGuard} from "./guard/auth.guard";
import { OrderHistComponent } from './master-parent/order-hist/order-hist.component';
import { DishesManagerComponent } from './master-parent/header/dishes-manager/dishes-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    HeaderComponent,
    DishComponent,
    MasterParentComponent,
    AddItemComponent,
    ShopListComponent,
    FilterDishesComponent,
    FilterDishesPipe,
    HomeComponent,
    PageNotFoundComponent,
    DishDetailsComponent,
    PaginationBarComponent,
    SignInComponent,
    SignUpComponent,
    AdminViewComponent,
    OrderHistComponent,
    DishesManagerComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFireAuthModule
  ],
  providers: [ListOfDishesService, CurrencyAndShopListService, DatabaseDataService, PaginationService, FilterDataService,
    AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
