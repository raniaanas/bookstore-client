import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
  })

export class CategoryService {

    private apiUrl = `${environment.apiUrl}/categories`;
    constructor(private http: HttpClient) {}

    getCategories(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    getCategoryById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
  
    addCategory(category: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, category);
    }
  
    updateCategory(id: number, category: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${id}`, category);
    }
  
    deleteCategory(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
  
}