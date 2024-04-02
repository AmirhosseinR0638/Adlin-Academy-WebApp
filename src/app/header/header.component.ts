import { Component, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routerClass, routes } from '../app.routes';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userService: UsersService = inject(UsersService);
  logOut() {
    let userIndex = this.userService.users.findIndex(
      (u) => u.isLoggedIn == true
    );
    if (userIndex != -1) {
      alert(
        `${this.userService.users[userIndex].username} از حساب خود خارج شدید.`
      );
      this.userService.users[userIndex].isLoggedIn = false;
    } else {
      alert('شما هنوز وارد حساب خود نشده اید.');
    }
  }
}
