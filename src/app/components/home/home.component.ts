import { Component, OnInit } from '@angular/core';
import Budget from '../../models/budget';
import BudgetClient from '../../models/budgetClient';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetListComponent } from "../budget-list/budget-list.component";
import { BudgetService } from '../../services/budget.service';
import { isPhoneNumber } from '../../validators/number-validators';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public formBudget: FormGroup;
  public formClientBudget: FormGroup;

  public budget: Budget = {
    seo: false,
    ads: false,
    web: false,
    pages: 0,
    languages: 0,
    totalBudget: 0
  };

  public submitBudget: boolean = false;
  public errorSubmitBudget: boolean = false;



  constructor(protected budgetService: BudgetService, private fb: FormBuilder) {

    this.formBudget = this.fb.group({
      seo: [this.budget.seo],
      ads: [this.budget.ads],
      web: [this.budget.web]
    });

    this.formClientBudget = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, isPhoneNumber()]],
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit(): void {
    this.initFormBudget();
  }

  initFormBudget() {
    this.formBudget.valueChanges.subscribe(values => {
      this.budget = { ...this.budget, ...values };
      this.updateBudget();
    });
  }

  setInfoPanel(panelValues: any): void {
    this.budget.pages = panelValues.pages;
    this.budget.languages = panelValues.languages;
    this.updateBudget();
  }

  updateBudget(): void {
    if (!this.budget.web) {
      this.budget.pages = 0;
      this.budget.languages = 0;
    }
    this.budget.totalBudget = this.budgetService.calculateBudget(this.budget);
  }


  createClientBudget() {

    this.formClientBudget.markAllAsTouched();
    
    if(this.formClientBudget.invalid){
      this.submitBudget = false;
      this.errorSubmitBudget = true;
    }else{

      const clientBudget: BudgetClient = {
        name: this.formClientBudget.get('name')?.value,
        phone: this.formClientBudget.get('phone')?.value,
        email: this.formClientBudget.get('email')?.value,
        hiredServices: this.budget
      }

      this.budgetService.addClientBudget(clientBudget);

      this.submitBudget = true;
      this.errorSubmitBudget = false;
    }
    
  }

}

