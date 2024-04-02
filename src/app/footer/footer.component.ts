import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  communication = [
    {
      img: '../../assets/images/youtube-svgrepo-com.svg',
      title: 'کانال یوتیوب',
    },
    {
      img: '../../assets/images/instagram-1-svgrepo-com.svg',
      title: 'صفحه اینستاگرام',
    },
    {
      img: '../../assets/images/linkedin-network-communication-connection-internet-online-svgrepo-com.svg',
      title: 'لینکدین',
    },
    {
      img: '../../assets/images/telegram-logo-svgrepo-com.svg',
      title: 'کانال تلگرام',
    },
    {
      img: '../../assets/images/email-message-mail-envelope-svgrepo-com.svg',
      title: 'ایمیل',
    },
  ]; //for communicate ways icons
  links = [
    { link: '/courses', title: 'دوره ها' },
    { link: '/Blogs', title: 'بلاگ ها' },
    { link: '/Teachers', title: 'اساتید و همکاران ما' },
    { link: '/Contact', title: 'ارتباط با ما' },
    { link: '/Login', title: 'ورود' },
    { link: '/Login', title: 'ثبت نام' },
    { link: '/Home', title: 'صفحه اصلی' },
    { link: 'Home', title: 'دوره های محبوب', fragment: 'PopularCourses' },
    { link: 'Home', title: 'بلاگ های اخیر', fragment: 'RecentBlogs' },
    { link: 'Home', title: 'اساتید و همکاران ما', fragment: 'OurColleague' },
  ];
  @ViewChild('newsletter') inputValue: ElementRef;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.activeRoute.fragment.subscribe((data) => {
      this.goToFragment(data);
    });
  }
  goToFragment(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
  showNotification: boolean = false;
  signupNewsletter() {
    if (this.inputValue.nativeElement.value == '') {
      alert('لطفا ایمیل معتبر وارد کنید!');
    } else {
      this.showNotification = true;
      this.inputValue.nativeElement.value = '';
      setTimeout(() => {
        this.showNotification = false;
      }, 6000);
    }
  }
}
