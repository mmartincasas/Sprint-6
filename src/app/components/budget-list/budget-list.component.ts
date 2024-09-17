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

  activeLink: string = '';
  sortByDateAsc: boolean = false;
  sortByTotalBudgetAsc: boolean = false;
  sortByNameAsc: boolean = false;


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

  sortByDate(){
    this.setActiveLink('date');
    this.budgetService.sortByDate(this.sortByDateAsc);
    this.sortByDateAsc = !this.sortByDateAsc;
  }


  sortByTotalBudget(): void {
    this.setActiveLink('totalBudget');
    this.budgetService.sortByTotalBudget(this.sortByTotalBudgetAsc);
    this.sortByTotalBudgetAsc = !this.sortByTotalBudgetAsc;
  }

  sortByName(): void {
    this.setActiveLink('name');
    this.budgetService.sortByName(this.sortByNameAsc);
    this.sortByNameAsc = !this.sortByNameAsc;
  }


  setActiveLink(link: string): void {
    this.activeLink = link;
  }



}
