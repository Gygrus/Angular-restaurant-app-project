import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ListOfDishesService } from '../../../services/serviceListOfDishes/list-of-dishes.service';
import { Dish } from '../../../../Dish'

import { PaginationService } from 'src/app/services/service-pagination/pagination.service';
import { FilterDataService } from 'src/app/services/service-filter/filter-data.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {DatabaseDataService} from "../../../services/service-database/database-data.service";
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  itemDetails = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.duplicateNameValidator.bind(this)]],
    cuisine: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    type: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    category: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    ingredients: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    quantity: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
    images: this.fb.array([
      this.fb.control('', Validators.required)])
  })

  duplicateNameValidator(control: FormControl){
    let name = control.value;
    if (name && this.Dishes.dishList.map(item => item.name).includes(name)){
      return {
        duplicateName: {
          name: name
        }
      }
    }
    return null
  }

  get ingredients() {
    return this.itemDetails.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''))
  }

  get images() {
    return this.itemDetails.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.fb.control(''));
  }

  resetMultipleInputs(){
    while (this.ingredients.length > 1){
      this.ingredients.removeAt(this.ingredients.length-1);
    }
    while (this.images.length > 1){
      this.images.removeAt(this.images.length-1);
    }
  }

  onSubmit() {
    this.addItem(this.itemDetails.value);
    this.itemDetails.reset();
    this.resetMultipleInputs();
    this.filterData.resetAll();
    this.paginInfo.setDishes();
  }

  addItem(item: any){
    let ingredientsCorrected = item.ingredients.filter((e: any) => String(e).trim());
    let imagesCorrected = item.images.filter((e: any) => String(e).trim());;

    const newItem: Dish = {
      key: "",
      name: item.name,
      cuisine: item.cuisine,
      type: item.type,
      category: item.category,
      ingredients: ingredientsCorrected,
      quantity: item.quantity,
      ordered: 0,
      price: item.price,
      description: item.description,
      images: imagesCorrected,
      ratingList: [],
      rating: 0,
      reviews: []
    };
    this.db.addDishToDB(newItem);
    this.Dishes.maxDishes = this.Dishes.mostExpensive();
    this.Dishes.minDishes = this.Dishes.leastExpensive();
  }

  constructor(private fb: FormBuilder,
              public Dishes: ListOfDishesService,
              public filterData: FilterDataService,
              public paginInfo: PaginationService,
              public db: DatabaseDataService) { }

  ngOnInit(): void {
  }

}
