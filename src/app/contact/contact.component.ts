import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  userService: UsersService = inject(UsersService);
  alreadySubmitted: boolean = false; //this is for avoiding submit form more than once
  Email: string = 'Adlin@gmail.com';
  canExit() {
    if (this.form.form.dirty) {
      let userResponse = confirm(
        'فرم تکمیل نشده است! آیا از ارسال درخواست خود منصرف شده اید؟'
      );
      if (userResponse) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  } // for deactivate route guard
  onSubmit() {
    alert('نظر شما با موفقیت ثبت شد.');
    this.form.form.reset();
    this.alreadySubmitted = true;
  }
}
