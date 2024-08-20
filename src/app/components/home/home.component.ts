import { Component, OnInit, signal } from '@angular/core';
import Budget from '../../models/budget';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule} from '@angular/forms'
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  public formBudget: FormGroup = new FormGroup({});
  public budget: Budget = {
    seo: false,
    ads: false,
    web: false,
    pages: 0,
    languages: 0, 
    totalBudget: 0
  }

  constructor(protected budgetService: BudgetService){}

  ngOnInit(): void {
    this.initFormBudget();
  }

  initFormBudget(){

    this.formBudget = new FormGroup ({
      seo: new FormControl (this.budget.seo),
      ads: new FormControl (this.budget.ads),
      web: new FormControl (this.budget.web)
    })

    this.formBudget.valueChanges.subscribe(values => {
      this.budget = { ...this.budget, ...values };
      this.updateBudget();
    });

  }

  setInfoPanel(panelValues: any): void{

    this.budget.pages = panelValues.pages;
    this.budget.languages = panelValues.languages;
    this.updateBudget();

  }

  updateBudget(): void {
    this.budget.totalBudget = this.budgetService.calculateBudget(this.budget);
  }



}
