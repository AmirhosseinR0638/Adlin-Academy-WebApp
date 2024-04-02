import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CoursesComponent } from './courses/courses.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CourseComponent } from './courses/course/course.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import {
  canActivePaymentPage,
  canDeactivateContactComponent,
  canDeactivatePaymentComponent,
  resolveForBlogsComp,
  resolveForCoursesComp,
  resolveForTeachersComp,
} from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  { path: 'Home', component: MainComponent, title: 'صفحه اصلی' },
  {
    path: 'courses',
    component: CoursesComponent,
    resolve: { courses: resolveForCoursesComp },
    title: 'دوره ها',
  },
  {
    path: 'courses',
    children: [
      { path: 'course/:id', component: CourseComponent, title: `اطلاعات دوره` }, //course detail
      {
        path: 'course/:id/payment',
        component: PaymentPageComponent,
        canActivate: [canActivePaymentPage],
        canDeactivate: [canDeactivatePaymentComponent],
        title: 'درگاه پرداخت',
      },
    ],
  },
  {
    path: 'Blogs',
    component: BlogsComponent,
    resolve: { Blogs: resolveForBlogsComp },
    title: 'بلاگ ها',
  },
  {
    path: 'Blogs',
    children: [{ path: 'blog/:id', component: BlogComponent, title: 'بلاگ' }],
  },
  {
    path: 'Teachers',
    component: TeachersComponent,
    resolve: { teachers: resolveForTeachersComp },
    title: 'اساتید و همکاران',
  },
  {
    path: 'Contact',
    component: ContactComponent,
    canDeactivate: [canDeactivateContactComponent],
    title: 'ارتباط با ما',
  },
  { path: 'Login', component: LoginComponent, title: 'ورود یا ثبت نام' },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'صفحه مورد نظر یافت نشد!',
  },
];
export class routerClass {}
