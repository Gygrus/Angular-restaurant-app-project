import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../../Dish'

@Pipe({
  name: 'filterDishesPipe'
})
export class FilterDishesPipe implements PipeTransform {

  transform(dishes: Dish[], searchName: string, searchType: string[], searchCuisine: string[], searchRating: number[], searchMinPrice: number, searchMaxPrice: number, currency: number): Dish[] {
    let output = dishes;
    if (dishes && searchName){
      searchName = searchName.toLowerCase();
      output = output.filter(dish=> {
        return dish.name.toLowerCase().includes(searchName);
    })
  }
    if (output && searchType.length > 0){
      let current = [];
      for (let type of searchType){
        type = type.toLowerCase();
        current.push(...output.filter(dish => {
          return dish.category.toLowerCase().includes(type);
        }))
      }
      output = current;
    }
    if (output && searchCuisine.length > 0){
      let current = [];
      for (let cuisine of searchCuisine){
        cuisine = cuisine.toLowerCase();
        current.push(...output.filter(dish => {
          return dish.cuisine.toLowerCase().includes(cuisine);
        }))
      }
      output = current;
    }
    if (output && searchRating.length > 0){
      let current = [];
      for (let rating of searchRating){
        current.push(...output.filter(dish => {
          return dish.rating === rating;
        }))
      }
      output = current;
    }
    if (output && searchMinPrice >= 0 && searchMaxPrice >= 0){
      output = output.filter(dish => {
        return (Number((dish.price*currency).toFixed(2)) <= searchMaxPrice && Number((dish.price*currency).toFixed(2)) >= searchMinPrice);
      })
    }
    return output;

  }
}
