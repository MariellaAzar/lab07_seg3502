import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Url = 'http://localhost:8080/books-api/';

export interface AuthorDetails {
  id: number;
  firstName: string;
  lastName: string;
  books?: { title: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private http: HttpClient = inject(HttpClient);

  public getAuthor(id: string): Observable<AuthorDetails> {
    return this.http.get<AuthorDetails>(Url + 'authors/' + id);
  }
}
