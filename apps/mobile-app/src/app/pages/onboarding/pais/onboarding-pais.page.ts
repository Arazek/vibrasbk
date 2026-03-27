import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonFooter,
  IonButton, IonProgressBar, IonSearchbar, IonList, IonItem,
  IonLabel, IonSpinner,
} from '@ionic/angular/standalone';
import { Country, City } from '@shared/types';
import { CountriesService } from '../../../services/countries.service';
import { OnboardingStateService } from '../../../services/onboarding-state.service';

function flagEmoji(code: string): string {
  const OFFSET = 0x1F1E6 - 'A'.charCodeAt(0);
  return code.toUpperCase().split('').map(c => String.fromCodePoint(c.charCodeAt(0) + OFFSET)).join('');
}

function distanceSq(lat1: number, lng1: number, lat2: number, lng2: number): number {
  return (lat1 - lat2) ** 2 + (lng1 - lng2) ** 2;
}

const CITY_RESULTS_LIMIT = 10;

@Component({
  selector: 'app-onboarding-pais',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonFooter,
    IonButton, IonProgressBar, IonSearchbar, IonList, IonItem, IonLabel, IonSpinner,
  ],
  styles: [`
    .question {
      font-size: var(--lgui-fs-display);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      margin-bottom: 0.25rem;
    }
    .subtitle {
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-xl);
    }

    /* ── Field label ── */
    .field-label {
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-3);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 0.5rem;
    }

    /* ── Selected row (collapsed state, like a form field) ── */
    .selected-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-sm);
      background: var(--lgui-surface-2);
      border: 1.5px solid var(--ion-color-primary);
      border-radius: var(--lgui-radius-default);
      padding: 0.875rem var(--lgui-pad-sm);
      margin-bottom: var(--lgui-gap-lg);
      cursor: pointer;
      transition: background var(--lgui-duration-fast) var(--lgui-ease-out);
    }
    .selected-row:active { background: var(--lgui-surface-3); }
    .selected-flag { font-size: 1.75rem; flex-shrink: 0; line-height: 1; }
    .selected-text { flex: 1; min-width: 0; }
    .selected-value {
      font-size: var(--lgui-fs-body-lg);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .selected-change {
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-semibold);
      color: var(--ion-color-primary);
      flex-shrink: 0;
      padding-left: var(--lgui-gap-xs);
    }

    /* ── Picker (open state) ── */
    .picker-block {
      margin-bottom: var(--lgui-gap-lg);
    }
    ion-searchbar {
      --border-radius: var(--lgui-radius-default);
      --box-shadow: none;
      --background: var(--lgui-surface-3);
      --color: var(--lgui-text-4);
      --placeholder-color: var(--lgui-text-2);
      padding: 0;
      margin-bottom: var(--lgui-gap-xs);
    }

    /* ── List wrapper: transparent so items own their bg ── */
    ion-list {
      --background: transparent;
      background: transparent;
      padding: 0;
    }

    /* ── List items ── */
    .country-item {
      --background: var(--lgui-surface-2);
      --background-activated: var(--lgui-surface-3);
      --background-focused: var(--lgui-surface-3);
      --color: var(--lgui-text-4);
      --border-radius: var(--lgui-radius-sm);
      --padding-start: var(--lgui-pad-sm);
      --inner-padding-end: var(--lgui-pad-sm);
      --min-height: 3.25rem;
      --border-color: transparent;
      margin-bottom: 0.125rem;
      cursor: pointer;
    }
    .city-item {
      --background: var(--lgui-surface-2);
      --background-activated: var(--lgui-surface-3);
      --background-focused: var(--lgui-surface-3);
      --color: var(--lgui-text-4);
      --border-radius: var(--lgui-radius-sm);
      --padding-start: var(--lgui-pad-sm);
      --inner-padding-end: var(--lgui-pad-sm);
      --min-height: 3rem;
      --border-color: transparent;
      margin-bottom: 0.125rem;
      cursor: pointer;
    }
    .flag { font-size: 1.5rem; margin-right: var(--lgui-gap-sm); flex-shrink: 0; }
    .country-name {
      font-size: var(--lgui-fs-body-lg);
      font-weight: var(--lgui-fw-medium);
      color: var(--lgui-text-4);
    }
    .city-name {
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-4);
    }
    .row { display: flex; align-items: center; }

    /* ── City section reveal ── */
    .city-section {
      animation: slideDown 200ms var(--lgui-ease-out) both;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-0.5rem); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Empty / no-results states ── */
    .city-hint {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-sm);
      padding: var(--lgui-space-4) 0 var(--lgui-space-3);
      font-size: var(--lgui-fs-body);
      color: var(--lgui-text-2);
    }
    .city-no-results {
      padding: var(--lgui-space-4) 0;
      font-size: var(--lgui-fs-body);
      color: var(--lgui-text-3);
    }

    /* ── Detecting badge ── */
    .detect-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-xs);
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-md);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>País y ciudad</ion-title>
      </ion-toolbar>
      <ion-progress-bar value="0.25" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="question">¿De dónde eres?</div>
      <div class="subtitle">Selecciona tu país y ciudad.</div>

      <!-- Geolocation feedback -->
      <div class="detect-row" *ngIf="detecting">
        <ion-spinner name="dots" style="width:1rem;height:1rem"></ion-spinner>
        Detectando tu ubicación...
      </div>

      <!-- ── COUNTRY ── -->
      <div class="field-label">País</div>

      <!-- Selected: collapsed row -->
      <div *ngIf="selectedCountry" class="selected-row" (click)="clearCountry()">
        <span class="selected-flag" aria-hidden="true">{{ getFlag(selectedCountry.code) }}</span>
        <div class="selected-text">
          <div class="selected-value">{{ selectedCountry.name }}</div>
        </div>
        <span class="selected-change">Cambiar</span>
      </div>

      <!-- Not selected: search + list -->
      <ng-container *ngIf="!selectedCountry">
        <div *ngIf="loadingCountries" class="loading-container" style="padding: var(--lgui-space-4) 0">
          <ion-spinner color="primary"></ion-spinner>
        </div>

        <div class="picker-block" *ngIf="!loadingCountries">
          <ion-searchbar
            [(ngModel)]="countryQuery"
            placeholder="Buscar país..."
            [debounce]="150"
            animated="false">
          </ion-searchbar>

          <ion-list lines="none">
            <ion-item
              *ngFor="let c of filteredCountries"
              class="country-item"
              (click)="selectCountry(c)">
              <div class="row">
                <span class="flag" aria-hidden="true">{{ getFlag(c.code) }}</span>
                <ion-label>
                  <div class="country-name">{{ c.name }}</div>
                </ion-label>
              </div>
            </ion-item>
          </ion-list>
        </div>
      </ng-container>

      <!-- ── CITY (shown after country is selected) ── -->
      <ng-container *ngIf="selectedCountry">
        <div class="city-section">
          <div class="field-label">Ciudad</div>

          <!-- Selected: collapsed row -->
          <div *ngIf="selectedCity" class="selected-row" (click)="clearCity()">
            <div class="selected-text">
              <div class="selected-value">{{ selectedCity.name }}</div>
            </div>
            <span class="selected-change">Cambiar</span>
          </div>

          <!-- Loading cities -->
          <div *ngIf="loadingCities" class="loading-container" style="padding: var(--lgui-space-4) 0">
            <ion-spinner color="primary"></ion-spinner>
          </div>

          <!-- Not selected: search + results -->
          <ng-container *ngIf="!loadingCities && !selectedCity">
            <ion-searchbar
              [(ngModel)]="cityQuery"
              [placeholder]="'Buscar en ' + selectedCountry.name + '...'"
              [debounce]="200"
              animated="false"
              autofocus="true">
            </ion-searchbar>

            <div *ngIf="cityQuery.trim().length === 0" class="city-hint">
              Escribe el nombre de tu ciudad
            </div>

            <div *ngIf="cityQuery.trim().length > 0 && cityResults.length === 0" class="city-no-results">
              Sin resultados para "{{ cityQuery.trim() }}"
            </div>

            <ion-list lines="none" *ngIf="cityResults.length > 0">
              <ion-item
                *ngFor="let city of cityResults"
                class="city-item"
                (click)="selectCity(city)">
                <ion-label>
                  <div class="city-name">{{ city.name }}</div>
                </ion-label>
              </ion-item>
            </ion-list>
          </ng-container>
        </div>
      </ng-container>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button
          expand="block"
          color="primary"
          style="margin: var(--lgui-gap-sm)"
          [disabled]="!selectedCountry || !selectedCity"
          (click)="next()">
          Siguiente
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
})
export class OnboardingPaisPage implements OnInit {
  countries: Country[] = [];
  cities: City[] = [];

  selectedCountry: Country | null = null;
  selectedCity: City | null = null;

  countryQuery = '';
  cityQuery = '';

  loadingCountries = true;
  loadingCities = false;
  detecting = false;
  detectedName = '';

  constructor(
    private readonly router: Router,
    private readonly countriesService: CountriesService,
    private readonly state: OnboardingStateService,
  ) {}

  ngOnInit() {
    const saved = this.state.get();

    this.countriesService.getAll().subscribe({
      next: (list) => {
        this.countries = list;
        this.loadingCountries = false;

        if (saved.countryId) {
          const country = list.find(c => c.id === saved.countryId) ?? null;
          if (country) {
            this.selectedCountry = country;
            this.loadCities(country.id, saved.cityId ?? null);
          }
        } else {
          this.autoDetect(list);
        }
      },
      error: () => { this.loadingCountries = false; },
    });
  }

  private autoDetect(list: Country[]): void {
    if (!navigator.geolocation) return;
    this.detecting = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.detecting = false;
        const { latitude, longitude } = pos.coords;
        const candidates = list.filter(c => c.lat != null && c.lng != null);
        if (!candidates.length) { this.detecting = false; return; }
        const nearest = candidates.reduce((best, c) =>
          distanceSq(latitude, longitude, Number(c.lat), Number(c.lng)) <
          distanceSq(latitude, longitude, Number(best.lat), Number(best.lng)) ? c : best
        , candidates[0]);
        this.selectedCountry = nearest;
        this.loadCities(nearest.id, null);
      },
      () => { this.detecting = false; },
      { timeout: 8000 },
    );
  }

  private loadCities(countryId: string, preselectCityId: string | null): void {
    this.loadingCities = true;
    this.cities = [];
    this.cityQuery = '';
    this.countriesService.getCitiesByCountry(countryId).subscribe({
      next: (list) => {
        this.cities = list;
        this.loadingCities = false;
        if (preselectCityId) {
          this.selectedCity = list.find(c => c.id === preselectCityId) ?? null;
        }
      },
      error: () => { this.loadingCities = false; },
    });
  }

  selectCountry(country: Country): void {
    this.selectedCountry = country;
    this.selectedCity = null;
    this.countryQuery = '';
    this.loadCities(country.id, null);
  }

  clearCountry(): void {
    this.selectedCountry = null;
    this.selectedCity = null;
    this.cities = [];
    this.cityQuery = '';
    this.countryQuery = '';
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.cityQuery = '';
  }

  clearCity(): void {
    this.selectedCity = null;
    this.cityQuery = '';
  }

  get filteredCountries(): Country[] {
    const q = this.countryQuery.trim().toLowerCase();
    if (!q) return this.countries;
    return this.countries.filter(c => c.name.toLowerCase().includes(q));
  }

  get cityResults(): City[] {
    const q = this.cityQuery.trim().toLowerCase();
    if (!q) return [];
    return this.cities
      .filter(c => c.name.toLowerCase().includes(q))
      .slice(0, CITY_RESULTS_LIMIT);
  }

  getFlag(code: string): string {
    return flagEmoji(code);
  }

  next(): void {
    if (!this.selectedCountry || !this.selectedCity) return;
    this.state.set({ countryId: this.selectedCountry.id, cityId: this.selectedCity.id });
    this.router.navigate(['/onboarding/rol']);
  }
}
