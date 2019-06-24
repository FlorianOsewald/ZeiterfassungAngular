import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyEventDto } from '../DataStructures/DailyEventDto';

@Injectable({
  providedIn: 'root'
})
export class DailyEventService {

  private baseUrl = 'http://localhost:8080/api/dailyEvents';

  constructor(private http: HttpClient) { }

  createDailyEvent(dailyEvent: Object, workday: Object): Observable<Object> {
    const dto = new DailyEventDto();
    dto.event = dailyEvent;
    dto.workday = workday;
    return this.http.post(`${this.baseUrl}` + `/create`, dto);
  }

  updateDailyEvent(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDailyEvent(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDailyEventsOfWorkday(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}` + `/workday/${id}`);
  }

  deleteDailyEventsOfWorkday(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/workday/${id}`);
  }
}
