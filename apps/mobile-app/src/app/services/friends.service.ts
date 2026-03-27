import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Friend, FriendRequest } from '@shared/types';

export interface SendRequestPayload {
  identifier: string;
  identifierType: 'alias' | 'email';
}

export interface PendingCountResponse {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class FriendsService {
  private readonly base = `${environment.apiUrl}/friends`;

  constructor(private http: HttpClient) {}

  sendRequest(identifier: string, identifierType: 'alias' | 'email'): Observable<any> {
    return this.http.post(`${this.base}/request`, { identifier, identifierType });
  }

  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.base);
  }

  getReceivedRequests(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.base}/requests/received`);
  }

  getSentRequests(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.base}/requests/sent`);
  }

  getPendingCount(): Observable<number> {
    return this.http.get<number>(`${this.base}/requests/count`);
  }

  respondToRequest(id: string, action: 'accept' | 'reject'): Observable<any> {
    return this.http.patch(`${this.base}/${id}/respond`, { action });
  }

  removeFriend(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // TODO: inviteToApp(phone: string) — app not on Play Store yet
}
