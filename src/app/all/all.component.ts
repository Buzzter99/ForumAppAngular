import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ForumPost } from '../models/ForumPost';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent implements OnInit {
  public posts: ForumPost[] = [];
constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data =>{
      if (Array.isArray(data)) {
        this.posts = data as ForumPost[];
      }
    });
  }
}
