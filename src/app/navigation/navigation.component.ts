import { Component, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isAuthenticated : WritableSignal<boolean> = signal(false)
  intervalId: any;
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe(data => this.isAuthenticated.set(data))
    interval((1000)).subscribe(() => {this.userService.isAuthenticated().subscribe(data => this.isAuthenticated.set(data))});
  }
  navigateToCreate(endpoint: string): void {
    this.router.navigate([endpoint]);
  }
}
