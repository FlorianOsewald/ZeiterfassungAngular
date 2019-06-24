import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {

private baseUrl = 'http://localhost:8080/api/workdays';

constructor(private http: HttpClient) { }

getWorkdayList(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}

getWorkdayByUser(username: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${username}`);
}

getWorkdayTodayByUser(username: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/username/${username}`);
}

updateWorkday(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}/${id}`, value);
}

createWorkday(workday: Object): Observable<Object> {
  return this.http.post(`${this.baseUrl}` + `/create`, workday);
}

deleteWorkday(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

}
