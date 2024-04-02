import { Component, OnInit, inject } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { Blog } from '../services/models/blog';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  blogService: BlogsService = inject(BlogsService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  searchedBlog: string = ''; //get searchBox value that exist in main page
  blogs: Blog[] = [];
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchedBlog = data.get('search');
    });
    if (
      this.searchedBlog == null ||
      this.searchedBlog == undefined ||
      this.searchedBlog == ''
    ) {
      this.blogs = this.activeRoute.snapshot.data['Blogs'];
    } else {
      this.blogs = this.blogService.blogs.filter((b) =>
        b.title.toLowerCase().includes(this.searchedBlog.toLowerCase())
      );
    }
  }
  isInputFocused: boolean = false; //this is for updating value of number of shown blogs in the page after filtering
  searchBlog(eve: any) {
    let inputValue = eve.target.value;
    this.searchedBlog = eve.target.value;
    if (inputValue == '') {
      this.blogs = this.blogService.blogs;
    } else {
      this.blogs = this.blogService.blogs.filter((c) =>
        c.title.includes(inputValue)
      );
      this.isInputFocused = true;
    }
  }
  sort(eve: any) {
    let inputValue = eve.target.value;
    switch (inputValue) {
      case 'جدیدترین':
        this.blogs = this.blogService.blogs.reverse();
        break;
      case 'پربازدیدترین':
        this.blogs = this.blogService.blogs.sort(
          (c1, c2) => c2.viewer - c1.viewer
        );
        break;
      case 'مورد پسندترین':
        this.blogs = this.blogService.blogs.sort(
          (c1, c2) => c2.liked - c1.liked
        );
    }
  }
  filter(eve: any) {
    let inputValue = eve.target.value;
    if (inputValue == 'هیچکدام') {
      this.blogs = this.blogService.blogs;
      this.isInputFocused = false;
    } else {
      this.blogs = this.blogService.blogs.filter((c) =>
        c.categories.includes(inputValue)
      );
      this.isInputFocused = true;
    }
  }
}
