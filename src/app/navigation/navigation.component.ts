import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isAuthenticated = signal(null as ApiResponse | null);
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe(data => this.isAuthenticated.set(data));
    interval((1000)).subscribe(() => { this.userService.isAuthenticated().subscribe(data => this.isAuthenticated.set(data)) });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home') {
          this.userService.isAuthenticated().subscribe(data => this.isAuthenticated.set(data));
        }
      }
    });
  }
  navigateToCreate(endpoint: string): void {
    this.router.navigate([endpoint]);
  }
  logout() {
    this.userService.logout().subscribe();
    this.isAuthenticated.set(null);
  }
}
