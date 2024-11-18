import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userCount: number = 0;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.userCount = users.length;
    });
  }
}
