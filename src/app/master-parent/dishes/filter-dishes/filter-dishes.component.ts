import { Component, OnInit } from '@angular/core';
import { ListOfDishesService } from '../../../serviceListOfDishes/list-of-dishes.service';
import { FilterDataService } from '../../../service-filter/filter-data.service';
import { CurrencyAndShopListService } from '../../../serviceCurrencyAndShopList/currency-and-shop-list.service';
import { PaginationBarComponent } from '../pagination-bar/pagination-bar.component';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/service-pagination/pagination.service';



interface SliderDetails {
  value: number;
  highValue: number;
  floor: number;
  ceil: number;
}

@Component({
  selector: 'app-filter-dishes',
  templateUrl: './filter-dishes.component.html',
  styleUrls: ['./filter-dishes.component.css']
})
export class FilterDishesComponent implements OnInit {
  searchName?: string;
  searchCategory: string[] = [];
  searchCuisine: string[] = [];
  searchRating: number[] = [];
  constructor(public _router: Router, public Dishes: ListOfDishesService, public filterData: FilterDataService, 
    public currencyData: CurrencyAndShopListService, public paginInfo: PaginationService) { }
  value: number = Math.floor(Number((this.filterData.getMinPrice()*this.currencyData.currencies["euro"].value).toFixed(2)));
  highValue: number = Math.floor(Number((this.filterData.getMaxPrice()*this.currencyData.currencies["euro"].value).toFixed(2)));
  options: Options = {
    floor: 0,
    ceil: 50,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> '+ this.currencyData.currencies[this.currencyData.currentCurrency].symbol + value;
        case LabelType.High:
          return '<b>Max price:</b> '+ this.currencyData.currencies[this.currencyData.currentCurrency].symbol + value;
        default:
          return this.currencyData.currencies[this.currencyData.currentCurrency].symbol + value;
      }
    }
  }

  

  createOpts(arg: string) {
    let opts: Options = {
      floor: Number((this.filterData.getMinPrice()*this.currencyData.currencies[arg].value).toFixed(2)),
      ceil: Number((this.filterData.getMaxPrice()*this.currencyData.currencies[arg].value).toFixed(2)),
    }
    return opts;
  }


  sliderOptions(slider: SliderDetails): Options {
    return {
      floor: slider.floor,
      ceil: slider.ceil
    };
  }


  ngOnInit(): void {
  }

}
