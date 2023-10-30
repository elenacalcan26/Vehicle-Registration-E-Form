import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    cnp: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required]),
    county: new FormControl('', [Validators.required]),
    licencePlateType: new FormControl('', Validators.required),
    userPreferences: new FormGroup({
      preferredNumberCheckbox: new FormControl(false),
      userPreferredNumber: new FormControl({value: '', disabled: true})
    }),

  })
  isFormSubmitted: boolean = false;
  isPrefferedNumberChecked: boolean = false;
  readonly REGISTRATION_TAX: number = 45
  licencePlateTax: number = 0;
  preferredNumberTax: number = 0;
  total: number = 0;



  onSubmit() {
    if (this.form.valid && this.checkCnp() && this.checkPhoneNumber()) {
      this.isFormSubmitted = true;
      this.computeTotal();

    } else {
      this.checkCnp
      this.checkPhoneNumber
    }
  }

  toggleInputField(event: any) {
    if (event.target.checked) {
      this.form.get('userPreferences.userPreferredNumber')?.enable();
      this.isPrefferedNumberChecked = true;
    } else {
      this.form.get('userPreferences.userPreferredNumber')?.disable();
      this.isPrefferedNumberChecked = false;
    }
  }

  checkCnp(): boolean {
    const cnpControl = this.form.get('cnp');
    if (cnpControl?.value && !/^\d{13}$/.test(cnpControl.value)) {
      cnpControl.setErrors({ invalidCnp: true });
      return false
    }
    return true;
  }

  checkPhoneNumber(): boolean {
    const phoneControl = this.form.get('phoneNumber');
    if (phoneControl?.value && !/^\+?40[0-9]{9}$/.test(phoneControl.value)) {
      phoneControl.setErrors({ invalidPhoneNumber: true });
      return false;
    }

    return true;
  }

  // Form Completed. Tipul de placut selectat: typeA
  computeTotal(): void {
    this.computeLicensePlateTax();
    this.computePrefferedNumberTax();

    this.total = this.REGISTRATION_TAX + this.licencePlateTax + this.preferredNumberTax;
  }

  computeLicensePlateTax(): void {
    if (this.form.value.licencePlateType === 'typeA') {
      this.licencePlateTax = 40;
    } else if (this.form.value.licencePlateType === 'typeB') {
      this.licencePlateTax = 46;
    } else if (this.form.value.licencePlateType === 'typeC') {
      this.licencePlateTax = 37;
    }
  }

  computePrefferedNumberTax(): void {
    if (this.isPrefferedNumberChecked) {
      this.preferredNumberTax = 45;
    }
  }

}
