import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../Dish'
import { ListOfDishesService } from '../../services/serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../services/serviceCurrencyAndShopList/currency-and-shop-list.service';
import { FilterDataService } from 'src/app/services/service-filter/filter-data.service';
import {AuthService} from "../../services/serviceauth/auth.service";
import firebase from "firebase/compat/app";
import auth = firebase.auth;
import {DatabaseDataService} from "../../services/service-database/database-data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filterMenuStatus: number = 0;

  public constructor(public Dishes: ListOfDishesService,
                     public curAndShopList: CurrencyAndShopListService,
                     public filterData: FilterDataService,
                     public authService: AuthService,
                     public db: DatabaseDataService) {
  }



  ngOnInit(): void {
  }

  setCurrency(curr: any){
    console.log(this.authService.userList, this.authService.userDetails, this.authService.checkIfBanned(this.authService.userDetails), this.authService.afAuth.currentUser);
    this.curAndShopList.changeCurrency(curr);
    this.filterData.searchMaxPrice = Math.ceil(Number((this.filterData.getMaxPrice()*this.curAndShopList.currencies[curr].value).toFixed(2)));
    this.filterData.searchMinPrice = Math.floor(Number((this.filterData.getMinPrice()*this.curAndShopList.currencies[curr].value).toFixed(2)));
  }


}
