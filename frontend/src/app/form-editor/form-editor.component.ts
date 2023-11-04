import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  readonly URL = 'http://localhost:5000/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.form.valid && this.checkCnp() && this.checkPhoneNumber()) {
      this.isFormSubmitted = true;
      this.computeTotal();

      this.generatePDF()

      console.log(this.createHttpJsonContentType());
      this.sendDataToServer()

    } else {
      this.checkCnp
      this.checkPhoneNumber
    }
  }

  sendDataToServer(): void {
    this.http.post(this.URL, this.createHttpJsonContentType(), this.httpOptions)
      .subscribe(data => console.log(data));
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

  computeTotal(): void {
    this.computeLicensePlateTax();
    this.computePrefferedNumberTax();

    this.total = this.REGISTRATION_TAX + this.licencePlateTax + this.preferredNumberTax;
  }

  computeLicensePlateTax(): void {
    if (this.form.value.licencePlateType === 'A') {
      this.licencePlateTax = 40;
    } else if (this.form.value.licencePlateType === 'B') {
      this.licencePlateTax = 46;
    } else if (this.form.value.licencePlateType === 'C') {
      this.licencePlateTax = 37;
    }
  }

  computePrefferedNumberTax(): void {
    if (this.isPrefferedNumberChecked) {
      this.preferredNumberTax = 45;
    }
  }

  private createHttpJsonContentType(): any {
    return {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      cnp: this.form.get('cnp')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phoneNumber')?.value,
      county: this.form.get('county')?.value,
      licencePlateType: this.form.value.licencePlateType,
      userPreferredNumber: this.form.get('userPreferences')?.get('userPreferredNumber')?.value,
      total: this.total
    };
  }

  generatePDF(): void {
    const formContent = [
      {
        text: "Ordin de Plata",
        style: "header",
      },
      {
        text: 'Informații personale:',
        style: 'subheader',
      },
      {
        columns: [
          {
            width: '40%',
            stack: [
              'Nume: ' + this.form.value.firstName,
              'Prenume: ' + this.form.value.lastName,
              'CNP: ' + this.form.value.cnp,
              'Telefon: ' + this.form.value.phoneNumber,
              'Mail: ' + this.form.value.email,
              'Judet: ' + this.form.value.county,
            ],
          },
        ],
      },
      {
        text: 'Tip placute selectat ' + this.form.value.licencePlateType,
        style: 'subheader',
      },
      {
        text: 'Numar preferential ' + this.form.get('userPreferences')?.get('userPreferredNumber')?.value,
        style: 'subheader',
      },
      {
        text: 'Total: ' + this.total,
        style: 'subheader',
      },
    ];

    const docDefinition = {
      content: formContent,
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.open();
    pdfDoc.download("ordin_plata.pdf");
  }
}
