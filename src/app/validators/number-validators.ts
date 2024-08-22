import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function positiveIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      const isValid = Number.isInteger(value) && value >= 0;
      return isValid ? null : { invalidNumber: true };
    };
}

export function isPhoneNumber(): ValidatorFn{
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    const phoneNumberPattern = /^\d{9}$/;
    const isValid = phoneNumberPattern.test(value);
    return isValid ? null : { invalidNumber: true };
  };
  
}