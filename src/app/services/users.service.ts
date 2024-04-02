import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isUserLogged: boolean = false;
  users: User[] = [
    new User('علی احمدی', '12345678', 'Ahmadi@gmail.com'),
    new User('محمد رضایی', '12345678', 'Rezai@gmail.com'),
    new User('فاطمه صابری', '12345678', 'Saberi@gmail.com'),
    new User('قاسم جابری', '12345678', 'Jaberi@gmail.com'),
  ];
}
