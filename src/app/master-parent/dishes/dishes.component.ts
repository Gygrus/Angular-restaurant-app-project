import { Component, OnInit } from '@angular/core';
import { ListOfDishesService } from '../../serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../serviceCurrencyAndShopList/currency-and-shop-list.service';
import { FilterDataService } from 'src/app/service-filter/filter-data.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from 'src/app/service-pagination/pagination.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  public constructor(public route: ActivatedRoute, public Dishes: ListOfDishesService, 
    public curAndShopList: CurrencyAndShopListService, public filterData: FilterDataService,
    public paginInfo: PaginationService) { }

  ngOnInit(): void {
  }

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

  removeDish(dish: any){
    let a = this.Dishes.dishList.find(x => x.name === dish);
    const index = this.Dishes.dishList.indexOf(a||dish);
    let b = [];
    if (index > -1) {
      this.Dishes.dishList.splice(index, 1);
      let newList = Object.assign([], this.Dishes.dishList);

      this.Dishes.dishList = newList;
      this.Dishes.maxDishes = this.Dishes.mostExpensive();
      this.Dishes.minDishes = this.Dishes.leastExpensive();
      this.curAndShopList.searchAndDestroy(dish);
      this.filterData.checkIfValid(a!);
      this.paginInfo.setDishes();
    }
  }

  setRanking(data: any[]){
    (this.Dishes.dishList.find(x => x.name === data[1]))!.rating = data[0];
  }

}
