import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../services/models/course';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotFoundPageComponent } from '../../not-found-page/not-found-page.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [NotFoundPageComponent, RouterLink],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit, OnDestroy {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  courseService: CoursesService = inject(CoursesService);
  courseId: number;
  shownCourse: Course;
  paramObservable;
  recommendedCourse: Course[];
  ngOnInit(): void {
    this.paramObservable = this.activeRoute.paramMap.subscribe((param) => {
      this.courseId = +param.get('id');
      this.shownCourse = this.courseService.courses.find(
        (c) => c.id == this.courseId
      ); //show course based on courseId that exist in routerParameter
      window.scrollTo({ top: 95, behavior: 'smooth' });
      let randomIndex = Math.floor(Math.random() * 10);
      this.recommendedCourse = this.courseService.courses
        .filter((c) => c.satisfaction >= 60)
        .slice(randomIndex, randomIndex + 3);
    });
  }
  ngOnDestroy(): void {
    this.paramObservable.unsubscribe();
  }
}
