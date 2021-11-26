import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { Dish } from '../../Dish'
import { FilterDishesPipe } from '../filter-pipe/filter-dishes.pipe';
import { DishesComponent } from '../master-parent/dishes/dishes.component';
import { ListOfDishesService } from '../serviceListOfDishes/list-of-dishes.service';
import { FilterDataService } from '../service-filter/filter-data.service';
import { CurrencyAndShopListService } from '../serviceCurrencyAndShopList/currency-and-shop-list.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number = 1;
  itemsAtOneTime: number = 6;
  constructor(public Dishes: ListOfDishesService, public CurrencyData: CurrencyAndShopListService, public FilterData: FilterDataService) { }
  pipe = new FilterDishesPipe;

  filteredDishes: Dish[] = this.Dishes.dishList;
  availableDishes = this.filteredDishes.length;

  setDishes(){
    this.filteredDishes = this.pipe.transform(this.Dishes.dishList, this.FilterData.searchName, this.FilterData.searchCategory, 
    this.FilterData.searchCuisine, this.FilterData.searchRating, this.FilterData.searchMinPrice, 
    this.FilterData.searchMaxPrice, this.CurrencyData.currencies[this.CurrencyData.currentCurrency].value)
    
    this.availableDishes = this.filteredDishes.length;
    console.log(this.filteredDishes, "h");
    console.log(this.Dishes.dishList)
    console.log(this.FilterData.searchMaxPrice, this.FilterData.searchMinPrice);
    if (this.getMaxPage() < this.currentPage){
      this.currentPage = this.getMaxPage();
    } else if (this.currentPage <= 0 && this.getMaxPage() > 0){
      this.currentPage = 1;
    }
    }

  sliderChange(value: any){
    console.log(value);
  }

  getMaxPage(){
    return Math.ceil(this.availableDishes/6);
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
}
