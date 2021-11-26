import { Injectable } from '@angular/core';
import { ListOfDishesService } from '../serviceListOfDishes/list-of-dishes.service';
@Injectable({
  providedIn: 'root'
})
export class CurrencyAndShopListService {
  displayShopList = 0;
  numOfOrders = 0;
  shopList: {name: string, quantity: number}[] = [];
  currentCurrency = "euro";
  currencies: {[key: string]: {value: number; symbol: string}} = 
    {
    'euro': {value: 0.77, symbol: '€'},
    'usd': {value: 1.13, symbol: '$'},
    }
  constructor(public Dishes: ListOfDishesService) { }

  changeCurrency(curr: any){
    this.currentCurrency=curr;
  }

  getNumOfOrders() {
    let sum = 0;
    for (let itemPos of this.shopList){
      sum += itemPos.quantity;
    }
    this.numOfOrders = sum;
  }

  addPosToShopList(newName: string){
    if (this.shopList.filter(e => e.name === newName).length > 0){
      for (let itemPos of this.shopList){
        if (itemPos.name === newName){
          itemPos.quantity ++;
        }
      }
    } else {
      let newItem = {
        name: newName,
        quantity: 1
      };
      this.shopList.push(newItem);
    }
    this.getNumOfOrders();
  }

  removePosToShopList(newName: any){
    for (let itemPos of this.shopList){
      if (itemPos.name === newName){
        itemPos.quantity --;
        if (itemPos.quantity === 0){
          let a = this.shopList.find(x => x.name === newName);
          const index = this.shopList.indexOf(a || newName);
          if (index > -1) {
            this.shopList.splice(index, 1);
        }
        }
      }
    }
    this.getNumOfOrders();
  }

  searchAndDestroy(target: any){
    let a = this.shopList.find(x => x.name === target);
    const index = this.shopList.indexOf(a || target);
    if (index > -1) {
      this.shopList.splice(index, 1);
    }
    this.getNumOfOrders();
  }

  sumAll(){
    let result= 0;
    for (let item of this.shopList){
      result += item.quantity*(this.Dishes.dishList.find(x => x.name === item.name)!.price);
    }
    return (result*this.currencies[this.currentCurrency].value).toFixed(2);
  }

  rollShopList(){
    this.displayShopList += 1;
    this.displayShopList %= 2;
  }
}
