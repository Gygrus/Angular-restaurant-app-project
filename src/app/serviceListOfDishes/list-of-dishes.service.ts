import { Injectable } from '@angular/core';
import { Dish } from '../../Dish'
import { map, Observable } from 'rxjs';
import { DatabaseDataService } from '../service-database/database-data.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ListOfDishesService {
dishList: any[] = [];
maxDishes :any[] = []
minDishes :any[] = []
  constructor(private databaseDishes: DatabaseDataService, public db: AngularFireDatabase) {
    this.databaseDishes.dishesList.subscribe(e => {
      this.dishList = e;
      this.maxDishes = this.mostExpensive();
      this.minDishes = this.leastExpensive();
    })
    // this.dishList = this.databaseDishes.testDishes;
  }



  mostExpensive() {
    let maxVal = 0;
    let maxDishes = [];
    console.log(this.dishList, "asd");
    for (let dish of this.dishList){
      if (dish.price > maxVal){
        maxVal = dish.price;
        maxDishes = [];
        maxDishes.push(dish.name);
      } else if (dish.price == maxVal){
        maxDishes.push(dish.name);
      }
    }
    return maxDishes;
  }

  leastExpensive() {
    let minVal = 1000;
    let minDishes = [];
    for (let dish of this.dishList){
      if (dish.price < minVal){
        minVal = dish.price;
        minDishes = [];
        minDishes.push(dish.name);
      } else if (dish.price === minVal){
        minDishes.push(dish.name);
      }
    }
    return minDishes;
  }
}
//   dishList: Dish[] = [
//     {
//     name: "Kotlet Schabowy",
//     cuisine: "Kuchnia polska",
//     type: "Mięsne",
//     category: "Dania główne",
//     ingredients: ["Mięso schabowe", "Ziemniaki", "Surówka"],
//     quantity: 23,
//     price: 6.99,
//     ordered: 0,
//     description: "Etiam venenatis nibh luctus, scelerisque risus ut, vehicula leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus.",
//     images: ["https://drive.google.com/uc?export=view&id=1H8KXswH2gAMfY7ZsBOdq9osyW9Tot43p", "../../assets/images/schab2.jpg"],
//     rating: 0,
//     reviews: []},
//     {
//     name: "Burger",
//     cuisine: "Kuchnia amerykańska",
//     type: "Mięsne",
//     category: "Fast food",
//     ingredients: ["Mięso wołowe", "Sałata", "Pomidor", "Ser", "Sos"],
//     quantity: 8,
//     ordered: 0,
//     price: 5.99,
//     description: "Duis vitae gravida metus, ut sodales ante. Proin placerat mauris lacus, a dictum lectus lacinia feugiat. Nulla lobortis diam massa.",
//     images: ["https://drive.google.com/uc?export=view&id=1rciPIy2MJshykudHFxCfwb95PPPsbkUs"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Kebab",
//     cuisine: "Kuchnia turecka",
//     type: "Mięsne",
//     category: "Dania główne",
//     ingredients: ["Mięso baranie", "Mięso drobiowe", "Surówka", "Sos"],
//     quantity: 15,
//     ordered: 0,
//     price: 4.69,
//     description: "Proin et commodo urna. Ut volutpat ipsum sit amet lacus aliquam, nec finibus purus lacinia. Suspendisse tempor et nunc non.",
//     images: ["https://drive.google.com/uc?export=view&id=1O7aqjrGgi4QiLrDZOqtB5P15mv7S1iHe"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Lody w pucharku",
//     cuisine: "Kuchnia międzynarodowa",
//     type: "Wegatariańskie",
//     category: "Desery",
//     ingredients: ["Mleko", "Śmietanka", "Owoce"],
//     quantity: 14,
//     ordered: 0,
//     price: 3.50,
//     description: "Quisque in eros sit amet ligula accumsan viverra. Mauris dictum maximus quam maximus iaculis. Suspendisse sapien nisi, pretium sit amet.",
//     images: ["https://drive.google.com/uc?export=view&id=1VZcmEaFa-AyXRDrh-xtveVy1qjRxPUny"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Pizza",
//     cuisine: "Kuchnia włoska",
//     type: "Wegetariańskie",
//     category: "Dania główne",
//     ingredients: ["Ser", "Ciasto", "Pomidor", "Papryka", "Pieczarki", "Kukurydza"],
//     quantity: 45,
//     ordered: 0,
//     price: 6.20,
//     description: "Vivamus tincidunt, urna ac maximus hendrerit, odio dui aliquam ex, et maximus ipsum lacus ac nibh. Nunc feugiat orci sit.",
//     images: ["https://drive.google.com/uc?export=view&id=1p9B3As94p6A4-I5g0VxCR1H2wDy1S1xa"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Pierogi ruskie",
//     cuisine: "Kuchnia polska",
//     type: "Wegetariańskie",
//     category: "Dania główne",
//     ingredients: ["Ciasto", "Masa twarogowo-ziemniaczana", "Pieprz", "Cebula", "Omasta"],
//     quantity: 5,
//     ordered: 0,
//     price: 4.89,
//     description: "Integer vestibulum lacinia lorem, at porta odio pretium id. Curabitur ut libero consectetur, vehicula sapien eget, elementum nisl. Ut non.",
//     images: ["https://drive.google.com/uc?export=view&id=1f3FhUKWZiInveP9lHXWgWeFeeT1_CEU5"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Herbata",
//     cuisine: "Kuchnia międzynarodowa",
//     type: "Wegetariańskie",
//     category: "Napoje",
//     ingredients: ["Herbata", "Woda", "Owoce"],
//     quantity: 25,
//     ordered: 0,
//     price: 2.80,
//     description: "Integer suscipit eu nibh nec condimentum. Integer ornare efficitur odio a sollicitudin. Nam semper vel elit at congue. Quisque porttitor.",
//     images: ["https://drive.google.com/uc?export=view&id=18AfxfgCEXgJjNmVrKNkQ0-l8Dd40CFfn"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Kawa mrożona",
//     cuisine: "Kuchnia międzynarodowa",
//     type: "Wegetariańskie",
//     category: "Napoje",
//     ingredients: ["Kawa", "Lody śmietankowe", "Cukier", "Mleko", "Lód"],
//     quantity: 7,
//     ordered: 0,
//     price: 3.3,
//     description: "Fusce facilisis augue non ex varius ornare. Mauris pharetra ipsum a leo aliquam faucibus. Nam venenatis massa non libero tempor.",
//     images: ["https://drive.google.com/uc?export=view&id=1eStKQ97Ql7jlsyngxGI5_4WuZkz3ZFDD"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Zupa meksykańska",
//     cuisine: "Kuchnia meksykańska",
//     type: "Mięsne",
//     category: "Zupy",
//     ingredients: ["Mięso", "Kukurydza", "Fasola", "Wywar"],
//     quantity: 22,
//     ordered: 0,
//     price: 4.20,
//     description: "Donec semper sem et ornare aliquet. Etiam hendrerit urna eget odio euismod, non commodo odio porta. Maecenas ipsum nisl, efficitur.",
//     images: ["https://drive.google.com/uc?export=view&id=1hS-D7S4PaQ1BJl79VV782rFaLHgTR7iH"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Placki ziemniaczane",
//     cuisine: "Kuchnia polska",
//     type: "Wegatariańskie",
//     category: "Dania główne",
//     ingredients: ["Ziemniaki", "Owoce", "Sos", "Cebula"],
//     quantity: 19,
//     ordered: 0,
//     price: 3.79,
//     description: "Donec venenatis velit nibh. Pellentesque id nunc vitae lorem fermentum euismod non vel tellus. Maecenas non tincidunt ex. Integer sollicitudin.",
//     images: ["https://drive.google.com/uc?export=view&id=1aJqxoXxg7BK4PB23shMtgyQI_lNEgkT6"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Sushi",
//     cuisine: "Kuchnia azjatycka",
//     type: "Mięsne",
//     category: "Owoce morza",
//     ingredients: ["Łosoś", "Ryż", "Wodorosty", "Ocet", ],
//     quantity: 6,
//     ordered: 0,
//     price: 7.39,
//     description: "Morbi ac tellus eros. Aliquam ullamcorper cursus justo, non fermentum enim eleifend in. In condimentum vulputate ex, quis tincidunt dui.",
//     images: ["https://drive.google.com/uc?export=view&id=1gpR8RhlAW4ykItXuNhS8doZ45aIWUtRe"],
//     rating: 0,
//     reviews: []
//     },
//     {
//     name: "Żurek",
//     cuisine: "Kuchnia polska",
//     type: "Mięsne",
//     category: "Zupy",
//     ingredients: ["Wywar", "Kiełbasa", "Jajko", "Ziemniaki"],
//     quantity: 12,
//     ordered: 0,
//     price: 3.59,
//     description: "Duis iaculis quam non varius gravida. Suspendisse interdum quis nisl in suscipit. Vestibulum elementum elit id elit varius rutrum. Duis.",
//     images: ["https://drive.google.com/uc?export=view&id=1PjLvVjxk9nlXejM3Wf4gXn4bZoIFFdYy"],
//     rating: 0,
//     reviews: []
//     }
// ]
