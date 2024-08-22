import { Injectable } from '@angular/core';
import Budget from '../models/budget';
import BudgetClient from '../models/budgetClient';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  priceSEO: number = 300;
  priceADS: number = 400;
  priceWEB: number = 500;
  pricePL: number = 30;


    /*Hardcoded Clients*/
    clientBudgetH1: BudgetClient = {
      name: 'Ona Marín',
      phone: '651565656',
      email: 'ona@yahoo.es',
      hiredServices: {
        seo: true,
        ads: false,
        web: true,
        pages: 2,
        languages: 1,
        totalBudget: 890
      }
    }

    clientBudgetH2: BudgetClient = {
      name: 'Anthony Rubio',
      phone: '651452323',
      email: 'rubio@microsoft.es',
      hiredServices: {
        seo: true,
        ads: true,
        web: false,
        pages: 0,
        languages: 0,
        totalBudget: 700
      }
    }

    clientBudgetH3: BudgetClient = {
      name: 'Mario Luengo',
      phone: '123456789',
      email: 'mario@msn.es',
      hiredServices: {
        seo: false,
        ads: true,
        web: true,
        pages: 6,
        languages: 2,
        totalBudget: 1440
      }
    }


  public budgetClients: BudgetClient [] = [];

  constructor(){

    /*Push hardcoded data*/
    this.budgetClients.push(this.clientBudgetH1, this.clientBudgetH2, this.clientBudgetH3)
    
  }

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

  addClientBudget(client: BudgetClient): void{

    console.log(client);

    this.budgetClients.push(client);

    console.log('Client added');

    console.log(this.budgetClients)
    

  }


}
