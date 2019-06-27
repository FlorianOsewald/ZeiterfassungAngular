import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../DataStructures/IUser';
import { User } from '../DataStructures/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsersList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}`);
  }

  CreateUser(user: Object) : Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}` + `/create`, user);
  }

  updateUser(id: number, value: any): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/${id}`, value);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/username/}${username}`);
  }

  postUserToLogIn(user: User) : Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + '/login', user);
  }

  logUserOut() : Observable<any> {
    return this.http.post(this.baseUrl + '/logout', null);
  }
}
