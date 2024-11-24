import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) { }
  createPost(data: { topic: string, description: string, additionalInfo: string }): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}/forum/add`, data, { withCredentials: true });
  }
}
