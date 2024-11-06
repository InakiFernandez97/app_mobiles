import { PreloadAllModules } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/posts';

 
  constructor(private http: HttpClient) { }
  
  getPosts() {
    return this.http.get(`${this.apiUrl}`);
    }
  getPost(rut: string) {
    return this.http.get(`${this.apiUrl}/${rut}`);
    }
  createPost(post: any) {
    return this.http.post(this.apiUrl, post);
    }
  updatePost(rut: string, post: any) {
    return this.http.put(`${this.apiUrl}/${rut}`, post);
    }
  deletePost(rut: string) {
    return this.http.delete(`${this.apiUrl}/${rut}`);
    }
      
  
}
