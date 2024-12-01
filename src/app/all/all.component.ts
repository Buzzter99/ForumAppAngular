import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ForumPost } from '../models/ForumPost';
import { RouterModule } from '@angular/router';
import { FormatDateTimePipe } from "../pipes/format-date-time.pipe";
import { SuccessMessageComponent } from "../success-message/success-message.component";
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [RouterModule, FormatDateTimePipe, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent implements OnInit {
  public posts: ForumPost[] = [];
  public successMessages: string[] = [];
  public showMessage: boolean = false;
  public apiErrorMessage: string = '';
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
        this.showMessage = true;
        this.successMessages[0] = "Succesful Deletion!";
        this.successMessages[1] = data.message;
        setTimeout(() => {
          this.showMessage = false;
          this.successMessages = [];
        }, 3000);
      } else {
        this.apiErrorMessage = data.message;
        setTimeout(() => {
          this.apiErrorMessage = '';
        }, 3000);
      }
    });
  }
}
