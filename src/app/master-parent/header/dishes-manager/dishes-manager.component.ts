import { Component, OnInit } from '@angular/core';
import {DatabaseDataService} from "../../../services/service-database/database-data.service";
import {ListOfDishesService} from "../../../services/serviceListOfDishes/list-of-dishes.service";
import {CurrencyAndShopListService} from "../../../services/serviceCurrencyAndShopList/currency-and-shop-list.service";
import {Dish} from "../../../../Dish";
import {PaginationService} from "../../../services/service-pagination/pagination.service";

@Component({
  selector: 'app-dishes-manager',
  templateUrl: './dishes-manager.component.html',
  styleUrls: ['./dishes-manager.component.css']
})
export class DishesManagerComponent implements OnInit {

  constructor(
    public db: DatabaseDataService,
    public Dishes: ListOfDishesService,
    public curAndShopService: CurrencyAndShopListService
  ) { }

  ngOnInit(): void {
  }

  removeDish(dish: Dish){
    this.db.removeDishFromDB(dish.key);
    this.curAndShopService.searchAndDestroy(dish.name);
  }

}
