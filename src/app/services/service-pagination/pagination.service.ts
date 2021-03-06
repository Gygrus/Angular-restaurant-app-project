import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { Dish } from '../../../Dish'
import { FilterDishesPipe } from '../../filter-pipe/filter-dishes.pipe';
import { DishesComponent } from '../../master-parent/dishes/dishes.component';
import { ListOfDishesService } from '../serviceListOfDishes/list-of-dishes.service';
import { FilterDataService } from '../service-filter/filter-data.service';
import { CurrencyAndShopListService } from '../serviceCurrencyAndShopList/currency-and-shop-list.service';
import {DatabaseDataService} from "../service-database/database-data.service";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number = 1;
  itemsAtOneTime: number = 6;
  constructor(public Dishes: ListOfDishesService,
              public CurrencyData: CurrencyAndShopListService,
              public FilterData: FilterDataService,
              public db: DatabaseDataService) {
    this.db.dishesList.subscribe( () => {
      this.setDishes();
    }
    )
  }
  pipe = new FilterDishesPipe;

  filteredDishes: Dish[] = this.Dishes.dishList;
  availableDishes = this.filteredDishes.length;

  setDishes(){
    this.db.dishesList.subscribe(e => {
      this.filteredDishes = this.pipe.transform(e, this.FilterData.searchName, this.FilterData.searchCategory,
        this.FilterData.searchCuisine, this.FilterData.searchRating, this.FilterData.searchMinPrice,
        this.FilterData.searchMaxPrice, this.CurrencyData.currencies[this.CurrencyData.currentCurrency].value)

      this.availableDishes = this.filteredDishes.length;
      if (this.getMaxPage() < this.currentPage){
        this.currentPage = this.getMaxPage();
      } else if (this.currentPage <= 0 && this.getMaxPage() > 0){
        this.currentPage = 1;
      }
    })
    }

  getMaxPage(){
    return Math.ceil(this.availableDishes/this.itemsAtOneTime);
  }

  pageNext(){
    this.currentPage = Math.min(this.currentPage + 1, this.getMaxPage());
  }

  pagePrev(){
    this.currentPage = Math.max(this.currentPage - 1, 1);
  }

  pageFirst(){
    this.currentPage = 1;
  }

  pageLast(){
    this.currentPage = this.getMaxPage();
  }

  setItemsNumber(value: number){
    this.itemsAtOneTime = value;
    this.currentPage = 1;
    this.setDishes();
  }
}
