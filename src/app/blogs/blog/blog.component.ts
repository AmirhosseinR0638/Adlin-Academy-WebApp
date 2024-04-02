import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../services/models/blog';
import { NotFoundPageComponent } from '../../not-found-page/not-found-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NotFoundPageComponent,
    FormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  blogService: BlogsService = inject(BlogsService);
  allBlog: Blog[] = this.blogService.blogs;
  blogId: number;
  shownBlog: Blog;
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((value) => {
      this.blogId = +value.get('id');
      this.shownBlog = this.blogService.blogs.find((b) => b.id == this.blogId);//show blog based on courseId that exist in routerParameter
      this.slideIndex = 0;
      this.allBlog = this.blogService.blogs;
      this.likeSituation = 'none';
      window.scroll({ top: 90, behavior: 'smooth' });
    });
  }
  slideIndex: number = 0;
  nextSlide() {
    if (this.slideIndex != this.shownBlog.images.length - 1) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }
  }
  previousSlide() {
    if (this.slideIndex != 0) {
      this.slideIndex--;
    } else {
      this.slideIndex = this.shownBlog.images.length - 1;
    }
  }
  sendImageIndex(index: number) {
    this.slideIndex = index;
  } //send image index that hovered in blog
  likeSituation: string = 'none';
  likeBlog() {
    if (this.likeSituation == 'none') {
      this.shownBlog.liked++;
      this.likeSituation = 'liked';
    } else if (this.likeSituation == 'liked') {
      this.shownBlog.liked--;
      this.likeSituation = 'none';
    } else {
      this.likeSituation = 'liked';
      this.shownBlog.liked++;
      this.shownBlog.disliked--;
    }
  }
  dislikeBlog() {
    if (this.likeSituation == 'none') {
      this.shownBlog.disliked++;
      this.likeSituation = 'disliked';
    } else if (this.likeSituation == 'disliked') {
      this.shownBlog.disliked--;
      this.likeSituation = 'none';
    } else {
      this.likeSituation = 'disliked';
      this.shownBlog.liked--;
      this.shownBlog.disliked++;
    }
  }
}
