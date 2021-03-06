import { Component, OnInit } from '@angular/core';
import { ListOfDishesService } from '../../services/serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../services/serviceCurrencyAndShopList/currency-and-shop-list.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  constructor(public Dishes: ListOfDishesService, public curAndShopList: CurrencyAndShopListService) { }
  ngOnInit(): void {
  }

}
