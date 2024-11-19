import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  isAuthenticated : boolean = false;
  constructor(private router: Router,private userService: UserService) {
   }
  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe(data => this.isAuthenticated = data);
  }
 navigateToCreate(endpoint: string) : void {
  this.router.navigate([endpoint]);
}
}
