import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ApiResponse } from '../../models/ApiResponse';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  isAuthenticated = signal(null as ApiResponse | null);
  constructor(private router: Router,private userService: UserService) { }
  ngOnInit(): void {
    this.checkAuthentication();
  }
  navigateToPage(pageName: string) {
    this.router.navigate([pageName]);
  }
  checkAuthentication() {
    this.userService.isAuthenticated().subscribe(data => this.isAuthenticated.set(data));
  }
}
