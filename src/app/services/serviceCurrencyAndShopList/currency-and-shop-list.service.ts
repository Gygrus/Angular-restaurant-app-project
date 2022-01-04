import { Injectable } from '@angular/core';
import { ListOfDishesService } from '../serviceListOfDishes/list-of-dishes.service';
import {DatabaseDataService} from "../service-database/database-data.service";
import {AuthService} from "../serviceauth/auth.service";
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
  constructor(
    public Dishes: ListOfDishesService,
    public db: DatabaseDataService,
    public authService: AuthService
  ) { }

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

  updateUserDishesData(){
    if (this.shopList.length === 0){
      return;
    }
    const uid = this.authService.userDetails!.uid;
    // @ts-ignore
    let currentOrderedDishes = this.authService.userList.find(item => item.uid === this.authService.userDetails!.uid).dishesOrdered;
    // @ts-ignore
    let currentOrderHist = this.authService.userList.find(item => item.uid === this.authService.userDetails!.uid).orderHist;
    let resultOrderedDishes;

    if (currentOrderedDishes){
      resultOrderedDishes = this.mergeAllDishes(currentOrderedDishes, this.getOrderedDishes());
    } else {
      resultOrderedDishes = this.getOrderedDishes();
    }

    let resultOrderHist;
    if (currentOrderHist){
      currentOrderHist.push(this.getDataToOrderHist());
      resultOrderHist = currentOrderHist;
    } else {
      resultOrderHist = [this.getDataToOrderHist()];
    }
    this.db.updateUserOrderedDishes(uid, resultOrderedDishes);
    this.db.updateUserOrderHist(uid, resultOrderHist);
    this.deleteAllPositions();
  }

  deleteAllPositions(){
    this.updateDishesProperties();
    this.shopList = [];
    this.getNumOfOrders();
  }

  getOrderedDishes(){
    let result = [];
    for (let listItem of this.shopList){
      result.push(listItem.name);
    }
    return result;
  }

  mergeAllDishes(inHistDishes: any, newDishes: any){
    return inHistDishes.concat(newDishes.filter((item: any) => inHistDishes.indexOf(item) < 0));
  }

  getDataToOrderHist(){
    return {dishes: this.shopList, value: this.sumAll()+this.currencies[this.currentCurrency].symbol};
  }

  updateDishesProperties(){
    for (let data of this.shopList){
      const dish = this.Dishes.dishList.find(item => item.name === data.name);
      this.db.changeDishQuantity(dish.key, dish.quantity);
      this.db.changeDishOrders(dish.key, 0);
    }
  }

}


