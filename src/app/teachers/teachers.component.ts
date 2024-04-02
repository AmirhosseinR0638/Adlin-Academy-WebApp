import { Component, OnInit, inject } from '@angular/core';
import { TeachersService } from '../services/teachers.service';
import { Teacher } from '../services/models/teacher';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  teachersService: TeachersService = inject(TeachersService);
  teachers: Teacher[] = [];
  followSituation: string = 'دنبال کردن'; //for changing number of followers and style of follow button
  ngOnInit(): void {
    this.teachers = this.activeRoute.snapshot.data['teachers'];
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  follow(index: number) {
    let mainElement = this.teachers.at(index);
    if (mainElement.isFollowed) {
      mainElement.isFollowed = false;
      mainElement.numbersOfFollowers--;
    } else {
      mainElement.isFollowed = true;
      mainElement.numbersOfFollowers++;
    }
  }
}
