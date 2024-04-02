import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../services/models/course';
import { Blog } from '../services/models/blog';
import { BlogsService } from '../services/blogs.service';
import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../services/models/teacher';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, FormsModule],
  providers: [CoursesService, BlogsService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  searchedText: string = '';
  courseService: CoursesService = inject(CoursesService);
  popularCourses: Course[] = this.courseService.courses.filter(
    (course) => course.satisfaction >= 80
  );
  blogService: BlogsService = inject(BlogsService);
  latestBlog: Blog[] = this.blogService.blogs.reverse().slice(0, 3);
  teacherService: TeachersService = inject(TeachersService);
  displayOfTeachers: Teacher[] = this.teacherService.teachers.slice(0, 4);
}
