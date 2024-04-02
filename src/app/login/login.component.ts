import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from '../services/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.activatedRoute.queryParamMap.subscribe((data) => {
      if (data.get('LoggedIn')) {
        this.userService.isUserLogged = false;
      }
    });
  }
  section: string = 'Sign in'; //for switch between sign in form and sign up  form
  userStatus: string = 'notFound'; //specify that user logged in or logged out
  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  route: Router = inject(Router);
  activeRoute: Location = inject(Location);
  userService: UsersService = inject(UsersService);
  users: User[] = this.userService.users;
  showNotification: boolean = false;
  usernameCopy: string = ''; //for showing some massages by using user name like welcome message
  signInFormSubmitted() {
    let username = this.signInForm.get('username').value;
    let password = this.signInForm.get('password').value;
    let userIndex = this.users.findIndex(
      (u) => u.username == username && u.password == password
    );
    if (userIndex != -1) {
      this.userService.isUserLogged = true;
      this.users[userIndex].isLoggedIn = true;
      this.usernameCopy = this.users[userIndex].username;
      this.userStatus = 'signedIn';
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
        this.activeRoute.back();
      }, 2000);
    } else {
      this.usernameCopy = username;
      this.userStatus = 'notFound';
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 6000);
    }
    this.signInForm.reset();
  }
  signUpFormSubmitted() {
    let username = this.signUpForm.get('username').value;
    let password = this.signUpForm.get('password').value;
    let email = this.signUpForm.get('email').value;
    this.users.push(new User(username, password, email));
    this.usernameCopy = username;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 6000);
    this.userStatus = 'signedUp';
    this.signUpForm.reset();
  }
  selectSection(section: string) {
    this.section = section;
  } //switching between sign in section and sign up section
  restorePassword() {
    let username = prompt('نام خود را وارد کنید:');
    let email = prompt('ایمیل خود را وارد کنید:');
    let userIndex = this.userService.users.findIndex(
      (u) => u.username == username && u.email == email
    );
    let message = '';
    if (userIndex != -1) {
      message = `کاربر محترم با نام کاربری ${username} و ایمیل ${email}، رمز ورود شما ${this.userService.users[userIndex].password} است.`;
      alert(message);
    } else {
      message = `کاربری با نام کاربری ${username} و ایمیل ${email} پیدا نشد. درصورت لزوم می تواند حساب کاربری جدیدی ایجاد کنید.`;
      alert(message);
    }
  }
}
