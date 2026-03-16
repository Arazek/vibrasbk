import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeeklyEvent, EventAnalytics } from '@shared/types';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly base = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getWeeklyEvents(tipo?: string): Observable<WeeklyEvent[]> {
    const params = tipo ? { params: { tipo } } : {};
    return this.http.get<WeeklyEvent[]>(`${this.base}/week`, params);
  }

  getEventDetail(id: string): Observable<WeeklyEvent> {
    return this.http.get<WeeklyEvent>(`${this.base}/${id}`);
  }

  getAnalytics(id: string): Observable<EventAnalytics> {
    return this.http.get<EventAnalytics>(`${this.base}/${id}/analytics`);
  }
}
