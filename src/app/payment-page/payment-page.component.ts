import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink, NotFoundPageComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent implements OnInit {
  router: Router = inject(Router);
  course: any;
  form: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{16,19}'),
    ]),
    month: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{1,2}'),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{1,2}'),
    ]),
    securePassword: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{5}'),
    ]),
    cvv2: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{3,4}'),
    ]),
    secondPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{7}'),
    ]),
    email: new FormControl('', Validators.email),
  });
  time: number = 120;
  setTimer() {
    setInterval(() => {
      if (this.time != 0) {
        this.time--;
      }
    }, 1000);
  } //a necessary time for completing form
  ngOnInit() {
    this.course = this.router.lastSuccessfulNavigation.extras.state;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  isPasswordSent: boolean = false;
  passwordTime: number = 10;
  sendPassword() {
    this.isPasswordSent = true;
    setInterval(() => {
      if (this.passwordTime != 0) {
        this.passwordTime--;
      } else {
        this.isPasswordSent = false;
        this.passwordTime = 10;
      }
    }, 1000);
    setTimeout(() => {
      alert('رمز: 1234567');
    }, 6000);
  }
  onSubmitted() {
    if (this.form.get('securePassword').value != 47667) {
      alert('رمز امنیتی اشتباه است! لطفا آن را تصحیح فرمایید.');
      this.form.patchValue({ securePassword: '' });
    } else if (this.form.get('secondPassword').value != 1234567) {
      alert('رمز دوم اشتباه است! لطفا آن را تصحیح فرمایید.');
      this.form.patchValue({ secondPassword: '' });
    } else {
      alert('پرداخت با موفقیت انجام شد. ممنون از خرید شما :)');
      this.form.reset();
      this.router.navigateByUrl('/courses/course/' + this.course.id);
    }
  }
  canExit() {
    let userResponse = confirm(
      'عملیات پرداخت تکمیل نشده است! آیا میخواهید عملیات را لغو کنید؟'
    );
    if (userResponse) {
      return true;
    } else {
      return false;
    }
  } // for deactivate route guard
}
