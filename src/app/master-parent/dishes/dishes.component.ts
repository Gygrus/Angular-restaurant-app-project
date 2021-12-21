import { Component, OnInit } from '@angular/core';
import { ListOfDishesService } from '../../serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../serviceCurrencyAndShopList/currency-and-shop-list.service';
import { FilterDataService } from 'src/app/service-filter/filter-data.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from 'src/app/service-pagination/pagination.service';
import {DatabaseDataService} from "../../service-database/database-data.service";
import {Dish} from "../../../Dish";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {


  public constructor(public route: ActivatedRoute,
                     public Dishes: ListOfDishesService,
                     public curAndShopList: CurrencyAndShopListService,
                     public filterData: FilterDataService,
                     public paginInfo: PaginationService,
                     private db: DatabaseDataService) { }

  ngOnInit(): void {}

  addOrder(dish: any){
    let a = this.Dishes.dishList.find(x => x.name === dish);
    a!.quantity--;
    a!.ordered++;
    this.curAndShopList.addPosToShopList(dish);
  }

  removeOrder(dish: string){
    let a = this.Dishes.dishList.find(x => x.name === dish);
    a!.quantity++;
    a!.ordered--;
    this.curAndShopList.removePosToShopList(dish);
  }

  removeDish(dish: Dish){
    this.db.removeDishFromDB(dish.key);
    this.curAndShopList.searchAndDestroy(dish.name);
    this.filterData.resetAll();
  }

  resetFilters(){
    this.filterData.resetAll();
  }

  setRanking(data: any[]){
    (this.Dishes.dishList.find(x => x.name === data[1]))!.rating = data[0];
  }

}
