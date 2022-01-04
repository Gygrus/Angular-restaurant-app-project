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
    // this.db.database.ref('users').child(uid)
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
}
