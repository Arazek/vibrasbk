import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Venue, WeeklyEvent, EventType, DanceStyle, Academia } from '@shared/types';

export interface CreateVenuePayload {
  name: string;
  city?: string;
  lat?: number;
  lng?: number;
  maxCapacity?: number;
  styles?: string[];
}

export interface CreateEventPayload {
  venueId: string;
  type: EventType;
  dayOfWeek?: number;
  startTime?: string;
  name?: string;
  styles?: string[];
  startDate?: string;
  // Social
  workshopIncluded?: boolean;
  entryPrice?: number;
  instructors?: string[];
  // Intensive
  title?: string;
  level?: string;
  price?: number;
  endDate?: string;
  // Congress
  locality?: string;
  durationDays?: number;
  prices?: string;
  websiteUrl?: string;
}

export interface CreateDanceStylePayload { slug: string; name: string }
export interface CreateAcademiaPayload { name: string; city?: string }

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly venuesBase = `${environment.apiUrl}/venues`;
  private readonly eventsBase = `${environment.apiUrl}/events`;
  private readonly stylesBase = `${environment.apiUrl}/dance-styles`;
  private readonly academiasBase = `${environment.apiUrl}/academias`;

  constructor(private http: HttpClient) {}

  // ─── Venues ────────────────────────────────────────────────────────────────

  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.venuesBase);
  }

  createVenue(payload: CreateVenuePayload): Observable<Venue> {
    return this.http.post<Venue>(this.venuesBase, payload);
  }

  updateVenue(id: string, payload: Partial<CreateVenuePayload>): Observable<Venue> {
    return this.http.patch<Venue>(`${this.venuesBase}/${id}`, payload);
  }

  deleteVenue(id: string): Observable<void> {
    return this.http.delete<void>(`${this.venuesBase}/${id}`);
  }

  // ─── Events ────────────────────────────────────────────────────────────────

  getEvents(): Observable<WeeklyEvent[]> {
    return this.http.get<WeeklyEvent[]>(`${this.eventsBase}/week`);
  }

  createEvent(payload: CreateEventPayload): Observable<WeeklyEvent> {
    return this.http.post<WeeklyEvent>(this.eventsBase, payload);
  }

  updateEvent(id: string, payload: Partial<CreateEventPayload>): Observable<WeeklyEvent> {
    return this.http.patch<WeeklyEvent>(`${this.eventsBase}/${id}`, payload);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.eventsBase}/${id}`);
  }

  uploadEventPhoto(eventId: string, file: File): Observable<WeeklyEvent> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<WeeklyEvent>(`${this.eventsBase}/${eventId}/photo`, formData);
  }

  // ─── Dance Styles ──────────────────────────────────────────────────────────

  getDanceStyles(): Observable<DanceStyle[]> {
    return this.http.get<DanceStyle[]>(this.stylesBase);
  }

  createDanceStyle(payload: CreateDanceStylePayload): Observable<DanceStyle> {
    return this.http.post<DanceStyle>(this.stylesBase, payload);
  }

  updateDanceStyle(id: string, payload: Partial<CreateDanceStylePayload>): Observable<DanceStyle> {
    return this.http.patch<DanceStyle>(`${this.stylesBase}/${id}`, payload);
  }

  deleteDanceStyle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.stylesBase}/${id}`);
  }

  // ─── Academias ─────────────────────────────────────────────────────────────

  getAcademias(): Observable<Academia[]> {
    return this.http.get<Academia[]>(this.academiasBase);
  }

  createAcademia(payload: CreateAcademiaPayload): Observable<Academia> {
    return this.http.post<Academia>(this.academiasBase, payload);
  }

  updateAcademia(id: string, payload: Partial<CreateAcademiaPayload>): Observable<Academia> {
    return this.http.patch<Academia>(`${this.academiasBase}/${id}`, payload);
  }

  deleteAcademia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.academiasBase}/${id}`);
  }
}
