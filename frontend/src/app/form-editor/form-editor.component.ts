import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent {
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    cnp: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')

  })

  onSubmit() {
    console.log('Form Completed');
    console.log(this.form.value)
  }

}
