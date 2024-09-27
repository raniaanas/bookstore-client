import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from '../../environments/environment'; 

@Injectable({
    providedIn: 'root',
  })

export class AuthorService {

    private apiUrl = `${environment.apiUrl}/Authors`;
    
    constructor(private http: HttpClient) {}

    getAuthors(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
      }

      getAuthorById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
      }
    
      addAuthor(author: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, author);
      }
    
      updateAuthor(id: number, author: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, author);
      }
    
      deleteAuthor(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
      }
}