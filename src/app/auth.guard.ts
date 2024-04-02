import { inject } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CoursesService } from './services/courses.service';
import { BlogsService } from './services/blogs.service';
import { TeachersService } from './services/teachers.service';
import { PaymentPageComponent } from './payment-page/payment-page.component';
export const canActivePaymentPage = () => {
  const user: UsersService = inject(UsersService);
  let router = inject(Router);
  if (user.isUserLogged) {
    return true;
  }
  router.navigateByUrl('/Login');
  return false;
}; //if user doesn't logged in, forces until user logged in
export const canDeactivateContactComponent = (comp: ContactComponent) => {
  return comp.canExit();
}; //if form isn't completed show an confirm message
export const canDeactivatePaymentComponent = (comp: PaymentPageComponent) => {
  return comp.canExit();
}; //if form isn't completed show an confirm message
export const resolveForCoursesComp = () => {
  const coursesService: CoursesService = inject(CoursesService);
  return coursesService.getAllCourses();
}; //if data isn't loaded completely
export const resolveForBlogsComp = () => {
  const blogsServices: BlogsService = inject(BlogsService);
  return blogsServices.getAllBlogs();
}; //if data isn't loaded completely
export const resolveForTeachersComp = () => {
  const teacherServices: TeachersService = inject(TeachersService);
  return teacherServices.getAllTeachers();
}; //if data isn't loaded completely
