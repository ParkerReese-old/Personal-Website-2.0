import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}

@Component({
  selector: 'parker-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Output() changeTabIndex = new EventEmitter();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  messageFormControl = new FormControl('', [Validators.required]);

  formGroup = new FormGroup({ name: this.nameFormControl, email: this.emailFormControl, message: this.messageFormControl });

  matcher = new MyErrorStateMatcher();

  onSubmit(formGroup: FormGroup) {
    const controls = formGroup.controls;
    const name = controls.name.value;
    const email = controls.email.value;
    const message = controls.message.value;

  }

}
