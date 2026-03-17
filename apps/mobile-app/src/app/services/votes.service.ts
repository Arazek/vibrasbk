import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IntentionVote, VoteStatus } from '@shared/types';

@Injectable({ providedIn: 'root' })
export class VotesService {
  private readonly base = `${environment.apiUrl}/votes`;

  constructor(private http: HttpClient) {}

  castVote(eventId: string, status: VoteStatus): Observable<IntentionVote> {
    return this.http.post<IntentionVote>(this.base, { eventId, status });
  }

  updateVote(voteId: string, status: VoteStatus): Observable<IntentionVote> {
    return this.http.patch<IntentionVote>(`${this.base}/${voteId}`, { status });
  }

  verifyAttendance(eventId: string, isoWeek: string, attended: boolean): Observable<unknown> {
    return this.http.post(`${this.base}/verify`, { eventId, isoWeek, attended });
  }
}
