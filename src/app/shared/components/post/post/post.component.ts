import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { ForumPost } from '../../../models/ForumPost';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { FormatDateTimePipe } from "../../../pipes/format-date-time.pipe";
import { NgClass } from '@angular/common';
import { FormFocusNextDirective } from '../../../directives/form-focus-next.directive';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent, FormatDateTimePipe,NgClass,FormFocusNextDirective],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  singlePost: ForumPost = {} as ForumPost;
  commentForm = new FormGroup({
    msg: new FormControl('', [Validators.required]),
  });
  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.fetchSinglePost();
  }
  addComment() {
    if (this.commentForm.invalid) {
      return;
    }
    this.postService.addComment(this.route.snapshot.params['id'], this.commentForm.value.msg as string).subscribe(response => {
      if (response.statusCode === 200) {
        this.commentForm.reset();
        this.fetchSinglePost();
      }
    })

  }
  fetchSinglePost() {
    this.postService.getSinglePost(this.route.snapshot.params['id']).subscribe(data => {
      if ('_id' in data) {
        this.singlePost = data as ForumPost;
      } else {
        this.router.navigate(['404']);
      }
    });
  }
  toggleLike() {
    this.postService.likePost(this.route.snapshot.params['id']).subscribe(response => {
      if (response.statusCode === 200) {
        this.singlePost.isLiked = !this.singlePost.isLiked;
      }
    })
  }
}
