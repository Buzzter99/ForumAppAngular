import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();
  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[] | ApiResponse> {
    return this.httpClient.get<User[] | ApiResponse>(environment.apiUrl + '/user/all');
  }
  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<ApiResponse>(`${environment.apiUrl}/user/isAuthenticated`, { withCredentials: true })
      .pipe(map(response => {
        if (response.statusCode === 200) {
          this.authenticatedSubject.next(true);
          return true;
        } else {
          this.authenticatedSubject.next(false);
          return false;
        }
      }));
  }
}
