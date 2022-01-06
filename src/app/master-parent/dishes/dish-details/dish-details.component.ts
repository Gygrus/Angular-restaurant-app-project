import { Component, OnInit } from '@angular/core';
import { ListOfDishesService } from '../../../services/serviceListOfDishes/list-of-dishes.service';
import { CurrencyAndShopListService } from '../../../services/serviceCurrencyAndShopList/currency-and-shop-list.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {DatabaseDataService} from "../../../services/service-database/database-data.service";
import {AuthService} from "../../../services/serviceauth/auth.service";

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
  message = '';
  reviewDetails = this.fb.group({
    nick: ['', [Validators.required]],
    name: ['', [Validators.required]],
    body: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
    date: ['']
  })
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public Dishes: ListOfDishesService,
              public CurrencyDetails: CurrencyAndShopListService,
              private db: DatabaseDataService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.db.dishesList.subscribe(() => {
      this.route.paramMap.subscribe(params => {
        this.name = params.get('name');
        this.dishDetails = this.Dishes.dishList.filter(item => item.name==String(this.name))[0];
      })})
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

  getRatingValue(){
    if (this.dishDetails.ratingList.length === 0){
      return 0;
    }
    let sum = 0;
    for (let item of this.dishDetails.ratingList){
      sum += item.rating;
    }
    return (sum/this.dishDetails.ratingList.length);
  }

  correctRatingDisplay() {
    if (this.dishDetails.rating === 0){
      return "Brak ocen";
    } else {
      return this.dishDetails.rating.toFixed(2)+"/5";
    }
  }

  addRating(star: any) {
    if (this.authService.userDetails &&
      (this.authService.checkIfHasRole(this.authService.userDetails.uid, ["Admin"]) ||
      (this.authService.checkIfHasRole(this.authService.userDetails.uid, ["Client"]) &&
      this.authService.checkIfUserBought(this.dishDetails.name))) &&
      !this.authService.checkIfBanned(this.authService.userDetails)) {
      const userID = this.authService.userDetails!.uid;
      let ratingList;
      ratingList = this.dishDetails.ratingList;
      if (!ratingList) {
        ratingList = [{uid: userID, rating: star + 1}];
      } else {
        let searchedItem = ratingList.find((item: { uid: string, rating: number }) => item.uid === userID);
        if (searchedItem === undefined) {
          ratingList.push({uid: userID, rating: star + 1});
        } else {
          let index = ratingList.indexOf(searchedItem);
          ratingList[index] = {uid: userID, rating: star + 1};
        }
      }
      this.message = "Dodano ocenę!"
      this.dishDetails.ratingList = ratingList;
      this.db.addRatingToDB(this.dishDetails.key, ratingList);
      this.db.changeRatingInDB(this.dishDetails.key, this.getRatingValue());
    } else {
      this.message = "Nie możesz dodać oceny!"
    }
  }

  getUserRating(){
    const userID = this.authService.userDetails!.uid;
    let ratingList;
    ratingList = this.dishDetails.ratingList;
    if (!ratingList) {
      return 0;
    } else {
      let searchedItem = ratingList.find((item: { uid: string, rating: number }) => item.uid === userID);
      if (searchedItem === undefined) {
        return 0;
      } else {
        return searchedItem.rating;
      }
    }

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
