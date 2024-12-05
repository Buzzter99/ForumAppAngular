import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/ApiResponse';
import { ForumPost } from '../../shared/models/ForumPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) { }
  createPost(data: { topic: string, description: string, additionalInfo: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/forum/add`, data, { withCredentials: true });
  }
  getAllPosts(): Observable<ForumPost[] | ApiResponse> {
    return this.httpClient.get<ForumPost[] | ApiResponse>(`${environment.apiUrl}/forum/all`, { withCredentials: true });
  }
  getSinglePost(id: string): Observable<ForumPost | ApiResponse> {
    return this.httpClient.get<ForumPost | ApiResponse>(`${environment.apiUrl}/forum/${id}`, { withCredentials: true });
  }
  addComment(postId: string, msg: string): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/forum/addComment`, { postId, msg }, { withCredentials: true });
  }
  deletePost(postId: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${environment.apiUrl}/forum/all/${postId}`, { withCredentials: true });
  }
  editPost(postId: string, data: { topic: string, description: string, additionalInfo: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/forum/edit/${postId}`,data, { withCredentials: true });
  }
  likePost(postId: string): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/forum/like/${postId}`, {}, { withCredentials: true });
  }
}
