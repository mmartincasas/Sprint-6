import { Component, OnInit, ViewChild} from '@angular/core';
import Budget from '../../models/budget';
import BudgetClient from '../../models/budgetClient';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetListComponent } from "../budget-list/budget-list.component";
import { BudgetService } from '../../services/budget.service';
import { isPhoneNumber } from '../../validators/number-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent, FormsModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @ViewChild(ModalComponent) SubmitModal!: ModalComponent;

  public formBudget: FormGroup;
  public formClientBudget: FormGroup;

  protected budget: Budget = {
    seo: false,
    ads: false,
    web: false,
    pages: 0,
    languages: 0,
    totalBudget: 0
  };

  public submitBudget: boolean = false;
  public errorSubmitBudget: boolean = false;

  constructor(
    protected budgetService: BudgetService, 
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

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

  
    
  initBudgetFromURL(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.budget.seo = params['Seo'] ? true : false;
      this.budget.ads = params['Ads'] ? true : false;
      this.budget.web = params['Web'] ? true : false;
      
      if (this.budget.web) {
        const panelValues = {
          pages: params['Pages'] ? +params['Pages'] : 0,
          languages: params['Lang'] ? +params['Lang'] : 0
        };
        this.setInfoPanel(panelValues);
      }
    });
  }





  setInfoPanel(panelValues: any): void {
    this.budget.pages = panelValues.pages;
    this.budget.languages = panelValues.languages;
    this.updateBudget();
  }

  initFormBudget(){

    this.initBudgetFromURL();

    setTimeout(() => {

    this.formBudget = this.fb.group({
      seo: [this.budget.seo], 
      ads: [this.budget.ads], 
      web: [this.budget.web]  
    });

    this.formBudget.valueChanges.subscribe(values => {
      this.budget = { ...this.budget, ...values };
    });

  }, 1000);
    
  }

  updateBudget(): void {

    if (!this.budget.web) {
      this.budget.pages = 0;
      this.budget.languages = 0;
      
    }
    
    this.budget.totalBudget = this.budgetService.calculateBudget(this.budget);
    this.updateUrlParams();

  }


  updateUrlParams(): void {
    const params: any = {};

    if (this.budget.seo === true) params.Seo = this.budget.seo;
    if (this.budget.ads === true) params.Ads = this.budget.ads;
    if (this.budget.web === true) params.Web = this.budget.web;
    if (this.budget.pages > 0) params.Pages = this.budget.pages;
    if (this.budget.languages > 0) params.Lang = this.budget.languages;
      
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'replace'
    });

  }


  createClientBudget() {
    this.formClientBudget.markAllAsTouched();
    
    if(this.formClientBudget.invalid||this.budget.totalBudget==0){
      this.submitBudget = false;
      this.errorSubmitBudget = true;
    }else{

      const clientBudget: BudgetClient = {
        name: this.formClientBudget.get('name')?.value,
        phone: this.formClientBudget.get('phone')?.value,
        email: this.formClientBudget.get('email')?.value,
        date: new Date(),
        hiredServices: this.budget
      }

      this.budgetService.addClientBudget(clientBudget);
      this.SubmitModal.openModal('SubmitBudgetModal')
      this.cleanFormClientBudget();
    }
  }

  cleanFormClientBudget () {
    this.errorSubmitBudget = false;
    this.formClientBudget.reset();
    
  }

}

