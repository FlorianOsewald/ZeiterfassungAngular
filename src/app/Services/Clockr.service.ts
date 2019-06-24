import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { User } from '../DataStructures/User';
import { Clockr } from '../DataStructures/Clockr';
import 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import { IClockr } from '../DataStructures/IClockr';

@Injectable({
  providedIn: 'root'
})
export class ClockrService {

  private baseUrl = 'http://localhost:8080/api/clockr';

  constructor(private http: HttpClient) { }

  createClockr(clockr: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, clockr);
  }

  getClockrList(): Observable<Array<IClockr>> {
    return this.http.get<Array<IClockr>>(`${this.baseUrl}`);
  }

  getClockrByUser(user: number): Observable<IClockr[]> {
    return this.http.get<IClockr[]>(`${this.baseUrl}/user/${user}`);
  }

}
