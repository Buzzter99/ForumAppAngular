import { Component, OnInit } from '@angular/core';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../services/validator.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SuccessMessageComponent } from "../success-message/success-message.component";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ErrorMessageComponent, ReactiveFormsModule, SuccessMessageComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  public updateProfileForm: FormGroup
  public apiErrorMessage: string = '';
  public successMessage: string[] = [];
  public showMessage: boolean = false;
  constructor(private validatorService: ValidatorService,private userService: UserService,private router: Router) {
    this.updateProfileForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl('')
    }, {
      validators: [this.validatorService.allOrNoneValidator(['newPassword', 'confirmNewPassword', 'oldPassword']),
      this.validatorService.passwordMatch('newPassword', 'confirmNewPassword')]
    })
  }
  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((data) => {
      if ('_id' in data) {
        this.updateProfileForm.patchValue(data);
      } else {
        this.router.navigate(['404']);
      }
    })
  }
  updateProfile() {
    if (!this.updateProfileForm.valid) {
      return;
    }
    this.userService.updateAccount(this.updateProfileForm.value).subscribe(response => {
      if (response.statusCode === 200) {
        this.apiErrorMessage = '';
        this.showMessage = true;
        this.successMessage[0] = "Succesful Update of Account. You will be logged out.";
        this.successMessage[1] = response.message;
        setTimeout(() => {
          this.showMessage = false;
          this.successMessage = [];
          this.userService.logout().subscribe(() => this.router.navigate(['home']))
        }, 4000);
      } else {
        this.apiErrorMessage = response.message;
        setTimeout(() => {
          this.apiErrorMessage = '';
        }, 3000);
      }
    })
  }
}

