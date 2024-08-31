
/*
import { Component, EventEmitter, OnInit, Output, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { positiveIntegerValidator } from '../../validators/number-validators';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit, OnChanges {

  @Input() pagesURL: number = 0;
  @Input() langURL: number = 0;

  @Output()
  emitPanelValue: EventEmitter<any> = new EventEmitter <any>

  @ViewChild(ModalComponent) newModal!: ModalComponent;

  public formWebPanel: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initFormWebPanel();
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pagesURL || changes.langURL) {
      this.updateFormValues();
    }
  }

  initFormWebPanel(){
    this.formWebPanel = new FormGroup ({
      pages: new FormControl (this.pagesURL, [positiveIntegerValidator()]),
      languages: new FormControl (this.langURL, [positiveIntegerValidator()])
    })

    this.formWebPanel.valueChanges.subscribe(() => {
        this.emitValidValues();
    });
  }

  emitValidValues() {
    const pagesValue = this.formWebPanel.get('pages')?.value;
    const languagesValue = this.formWebPanel.get('languages')?.value;
  
    const validValues: any = {};
   
    validValues.pages = (this.formWebPanel.get('pages')?.valid && pagesValue >= 0) ? pagesValue : 0;
    validValues.languages = (this.formWebPanel.get('languages')?.valid && languagesValue >= 0) ? languagesValue : 0;
   
    this.emitPanelValue.emit(validValues);
  }

  updatePanelValue(controlName: string, action: string){

    const currentNumber = this.formWebPanel.get(controlName)?.value ??0;

    if (action =='decrease' && currentNumber > 0){
        this.formWebPanel.get(controlName)?.setValue(currentNumber - 1);
    }else if (action == 'increase'){
      if (currentNumber<0){
        this.formWebPanel.get(controlName)?.setValue(0);
      }else{
        this.formWebPanel.get(controlName)?.setValue(currentNumber + 1);
      }
    }

  }

  openModal(type: string){
    this.newModal.openModal(type);
  }

}*/

import { Component, EventEmitter, OnInit, Output, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { positiveIntegerValidator } from '../../validators/number-validators';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnChanges {

  @Input() pagesURL: number = 0;
  @Input() langURL: number = 0;

  @Output()
  emitPanelValue: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ModalComponent) newModal!: ModalComponent;

  public formWebPanel: FormGroup = new FormGroup({});

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagesURL'] || changes['langURL']) {
      this.updateFormValues();
    }
  }

  ngOnInit(): void {
    this.initFormWebPanel();
  }

  initFormWebPanel() {
    this.formWebPanel = new FormGroup({
      pages: new FormControl(this.pagesURL, [positiveIntegerValidator()]), // Inicializa con pagesURL
      languages: new FormControl(this.langURL, [positiveIntegerValidator()]) // Inicializa con langURL
    });

    this.formWebPanel.valueChanges.subscribe(() => {
      this.emitValidValues();
    });
  }

  updateFormValues() {
    if (this.formWebPanel) {
      this.formWebPanel.patchValue({
        pages: this.pagesURL,
        languages: this.langURL
      }, { emitEvent: false }); // No emitir evento para evitar bucles infinitos
    }
  }

  emitValidValues() {
    const pagesValue = this.formWebPanel.get('pages')?.value;
    const languagesValue = this.formWebPanel.get('languages')?.value;

    const validValues: any = {};
   
    validValues.pages = (this.formWebPanel.get('pages')?.valid && pagesValue >= 0) ? pagesValue : 0;
    validValues.languages = (this.formWebPanel.get('languages')?.valid && languagesValue >= 0) ? languagesValue : 0;
   
    this.emitPanelValue.emit(validValues);
  }

  updatePanelValue(controlName: string, action: string) {
    const currentNumber = this.formWebPanel.get(controlName)?.value ?? 0;

    if (action === 'decrease' && currentNumber > 0) {
      this.formWebPanel.get(controlName)?.setValue(currentNumber - 1);
    } else if (action === 'increase') {
      if (currentNumber < 0) {
        this.formWebPanel.get(controlName)?.setValue(0);
      } else {
        this.formWebPanel.get(controlName)?.setValue(currentNumber + 1);
      }
    }
  }

  openModal(type: string) {
    this.newModal.openModal(type);
  }
}
