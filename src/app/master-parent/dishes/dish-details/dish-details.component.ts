import { Component, OnInit } from '@angular/core';
import { ListOfDishesService } from '../../../serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../../serviceCurrencyAndShopList/currency-and-shop-list.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  displaySlider = 0;
  currentImage = 0;
  stars = [0, 1, 2, 3, 4];
  currencies = this.CurrencyDetails.currencies;
  name?:any;
  dishDetails?:any;
  reviewDetails = this.fb.group({
    nick: ['', [Validators.required]],
    name: ['', [Validators.required]],
    body: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
    date: ['']
  })
  constructor(private fb: FormBuilder, private route: ActivatedRoute, public Dishes: ListOfDishesService, public CurrencyDetails: CurrencyAndShopListService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name');
      this.dishDetails = this.Dishes.dishList.filter(item => item.name==String(this.name))[0];
    })
  }

  onSubmit() {
    this.addReview(this.reviewDetails.value);
    this.reviewDetails.reset();
  }

  addReview(reviewData: { nick: any; name: any; body: any; date: any; }){
    this.dishDetails.reviews.push({nick: reviewData.nick, name: reviewData.name, body: reviewData.body, date: reviewData.date});
  }


  addOrder(){
    if (this.dishDetails.quantity > 0){
      this.dishDetails.ordered ++;
      this.dishDetails.quantity --;
    }
    this.CurrencyDetails.addPosToShopList(this.name);
  }

  removeOrder() {
    if (this.dishDetails.ordered > 0){
      this.dishDetails.ordered --;
      this.dishDetails.quantity ++;
    }
    this.CurrencyDetails.removePosToShopList(this.name);
  }


  addRating(star: any) {
    this.dishDetails.rating = star+1;
  }

  nextImage(e: { stopPropagation: () => void; }){
    this.currentImage += 1;
    this.currentImage %= this.dishDetails.images.length;
    e.stopPropagation();
  }

  prevImage(e: { stopPropagation: () => void; }){
    this.currentImage -= 1;
    this.currentImage += this.dishDetails.images.length;
    this.currentImage %= this.dishDetails.images.length;
    e.stopPropagation();
  }

}
