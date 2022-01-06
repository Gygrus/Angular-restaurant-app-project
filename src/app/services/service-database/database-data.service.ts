import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import {map, Observable} from 'rxjs';
import {Dish} from 'src/Dish';
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class DatabaseDataService {
  dishesList!: Observable<any>;
  usersList!: Observable<any>;


  constructor(public db: AngularFireDatabase) {
    this.dishesList = this.getDishList();
    this.usersList = this.getUserList();
  }

  getUserList() {
    return this.db.list('users').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const user: User = {
          // @ts-ignore
          uid: data.uid,
          // @ts-ignore
          email: data.email,
          // @ts-ignore
          displayName: data.displayName,
          // @ts-ignore
          dishesOrdered: data.dishesOrdered,
          // @ts-ignore
          orderHist: data.orderHist,
          // @ts-ignore
          isBanned: data.isBanned,
          // @ts-ignore
          roles: data.roles
        };
        return user
      })
    }));
  }

  getDishList() {
    return this.db.list('dishesList').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        // @ts-ignore
        return new Dish(key, data.name, data.cuisine, data.type, data.category, data.ingredients, data.quantity, data.ordered, data.price, data.description, data.images, data.ratingList, data.rating, []);
      })
    }));
  }

  addUserToDB(user: User) {
    this.db.database.ref('users').child(user.uid).set(user);
  }

  updateUserOrderHist(uid: string, orderHist: Partial<unknown>){
    // @ts-ignore
    this.db.list('users').update(uid, {orderHist: orderHist});
  }

  updateUserOrderedDishes(uid: string, orderedDishes: Partial<unknown>){
    // @ts-ignore
    this.db.list('users').update(uid, {dishesOrdered: orderedDishes});
  }

  updateUserRoles(uid: string, roles: any){
    this.db.list('users').update(uid, {roles: roles});
  }

  updateBanStatus(uid: string, ban: any){
    this.db.list('users').update(uid, {isBanned: ban});
  }

  removeDishFromDB(key: string){
    const dishList = this.db.list('dishesList');
    dishList.remove(key);
  }

  addDishToDB(dish: Dish){
    const dishList = this.db.list('dishesList');
    dishList.push(dish);
  }

  addRatingToDB(key: string, newRatingList: any){
    const dishList = this.db.list('dishesList');
    dishList.update(key, {ratingList: newRatingList});
  }

  changeRatingInDB(key: string, value: number){
    const dishList = this.db.list('dishesList');
    dishList.update(key, {rating: value});
  }

  changeDishQuantity(key: string, value: number){
    const dishList = this.db.list('dishesList');
    dishList.update(key, {quantity: value});
  }

  changeDishOrders(key: string, value: number){
    const dishList = this.db.list('dishesList');
    dishList.update(key, {ordered: value});
  }

  updateDishName(key: string, value: string){
    this.db.list('dishesList').update(key, {name: value})
  }

  updateDishCuisine(key: string, value: string){
    this.db.list('dishesList').update(key, {cuisine: value})
  }

  updateDishType(key: string, value: string){
    this.db.list('dishesList').update(key, {type: value})
  }

  updateDishCategory(key: string, value: string){
    this.db.list('dishesList').update(key, {category: value})
  }

  updateDishIngredients(key: string, value: string){
    this.db.list('dishesList').update(key, {ingredients: value})
  }

  updateDishQuantity(key: string, value: string){
    this.db.list('dishesList').update(key, {quantity: value})
  }

  updateDishPrice(key: string, value: string){
    this.db.list('dishesList').update(key, {price: value})
  }

  updateDishDescription(key: string, value: string){
    this.db.list('dishesList').update(key, {description: value})
  }

  updateDishImages(key: string, value: string){
    this.db.list('dishesList').update(key, {images: value})
  }
}
