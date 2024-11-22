import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[] | ApiResponse> {
    return this.httpClient.get<User[] | ApiResponse>(environment.apiUrl + '/user/all');
  }
  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<ApiResponse>(`${environment.apiUrl}/user/isAuthenticated`, { withCredentials: true })
      .pipe(map(response => {
        return response.statusCode === 200 ? true : false
      }));
  }
  login(credentials: User) : Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/login`,credentials ,{ withCredentials: true });
  }
}
