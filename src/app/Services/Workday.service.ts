import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkday } from '../DataStructures/IWorkday';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {

private baseUrl = 'http://localhost:4200/api/workdays';

constructor(private http: HttpClient) { }

getWorkdayList(): Observable<IWorkday[]> {
  return this.http.get<IWorkday[]>(`${this.baseUrl}`);
}

getWorkdayByUser(username: string): Observable<IWorkday[]> {
  return this.http.get<IWorkday[]>(`${this.baseUrl}/${username}`);
}

getWorkdayTodayByUser(username: string): Observable<IWorkday> {
  return this.http.get<IWorkday>(`${this.baseUrl}/username/${username}`);
}

updateWorkday(id: number, value: any): Observable<IWorkday> {
  return this.http.put<IWorkday>(`${this.baseUrl}/${id}`, value);
}

createWorkday(workday: Object): Observable<IWorkday> {
  return this.http.post<IWorkday>(`${this.baseUrl}` + `/create`, workday);
}

deleteWorkday(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

}
