import { Component, OnInit, inject } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../services/models/course';
import { CourseComponent } from './course/course.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseComponent, RouterLink, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courseService: CoursesService = inject(CoursesService);
  courses: Course[] = [];
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  searchedCourse: string = ''; //for get value of searchBox in first page
  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchedCourse = data.get('search');
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    if (
      this.searchedCourse == null ||
      this.searchedCourse == undefined ||
      this.searchedCourse == ''
    ) {
      this.courses = this.activeRoute.snapshot.data['courses'];
    } else {
      this.courses = this.courseService.courses.filter((c) =>
        c.title.toLowerCase().includes(this.searchedCourse.toLowerCase())
      );
    }
  }
  isInputFocused: boolean = false; //this is for updating value of number of shown blogs in the page after filtering
  searchCourse(event: any) {
    this.isInputFocused = true;
    if (event.target.value !== '') {
      this.courses = this.courses.filter((c) =>
        c.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      this.isInputFocused = false;
      this.courses = this.courseService.courses;
    }
  }
  sortCourse(event: any) {
    const inputValue = event.target.value;
    switch (inputValue) {
      case 'mostExpensive':
        this.courses = this.courses.sort(
          (a, b) => b.priceWithDiscount - a.priceWithDiscount
        );
        break;
      case 'leastExpensive':
        this.courses = this.courses.sort(
          (a, b) => a.priceWithDiscount - b.priceWithDiscount
        );
        break;
      case 'mostPopular':
        this.courses = this.courses.sort(
          (a, b) => b.satisfaction - a.satisfaction
        );
    }
  }
  filterCourses(event: any) {
    const inputValue = event.target.value;
    this.courses = this.courseService.courses;
    if (inputValue != 'هیچکدام') {
      this.courses = this.courses.filter((c) =>
        c.categories.includes(inputValue)
      );
      this.isInputFocused = true;
    } else {
      this.isInputFocused = false;
    }
  }
}
