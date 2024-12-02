import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../models/User';
import { ApiResponse } from '../models/ApiResponse';
import { UserComment } from '../models/UserComment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[] | ApiResponse> {
    return this.httpClient.get<User[] | ApiResponse>(environment.apiUrl + '/user/all');
  }
  isAuthenticated(): Observable<ApiResponse | null> {
    return this.httpClient.get<ApiResponse>(`${environment.apiUrl}/user/isAuthenticated`, { withCredentials: true })
      .pipe(map(response => {
        return response.statusCode === 200 ? response : null;
      }));
  }
  login(credentials: { email: string, password: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/login`, credentials, { withCredentials: true });
  }
  logout(): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/logout`, {}, { withCredentials: true });
  }
  register(data : { username: string, email: string, password: string, repeatPassword: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/register`, data);
  }
  getComments(): Observable<ApiResponse | UserComment[]> {
    return this.httpClient.get<ApiResponse | UserComment[]>(`${environment.apiUrl}/user/comments`, { withCredentials: true });
  }
  deleteComment(postId: string, commentId: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${environment.apiUrl}/user/comments/${postId}/${commentId}`, { withCredentials: true });
  }
  getCommentById(commentId: string): Observable<ApiResponse | Comment> {
    return this.httpClient.get<ApiResponse | Comment>(`${environment.apiUrl}/user/edit/comment/${commentId}`, { withCredentials: true });
  }

  editComment(commentId: string, msg: string): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/edit/comment/${commentId}`, msg, { withCredentials: true });
  }
}
