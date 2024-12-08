import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { interval } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule,NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isAuthenticated = signal<boolean>(false);
  authenticatedUserMessage = signal<string>('');
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.checkAuthentication();
    interval((5000)).subscribe(() => { this.checkAuthentication() });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home') {
          this.checkAuthentication();
        }
      }
    });
  }
  navigateToCreate(endpoint: string): void {
    this.router.navigate([endpoint]);
  }
  logout() {
    this.userService.logout().subscribe(() => this.checkAuthentication());
    this.router.navigate(['home']);
  }
  checkAuthentication() {
    this.userService.isAuthenticated().subscribe(data => {
      if (data.statusCode === 200) {
        this.isAuthenticated.set(true);
        this.authenticatedUserMessage.set(data.message);
      } else {
        this.isAuthenticated.set(false);
        this.authenticatedUserMessage.set('');
      }
    });
  }
}
