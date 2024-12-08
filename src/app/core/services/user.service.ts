import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/models/User';
import { ApiResponse } from '../../shared/models/ApiResponse';
import { UserComment } from '../../shared/models/UserComment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  getAllUsers(): Observable<User[] | ApiResponse> {
    return this.httpClient.get<User[] | ApiResponse>(environment.apiUrl + '/user/all');
  }
  isAuthenticated(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${environment.apiUrl}/user/isAuthenticated`, { withCredentials: true })
      .pipe(map(response => { return response; }));
  }
  login(credentials: { email: string, password: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/login`, credentials, { withCredentials: true });
  }
  logout(): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/logout`, {}, { withCredentials: true });
  }
  register(data: { username: string, email: string, password: string, repeatPassword: string }): Observable<ApiResponse> {
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
  getLoggedUser(): Observable<ApiResponse | User> {
    return this.httpClient.get<ApiResponse | User>(`${environment.apiUrl}/user/info`, { withCredentials: true });
  }
  updateAccount(data: { username: string, email: string, oldPassword: string, newPassword: string, confirmNewPassword: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/user/update`, data, { withCredentials: true });
  }
}
