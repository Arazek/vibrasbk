import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, City } from '@shared/types';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly url = `${environment.apiUrl}/countries`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }

  getCitiesByCountry(countryId: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.url}/${countryId}/cities`);
  }
}
