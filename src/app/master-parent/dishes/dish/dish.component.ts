import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyAndShopListService } from '../../../services/serviceCurrencyAndShopList/currency-and-shop-list.service';
import {AuthService} from "../../../services/serviceauth/auth.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  displaySlider = 0;
  currentImage = 0;
  stars = [0, 1, 2, 3, 4];
  currencies = this.curAndShopList.currencies;
  @Input() key!: string;
  @Input() sold!: number;
  @Input() currency!: string;
  @Input() name!: string;
  @Input() cuisine!: string;
  @Input() type!: string;
  @Input() category!: string;
  @Input() ingredients!: string[];
  @Input() quantity!: number;
  @Input() price!: number;
  @Input() description!: string;
  @Input() images!: string[];
  @Input() maxDishes!: string[];
  @Input() minDishes!: string[];
  @Input() ratingList!: {uid: string, rating: number}[];
  @Input() rating!: number;
  @Output() addOrderEvent = new EventEmitter<any>();
  @Output() removeOrderEvent = new EventEmitter<any>();
  @Output() removeDishEvent = new EventEmitter<any>();
  @Output() addRatingEvent = new EventEmitter<[number, string]>();
  constructor(public curAndShopList: CurrencyAndShopListService,
              public authService: AuthService) { }
  // public path$: BehaviorSubject<string> = new BehaviorSubject (this.images[0]);

  ngOnInit(): void {
  }

  getRatingValue(){
    if (this.ratingList.length === 0){
      return 0;
    }
    let sum = 0;
    for (let item of this.ratingList){
      sum += item.rating;
    }
    return (sum/this.ratingList.length);
  }

  correctRatingDisplay() {
    if (this.rating === 0){
      return "Brak ocen";
    } else {
      return this.rating.toFixed(2)+"/5";
    }
  }


  addOrder(){
    if (this.quantity > 0){
      this.sold ++;
      this.addOrderEvent.emit(this.name);
    }
  }

  removeOrder() {
    if (this.sold > 0){
      this.sold --;
      this.removeOrderEvent.emit(this.name);
    }
  }

  removeDish() {
    this.removeDishEvent.emit(this);
  }


  showSlider(){
    this.displaySlider++;
    this.displaySlider %= 2;
  }

  nextImage(e: { stopPropagation: () => void; }){
    this.currentImage += 1;
    this.currentImage %= this.images.length;
    e.stopPropagation();
  }

  prevImage(e: { stopPropagation: () => void; }){
    this.currentImage -= 1;
    this.currentImage += this.images.length;
    this.currentImage %= this.images.length;
    e.stopPropagation();
  }
}
