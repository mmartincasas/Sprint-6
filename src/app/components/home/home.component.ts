import { Component, OnInit} from '@angular/core';
import Budget from '../../models/budget';
import BudgetClient from '../../models/budgetClient';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetListComponent } from "../budget-list/budget-list.component";
import { BudgetService } from '../../services/budget.service';
import { isPhoneNumber } from '../../validators/number-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, BudgetListComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

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

   
  initBudgetFromURL(): Promise<void> {

    return new Promise((resolve) => {
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
        console.log('INITBudgetFromURL:', this.budget);

        resolve(); 
      });
    });
  }

  setInfoPanel(panelValues: any): void {
    this.budget.pages = panelValues.pages;
    this.budget.languages = panelValues.languages;
    this.updateBudget();
  }

  async initFormBudget(){

    console.log('1:',this.budget)

    await this.initBudgetFromURL();

    //EL SETTIMEOUT QUE HACE QUE FUNCIONE, LA PROMESA NO FUNCIONA!!!
    /* */
    setTimeout(() => {

    console.log('2:',this.budget, this.budget.seo)
    console.log('Contenido de this.budget en JSON:', JSON.stringify(this.budget));

    this.formBudget = this.fb.group({
      seo: [this.budget.seo], 
      ads: [this.budget.ads], 
      web: [this.budget.web]  
    });

    console.log('Valores de budget:');
    console.log('SEO:', this.budget.seo);
    console.log('Ads:', this.budget.ads);
    console.log('Web:', this.budget.web);

    console.log('Valores iniciales del formulario:');
    console.log('SEO:', this.formBudget.get('seo')?.value);
    console.log('Ads:', this.formBudget.get('ads')?.value);
    console.log('Web:', this.formBudget.get('web')?.value);

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

    console.log('Saliendo de updateBudget', this.budget)
    console.log('Contenido de this.budget en JSON:', JSON.stringify(this.budget));

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

    console.log('UPDATEURLPARAMS')

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

      this.submitBudget = true;
      this.errorSubmitBudget = false;
    }
    
  }

}

