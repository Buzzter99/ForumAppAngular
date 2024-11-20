import { Component, Input, OnInit, Signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUsers: User[] = [];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      if (Array.isArray(data)) {
        this.currentUsers = data as User[];
      }
    });
  }
}
