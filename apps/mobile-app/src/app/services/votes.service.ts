import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IntentionVote, VoteEstado } from '@shared/types';

@Injectable({ providedIn: 'root' })
export class VotesService {
  private readonly base = `${environment.apiUrl}/votes`;

  constructor(private http: HttpClient) {}

  castVote(eventId: string, estado: VoteEstado): Observable<IntentionVote> {
    return this.http.post<IntentionVote>(this.base, { eventId, estado });
  }

  updateVote(voteId: string, estado: VoteEstado): Observable<IntentionVote> {
    return this.http.patch<IntentionVote>(`${this.base}/${voteId}`, { estado });
  }

  verifyAttendance(eventId: string, semanaIso: string, asistio: boolean): Observable<unknown> {
    return this.http.post(`${this.base}/verify`, { eventId, semanaIso, asistio });
  }
}
