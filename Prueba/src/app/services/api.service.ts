import { PreloadAllModules } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://jsonplaceholder.typicode.com';

 
  constructor(private http: HttpClient) { }

  getPost() {
    return this.http.get(`${this.url}/posts`);
  }
}
