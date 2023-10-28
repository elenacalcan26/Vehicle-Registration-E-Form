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

  onSubmit() {
    if (this.form.valid && this.checkCnp() && this.checkPhoneNumber()) {
      console.log('Form Completed');
      console.log(this.form.value);
    } else {
      this.checkCnp
      this.checkPhoneNumber
    }
  }

  toggleInputField(event: any) {
    if (event.target.checked) {
      this.form.get('userPreferences.userPreferredNumber')?.enable();
    } else {
      this.form.get('userPreferences.userPreferredNumber')?.disable();
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
}

export function requireOneCheckbox(control: AbstractControl) {
  const typeA = control.get('typeA')?.value || false;
  const typeB = control.get('typeB')?.value || false;
  const typeC = control.get('typeC')?.value || false;

  if (!typeA && !typeB && !typeC) {
    return { requireOneCheckbox: true };
  }

  return null;
}
