import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';
import Budget from '../models/budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate budget correctly when web is selected', () => {
    const budget: Budget = {
      seo: true,
      ads: true,
      web: true,
      pages: 5,
      languages: 3,
      totalBudget: 0
    };

    const expectedWebBudget = service.calculateWebBudget(budget.pages, budget.languages);
    const expectedBudget = service.priceSEO + service.priceADS + service.priceWEB + expectedWebBudget;
    expect(service.calculateBudget(budget)).toBe(expectedBudget);
  });

  it('should calculate budget correctly when web is not selected', () => {
    const budget: Budget = {
      seo: true,
      ads: true,
      web: false,
      pages: 5,
      languages: 3
    };
  
    const expectedBudget = service.priceSEO + service.priceADS;
    expect(service.calculateBudget(budget)).toBe(expectedBudget);
  });

  it('should handle the case where all optional fields are zero', () => {
    const budget: Budget = {
      seo: false,
      ads: false,
      web: false,
      pages: 0,
      languages: 0,
      totalBudget: 0
    };

    const expectedBudget = 0;
    expect(service.calculateBudget(budget)).toBe(expectedBudget);
  });

});


