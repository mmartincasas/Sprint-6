import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
export class PanelComponent implements OnInit {

  @Output()
  emitPanelValue: EventEmitter<any> = new EventEmitter <any>

  @ViewChild(ModalComponent) newModal!: ModalComponent;

  public formWebPanel: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initFormWebPanel();
  }

  initFormWebPanel(){
    this.formWebPanel = new FormGroup ({
      pages: new FormControl (0, [positiveIntegerValidator()]),
      languages: new FormControl (0, [positiveIntegerValidator()])
    })

    this.formWebPanel.valueChanges.subscribe(values => {
      if (this.formWebPanel.valid) {
        this.emitPanelValue.emit(values);
      }
    });
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

}
