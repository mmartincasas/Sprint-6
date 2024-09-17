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

  sortByAscDate = true;
  sortByAscTotalBudget = true;
  sortByAscName = true;


    /*Hardcoded Clients*/
    clientBudgetH1: BudgetClient = {
      name: 'Ona Marín',
      phone: '651565656',
      email: 'ona@yahoo.es',
      date: new Date('2024-07-15T09:00:00Z'),
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
      date: new Date('2024-08-26T10:00:00Z'), 
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
      date: new Date('2024-09-01T14:30:00Z'),
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

    this.budgetClients.push(client);   

  }


  sortByDate(){

    if (this.sortByAscDate){
      this.sortByAscDate = false;
      return this.budgetClients.sort((a,b) => 
        a.date.getTime() - b.date.getTime()
      )

    }else{
      this.sortByAscDate = true;
      return this.budgetClients.sort((a,b) => 
        b.date.getTime() - a.date.getTime()
      )
    }
  }

  sortByTotalBudget(){

    if (this.sortByAscTotalBudget){
      this.sortByAscTotalBudget = false;
      return this.budgetClients.sort((a,b) => 
        a.hiredServices.totalBudget - b.hiredServices.totalBudget
      )


    }else{
      this.sortByAscTotalBudget = true;
      return this.budgetClients.sort((a,b) => 
        b.hiredServices.totalBudget - a.hiredServices.totalBudget
      )
    }
  }

  sortByName(){

    if (this.sortByAscName){

      this.sortByAscName = false;
      return this.budgetClients.sort((a,b) => 
        a.name.localeCompare(b.name)
      )

    }else{
      this.sortByAscName = true;
      return this.budgetClients.sort((a,b) => 
        b.name.localeCompare(a.name)
      )
    }
  }


  filterByName(value: string) {
   
    if (!value) {
      return this.budgetClients;
    }
    
    const filteredClients = this.budgetClients.filter(client => 
      client.name.toLowerCase().includes(value.toLowerCase())
    );
    
    return filteredClients;
  }



}
