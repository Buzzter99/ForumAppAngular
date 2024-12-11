import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { UserService } from '../../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFocusNextDirective } from '../../../directives/form-focus-next.directive';

@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent,FormFocusNextDirective],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css'
})
export class EditCommentComponent implements OnInit {
  editCommentForm: FormGroup
  apiErrorMessage: string = ''
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router) {
    this.editCommentForm = new FormGroup({msg: new FormControl('', [Validators.required])})
   }
  ngOnInit(): void {
    this.userService.getCommentById(this.route.snapshot.params['id']).subscribe(data => {
      if ('_id' in data && 'message' in data) {
        this.editCommentForm.setValue({msg: data.message});
      } else {
        this.router.navigate(['404']);
      }
    });
  }
  editComment() {
    if (this.editCommentForm.invalid) {
      return;
    }
    this.userService.editComment(this.route.snapshot.params['id'], this.editCommentForm.value).subscribe(response => {
      if (response.statusCode === 200) {
        this.apiErrorMessage = '';
        this.router.navigate(['comments']);
      } else {
        this.apiErrorMessage = response.message;
        setTimeout(() => {
          this.apiErrorMessage = '';
        }, 3000);
      }
    })
  }
}
