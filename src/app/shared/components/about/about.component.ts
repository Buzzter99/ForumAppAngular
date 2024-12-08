import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  isAuthenticated = signal<boolean>(false);
  constructor(private router: Router,private userService: UserService) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  navigateToPage(pageName: string) {
    this.router.navigate([pageName]);
  }
  checkAuthentication() {
    this.userService.isAuthenticated().subscribe(data => {
      if (data.statusCode === 200) {
        this.isAuthenticated.set(true);
      } else {
        this.isAuthenticated.set(false);
      }
    });
  }
}
