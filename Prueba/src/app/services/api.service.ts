import { PreloadAllModules } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://api.timezonedb.com/v2.1/get-time-zone?key=21JI1J9I6TF2&format=json&by=zone&zone=America/Santiago';

 
  constructor(private http: HttpClient) { }

  obtenerFechaChile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
