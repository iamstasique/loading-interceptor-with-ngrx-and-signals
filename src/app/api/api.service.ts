import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getAll<T>(url: string): Observable<T[]> {
    return this.httpClient.get(url) as Observable<T[]>;
  }

  getOne<T>(url: string): Observable<T> {
    return this.httpClient.get(url) as Observable<T>;
  }
}
