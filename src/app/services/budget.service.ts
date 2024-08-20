import { Injectable } from '@angular/core';
import Budget from '../models/budget';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  priceSEO: number = 300;
  priceADS: number = 400;
  priceWEB: number = 500;
  pricePL: number = 30;

  calculateBudget (values: Budget):number{
   
    let total = 0;

    if (values.seo) total += this.priceSEO;
    if (values.ads) total += this.priceADS;
    if (values.web){ 
      total += this.priceWEB;
      total += this.calculateWebBudget(values.pages, values.languages);
    }
 
    return total;
  }


  calculateWebBudget(pages:number, languages: number){

    return (pages + languages) * this.pricePL;

  }


}
