import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfile, Level } from '@shared/types';

export interface UpdateProfilePayload {
  level?: Level;
  styles?: string[];
  academyId?: string;
  fcmToken?: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly base = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.base}/profile`);
  }

  updateProfile(payload: UpdateProfilePayload): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${this.base}/profile`, payload);
  }
}
