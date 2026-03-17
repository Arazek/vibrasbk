import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, Role, Level } from '@shared/types';

const TOKEN_KEY = 'auth_token';

export interface RegisterPayload {
  alias: string;
  email: string;
  password: string;
  role: Role;
  level: Level;
  styles: string[];
  academyId?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register`, payload).pipe(
      tap((res) => localStorage.setItem(TOKEN_KEY, res.accessToken))
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, { email, password }).pipe(
      tap((res) => localStorage.setItem(TOKEN_KEY, res.accessToken))
    );
  }

  logout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}
