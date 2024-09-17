import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BudgetService } from '../../services/budget.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ReactiveFormsModule],
      providers: [{provide: BudgetService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update budget when seo checkbox value changes', () => {
    spyOn(component, 'updateBudget').and.callThrough();

    component.formBudget.controls['seo'].setValue(false);
    fixture.detectChanges();

    expect(component.updateBudget).toHaveBeenCalled();
  });

  it('should update budget when ads checkbox value changes', () => {
    spyOn(component, 'updateBudget').and.callThrough();

    component.formBudget.controls['ads'].setValue(true);
    fixture.detectChanges();

    expect(component.updateBudget).toHaveBeenCalled();
  });

  it('should update budget when web checkbox value changes', () => {
    spyOn(component, 'updateBudget').and.callThrough();

    component.formBudget.controls['web'].setValue(false);
    fixture.detectChanges();

    expect(component.updateBudget).toHaveBeenCalled();
  });

});
