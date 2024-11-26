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

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(data => {
      if (data.statusCode === 200) {
        this.posts = this.posts.filter(post => post._id !== postId);
        alert(data.message);
      } else {
        alert(data.message);
      }
    });
    this.posts = this.posts.filter(post => post._id !== postId);
  }
}
