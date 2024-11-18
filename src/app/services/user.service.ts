import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  getAllUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl + '/user/all');
  }
}
