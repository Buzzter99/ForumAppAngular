import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormFocusNextDirective } from '../../../directives/form-focus-next.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent,FormFocusNextDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  apiErrorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(response => {
      if (response.statusCode === 200) {
        this.loginForm.reset();
        this.apiErrorMessage = '';
        this.router.navigate(['home']);
      } else {
        this.loginForm.controls['password'].reset();
        this.apiErrorMessage = response.message;
      }
    })
  }
}
