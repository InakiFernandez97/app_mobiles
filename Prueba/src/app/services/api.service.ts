import { PreloadAllModules } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'localhost:3000/post/1';

 
  constructor(private http: HttpClient) { }

  
}
