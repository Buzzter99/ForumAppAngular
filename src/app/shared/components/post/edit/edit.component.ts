import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { FormFocusNextDirective } from '../../../directives/form-focus-next.directive';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent,FormFocusNextDirective],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  forumPostForm: FormGroup
  apiErrorMessage: string = ''
  constructor(private postService: PostService,private route: ActivatedRoute, private router: Router) {
    this.forumPostForm = new FormGroup({
      topic: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      additionalInfo: new FormControl(''),
    })
   }
  ngOnInit(): void {
    this.postService.getSinglePost(this.route.snapshot.params['id']).subscribe(data => {
      if ('_id' in data) {
        if(!data.isOwner){
          this.router.navigate(['404']);
        }
        this.forumPostForm.patchValue(data);
      } else {
        this.router.navigate(['404']);
      }
    });
  }
  editPost(){
    if(!this.forumPostForm.valid){
      return;
    }
    this.postService.editPost(this.route.snapshot.params['id'], this.forumPostForm.value).subscribe(response => {
      if (response.statusCode === 200) {
        this.apiErrorMessage = '';
        this.router.navigate(['all']);
      } else {
        this.apiErrorMessage = response.message;
      }
    })

  }
}
