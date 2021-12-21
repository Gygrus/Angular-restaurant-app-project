import { Injectable } from '@angular/core';
import { ListOfDishesService } from '../serviceListOfDishes/list-of-dishes.service';
import { Dish } from 'src/Dish';
import { CurrencyAndShopListService } from '../serviceCurrencyAndShopList/currency-and-shop-list.service';
import {DatabaseDataService} from "../service-database/database-data.service";


@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
  searchName: string = '';
  searchCategory: string[] = [];
  searchCuisine: string[] = [];
  MaxPrice: number = 0;
  MinPrice: number = 0;
  searchMaxPrice: number = 50;
  searchMinPrice: number = 0;
  searchRating: number[] = [];
  constructor( public Dishes: ListOfDishesService, public currencyData: CurrencyAndShopListService, public db: DatabaseDataService) {
    this.db.dishesList.subscribe(e => {
      this.MaxPrice = this.getMaxPrice();
      this.MinPrice = this.getMinPrice();
      this.searchMaxPrice = Number((this.MaxPrice*this.currencyData.currencies["euro"].value).toFixed(2));
      this.searchMinPrice = Number((this.MinPrice*this.currencyData.currencies["euro"].value).toFixed(2));
      this.resetAll();
    })
  }


  getMaxPrice(){
    let result = 0;
    for (let dish of this.Dishes.dishList){
        result = Math.max(result, dish.price);
    }
    return result;
  }

  getMinPrice(){
    let result = Number.MAX_SAFE_INTEGER;
    for (let dish of this.Dishes.dishList){
        result = Math.min(result, dish.price);
    }
    return result;
  }

  changeCuisine(cuisine: any[]){
    this.searchCuisine = cuisine;
  }

  changeCategory(category: any){
    this.searchCategory = category;
  }

  changeRating(rating: any){
    this.searchRating = rating;
  }

  getAllCategories() {
    let outputSet = new Set();
    for (let dish of this.Dishes.dishList){
      outputSet.add(dish.category);
    }
    return Array.from(outputSet).sort();
  }

  getAllCuisines(){
    let outputSet = new Set();
    for (let dish of this.Dishes.dishList){
      outputSet.add(dish.cuisine);
    }
    return Array.from(outputSet).sort();
  }


  getAllRatings(){
    let outputSet = new Set();
    for (let dish of this.Dishes.dishList){
      outputSet.add(dish.rating);
    }
    return Array.from(outputSet).sort();
  }

  addCuisine(cuisine: any){
    if (!this.searchCuisine.includes(cuisine)){
      this.searchCuisine.push(cuisine);
    } else {
      this.searchCuisine.splice(this.searchCuisine.indexOf(cuisine), 1);
    }
    let newList = Object.assign([], this.searchCuisine);
    this.changeCuisine(newList);
  }

  addCategory(category: any){
    if (!this.searchCategory.includes(category)){
      this.searchCategory.push(category);
    } else {
      this.searchCategory.splice(this.searchCategory.indexOf(category), 1);
    }
    let newList = Object.assign([], this.searchCategory);
    this.changeCategory(newList);
  }

  addRating(rating: any){
    if (!this.searchRating.includes(rating)){
      this.searchRating.push(rating);
    } else {
      this.searchRating.splice(this.searchRating.indexOf(rating), 1);
    }
    let newList = Object.assign([], this.searchRating);
    this.changeRating(newList);
  }

  checkIfValid(dish: Dish){
    if (this.searchCuisine.includes(dish.cuisine) && !this.getAllCuisines().includes(dish.cuisine)){
      this.addCuisine(dish.cuisine);
    };
    if (this.searchCategory.includes(dish.category) && !this.getAllCategories().includes(dish.category)){
      this.addCategory(dish.category);
    };
    if (this.searchRating.includes(dish.rating) && !this.getAllRatings().includes(dish.rating)){
      this.addRating(dish.rating);
    };
}

    resetAll(){
      this.searchCategory = [];
      this.searchCuisine = [];
      this.searchRating = [];
      this.searchMinPrice = Math.floor(Number((this.getMinPrice()*this.currencyData.currencies[this.currencyData.currentCurrency].value).toFixed(2)));
      this.searchMaxPrice = Math.ceil(Number((this.getMaxPrice()*this.currencyData.currencies[this.currencyData.currentCurrency].value).toFixed(2)));
      console.log("Max = ", this.searchMaxPrice, " min = ", this.searchMinPrice);
      this.searchName = '';
    }


}
