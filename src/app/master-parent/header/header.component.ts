import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../Dish'
import { ListOfDishesService } from '../../services/serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../services/serviceCurrencyAndShopList/currency-and-shop-list.service';
import { FilterDataService } from 'src/app/services/service-filter/filter-data.service';
import {AuthService} from "../../services/serviceauth/auth.service";
import firebase from "firebase/compat/app";
import { User } from "../../services/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dishMenuStatus: number = 0;
  filterMenuStatus: number = 0;
  user!: User;

  public constructor(public Dishes: ListOfDishesService,
                     public curAndShopList: CurrencyAndShopListService,
                     public filterData: FilterDataService,
                     public authService: AuthService) {
    this.authService.userData.subscribe((user) =>{
      this.user = user;
    });
  }


  ngOnInit(): void {
  }

  setCurrency(curr: any){
    this.curAndShopList.changeCurrency(curr);
    this.filterData.searchMaxPrice = Math.ceil(Number((this.filterData.getMaxPrice()*this.curAndShopList.currencies[curr].value).toFixed(2)));
    this.filterData.searchMinPrice = Math.floor(Number((this.filterData.getMinPrice()*this.curAndShopList.currencies[curr].value).toFixed(2)));
  }

  // rollDishMenu(){
  //   this.dishMenuStatus += 1;
  //   this.dishMenuStatus %= 2;
  // }

  // rollFilterMenu(){
  //   this.filterMenuStatus += 1;
  //   this.filterMenuStatus %= 2;
  // }


}
