import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { ValidatorService } from '../../../../core/services/validator.service';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormFocusNextDirective } from '../../../directives/form-focus-next.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent,FormFocusNextDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  apiErrorMessage: string = '';
  registerForm: FormGroup
  constructor(private validatorService: ValidatorService,private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    },
      {
        validators: this.validatorService.passwordMatch('password', 'repeatPassword')
      });
  }
  registerUser() {
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value).subscribe(response => {
      if (response.statusCode === 201 || response.statusCode === 200) {
        this.registerForm.reset();
        this.apiErrorMessage = '';
        this.router.navigate(['login']);
      } else {
        this.registerForm.controls['password'].reset();
        this.registerForm.controls['repeatPassword'].reset();
        this.apiErrorMessage = response.message;
      }
    })
  }
}
