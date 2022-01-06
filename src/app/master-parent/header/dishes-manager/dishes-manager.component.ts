import { Component, OnInit } from '@angular/core';
import {DatabaseDataService} from "../../../services/service-database/database-data.service";
import {ListOfDishesService} from "../../../services/serviceListOfDishes/list-of-dishes.service";
import {CurrencyAndShopListService} from "../../../services/serviceCurrencyAndShopList/currency-and-shop-list.service";
import {Dish} from "../../../../Dish";
import {PaginationService} from "../../../services/service-pagination/pagination.service";
import {FormBuilder, FormArray, FormControl, Validators} from "@angular/forms";
import {FilterDataService} from "../../../services/service-filter/filter-data.service";

@Component({
  selector: 'app-dishes-manager',
  templateUrl: './dishes-manager.component.html',
  styleUrls: ['./dishes-manager.component.css']
})
export class DishesManagerComponent implements OnInit {
  selectedDish?: Dish;
  modifiedDish?: Dish;

  itemModifyDetails = this.fb.group({
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
    let correctedNames = this.Dishes.dishList.map(item => item.name);
    let resultNames;
    if (this.modifiedDish && this.modifiedDish.name != undefined){
      resultNames = correctedNames.filter(item => { // @ts-ignore
        return item != this.modifiedDish.name})
    } else {
      resultNames = correctedNames;
    }
    if (name && resultNames.includes(name)){
      return {
        duplicateName: {
          name: name
        }
      }
    }
    return null
  }

  constructor(
    private fb: FormBuilder,
    public db: DatabaseDataService,
    public Dishes: ListOfDishesService,
    public curAndShopService: CurrencyAndShopListService,
    public filterData: FilterDataService,
    public paginInfo: PaginationService
  ) { }

  ngOnInit(): void {
  }

  removeDish(dish: Dish){
    this.db.removeDishFromDB(dish.key);
    this.curAndShopService.searchAndDestroy(dish.name);
    this.filterData.resetAll();
  }

  setDish(dish: Dish){
    if (this.selectedDish === dish){
      this.selectedDish = undefined;
    } else {
      this.selectedDish = dish;
    }
  }

  setModifiedDish(dish: Dish, event: { stopPropagation: () => void; }){
    if (this.modifiedDish && this.modifiedDish.key === dish.key){
      this.modifiedDish = undefined;
    } else {
      this.modifiedDish = dish;
      this.itemModifyDetails = this.fb.group({
        name: [dish.name, [Validators.required, this.duplicateNameValidator.bind(this)]],
        cuisine: [dish.cuisine, [Validators.required]],
        type: [dish.type, [Validators.required]],
        category: [dish.category, [Validators.required]],
        ingredients: this.fb.array([
          this.fb.control(dish.ingredients[0], Validators.required)
        ]),
        quantity: [dish.quantity, [Validators.required, Validators.min(0)]],
        price: [dish.price, [Validators.required, Validators.min(0)]],
        description: [dish.description, Validators.required],
        images: this.fb.array([
          this.fb.control(dish.images[0], Validators.required)])
      })
      this.correctIngAndImg(dish);


    }
    event.stopPropagation();
  }

  get ingredients() {
    return this.itemModifyDetails.get('ingredients') as FormArray;
  }

  get images() {
    return this.itemModifyDetails.get('images') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''))
  }

  removeIngredient() {
    if (this.ingredients.length > 1){
      this.ingredients.removeAt(this.ingredients.length-1);
    }
  }

  addImage() {
    this.images.push(this.fb.control(''));
  }

  removeImage() {
    if (this.ingredients.length > 1){
      this.images.removeAt(this.images.length-1);
    }
  }

  correctIngAndImg(dish: Dish){
    for (let i = 1; i < dish.ingredients.length; i++){
      this.ingredients.push(this.fb.control(dish.ingredients[i]));
    }
    for (let i = 1; i < dish.images.length; i++){
      this.images.push(this.fb.control(dish.images[i]));
    }
  }

  addItem(){
    const key = this.modifiedDish!.key;
    const data = this.itemModifyDetails.value;

    let ingredientsCorrected = data.ingredients.filter((e: any) => String(e).trim());
    let imagesCorrected = data.images.filter((e: any) => String(e).trim());;

    this.db.updateDishName(key, data.name);
    this.db.updateDishCuisine(key, data.cuisine);
    this.db.updateDishType(key, data.type);
    this.db.updateDishCategory(key, data.category);
    this.db.updateDishIngredients(key, ingredientsCorrected);
    this.db.updateDishQuantity(key, data.quantity);
    this.db.updateDishPrice(key, data.price);
    this.db.updateDishDescription(key, data.description);
    this.db.updateDishImages(key, imagesCorrected);
  }

  onSubmit() {
    this.addItem();
    this.modifiedDish!.name = this.itemModifyDetails.value.name;
    this.filterData.resetAll();
    this.paginInfo.setDishes();
  }

}
