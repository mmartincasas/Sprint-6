import { Component, OnInit, signal } from '@angular/core';
//import Budget from '../../models/budget';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  public formBudget: FormGroup = new FormGroup({});

  totalBudget = signal (0);

  ngOnInit(): void {
    this.initFormBudget();
  }

  initFormBudget(){

    this.formBudget = new FormGroup ({
      seo: new FormControl (false),
      ads: new FormControl (false),
      web: new FormControl (false)
    })

  }

  updateBudget(): void {
    this.calculateBudget(this.formBudget.value);
  }

  calculateBudget (values: any):number{

    console.log(values);
    
    let total = 0;

    if (values.seo) total += 300;
    if (values.ads) total += 400;
    if (values.web) total += 500;
    
    this.totalBudget.set(total);
    return total;

  }


}
