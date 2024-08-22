import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent, ModalComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.formWebPanel;
    expect(form).toBeTruthy();
    expect(form.get('pages')?.value).toBe(0);
    expect(form.get('languages')?.value).toBe(0);
  });

  it('should emit valid values when form controls are valid', () => {
    spyOn(component.emitPanelValue, 'emit');
  
    component.formWebPanel.get('pages')?.setValue(5); 
    component.formWebPanel.get('languages')?.setValue(3);
  
    fixture.detectChanges();
  
    expect(component.emitPanelValue.emit).toHaveBeenCalledWith({ pages: 5, languages: 3});
  });

  it('should emit default values when form controls are invalid', () => {
    spyOn(component.emitPanelValue, 'emit');
  
    component.formWebPanel.get('pages')?.setValue(-5); 
    component.formWebPanel.get('languages')?.setValue(-1);
  
    fixture.detectChanges();
  
    expect(component.emitPanelValue.emit).toHaveBeenCalledWith({pages: 0, languages: 0});
  });

  it('should update panel values when increase and decrease actions are triggered', () => {
    const form = component.formWebPanel;
    component.updatePanelValue('pages', 'increase');
    expect(form.get('pages')?.value).toBe(1);
    
    component.updatePanelValue('pages', 'decrease');
    expect(form.get('pages')?.value).toBe(0);
    
    component.updatePanelValue('pages', 'increase');
    component.updatePanelValue('pages', 'increase');
    expect(form.get('pages')?.value).toBe(2);
  });

  it('should call openModal method on newModal', () => {

    expect(component.newModal).toBeDefined();

    const spy = spyOn(component.newModal, 'openModal');
    component.openModal('languageModal');
    expect(spy).toHaveBeenCalledWith('languageModal');
  });

});
