import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { FormFocusNextDirective } from '../../../directives/form-focus-next.directive';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent,FormFocusNextDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  forumPostForm: FormGroup
  apiErrorMessage: string = ''
  constructor(private postService: PostService,private router: Router) {
    this.forumPostForm = new FormGroup({
      topic: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      additionalInfo: new FormControl(''),
    })
  }
  createPost(){
    if (this.forumPostForm.invalid) {
      return;
    }
    this.postService.createPost(this.forumPostForm.value).subscribe(response => {
      if (response.statusCode === 200) {
        this.apiErrorMessage = '';
        this.router.navigate(['all']);
      } else {
        this.apiErrorMessage = response.message;
      }
    })
  }
}

