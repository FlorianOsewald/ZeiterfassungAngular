import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyEventDto } from '../DataStructures/DailyEventDto';
import { IDailyEvent } from '../DataStructures/IDailyEvent';

@Injectable({
  providedIn: 'root'
})
export class DailyEventService {

  private baseUrl = 'http://localhost:4200/api/dailyEvents';

  constructor(private http: HttpClient) { }

  createDailyEvent(dailyEvent: Object, workday: Object): Observable<IDailyEvent> {
    const dto = new DailyEventDto();
    dto.event = dailyEvent;
    dto.workday = workday;
    return this.http.post<IDailyEvent>(`${this.baseUrl}` + `/create`, dto);
  }

  updateDailyEvent(id: number, value: any): Observable<IDailyEvent> {
    return this.http.put<IDailyEvent>(`${this.baseUrl}/${id}`, value);
  }

  deleteDailyEvent(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDailyEventsOfWorkday(id: number): Observable<IDailyEvent[]> {
    return this.http.get<IDailyEvent[]>(`${this.baseUrl}` + `/workday/${id}`);
  }

  deleteDailyEventsOfWorkday(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/workday/${id}`);
  }

}
