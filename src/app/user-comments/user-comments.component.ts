import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormatDateTimePipe } from "../pipes/format-date-time.pipe";
import { Router, RouterModule } from '@angular/router';
import { UserComment } from '../models/UserComment';
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
  selector: 'app-user-comments',
  standalone: true,
  imports: [FormatDateTimePipe, RouterModule, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.css'
})
export class UserCommentsComponent implements OnInit {
  public userComments: UserComment[] = []
  public successMessages: string[] = []
  public showMessage: boolean = false
  public apiErrorMessage: string = ''
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.userService.getComments().subscribe(data => {
      if (Array.isArray(data)) {
        this.userComments = data as UserComment[];
      } else {
        this.userComments = [];
      }
    });
  }
  deleteComment(postId: string, commentId: string) {
    this.userService.deleteComment(postId, commentId).subscribe(data => {
      if (data.statusCode === 200) {
        this.userComments = this.userComments.filter(comment => comment.comment._id !== commentId);
        this.showMessage = true;
        this.successMessages[0] = "Succesful Deletion";
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
    })
  }
}
