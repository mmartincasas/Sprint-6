import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import BudgetClient from '../../models/budgetClient';
import { BudgetService } from '../../services/budget.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent implements OnInit {

  public budgetClients: BudgetClient [] = [];
  public activeSearch: boolean = false;
  public searchTerm: string = '';

  public formSearch: FormGroup;

  constructor(protected budgetService: BudgetService, private fb: FormBuilder){
    this.budgetClients = budgetService.budgetClients;

    this. formSearch = this.fb.group({
      'search-name': ['']
    });
  }

  ngOnInit(): void {
    this.formSearch.get('search-name')?.valueChanges.subscribe(
      value => { this.budgetClients = this.budgetService.filterByName(value) }
    );
  }

  changeIconSearch(){
    this.activeSearch = !this.activeSearch;
  }


}
