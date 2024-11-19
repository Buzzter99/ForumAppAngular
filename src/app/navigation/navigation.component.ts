import { Component, OnInit, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.authenticated$.subscribe(data => {
      this.isAuthenticated = data;
    })
    setInterval(() => {
      this.userService.authenticated$.subscribe(data => {
        this.isAuthenticated = data;
      });
    }, 5000);
  }
  navigateToCreate(endpoint: string): void {
    this.router.navigate([endpoint]);
  }
}
