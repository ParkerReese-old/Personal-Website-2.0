import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

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

  sendingMessage = false;

  constructor(private http: HttpClient, private snack: MatSnackBar) {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  messageFormControl = new FormControl('', [Validators.required]);

  formGroup = new FormGroup({ name: this.nameFormControl, email: this.emailFormControl, message: this.messageFormControl });

  matcher = new MyErrorStateMatcher();

  onSubmit(formGroup: FormGroup) {
    this.sendingMessage = true;
    const controls = formGroup.controls;
    const name = controls.name.value;
    const email = controls.email.value;
    const message = controls.message.value;

    const body = `entry.1138434429=${name}&entry.811171446=${email}&entry.1882298529=${message}`;
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdDEL4XF9pxaFa99IbKs7Iy3dMjImJ9a_UfdFt1CQ_nSgemOA/formResponse';

    this.http.post(url, body, { 'headers': { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }).subscribe(
      () => {
        this.messageSubmitted();
      }, () => {
        this.messageSubmitted();
      });
  }

  messageSubmitted(): void {
    this.snack.open('Thank you for the message!', null, {duration: 2000});

    this.formGroup.reset();
    this.formGroup.markAsUntouched();
    Object.keys(this.formGroup.controls).forEach((name) => {
      const control = this.formGroup.controls[name];
      control.setErrors(null);
    });
    this.sendingMessage = false;
    return;
  }

}
