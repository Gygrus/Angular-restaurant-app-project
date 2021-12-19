import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Dish } from 'src/Dish';
@Injectable({
  providedIn: 'root'
})
export class DatabaseDataService {
  dishesList!: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.dishesList = this.getDishList();
   }

  getDishList(){
    return this.db.list('dishesList').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        // @ts-ignore
        return new Dish(data.name, data.cuisine, data.type, data.category, data.ingredients, data.quantity, data.price, data.ordered, data.description, data.images, data.rating, data.reviews);
      })
    }));
  }
}
