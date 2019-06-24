import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  CreateUser(user: Object) : Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, user);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/username/}${username}`);
  }
}
