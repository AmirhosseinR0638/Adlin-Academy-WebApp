import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
})
export class NotFoundPageComponent implements OnInit {
  activeRoute: Location = inject(Location);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  changeRoute() {
    this.activeRoute.back();
  } //return last successful navigation
}
