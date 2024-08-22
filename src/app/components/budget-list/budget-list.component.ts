import { Component } from '@angular/core';
import BudgetClient from '../../models/budgetClient';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {

  public budgetClients: BudgetClient [] = [];

  constructor(protected budgetService: BudgetService){

    this.budgetClients = budgetService.budgetClients;

    console.log(this.budgetClients);

  }

  


}
