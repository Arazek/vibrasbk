import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonInput, IonText, IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { locationOutline, chevronDownOutline } from 'ionicons/icons';
import { CreateVenuePayload } from '../../services/admin.service';
import { environment } from '../../../environments/environment';
import { Country, City } from '@shared/types';
import { CountryPickerModal } from '../../components/location/country-picker.modal';
import { CityPickerModal } from '../../components/location/city-picker.modal';

@Component({
  selector: 'app-venue-form-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonInput, IonText, IonIcon,
  ],
  styles: [`
    .form-field { padding: 0.5rem 0; }
    .location-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--lgui-space-3);
      border-radius: var(--lgui-radius-default);
      background: var(--lgui-surface-3);
      border: none;
      cursor: pointer;
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
      margin-top: 0.375rem;
      transition: background var(--lgui-transition-fast);
    }
    .location-btn:active { background: var(--lgui-surface-4); }
    .location-btn .loc-icon { font-size: 0.875rem; color: var(--ion-color-primary); }
    .location-btn .loc-chevron { font-size: 0.75rem; color: var(--lgui-text-3); }
    .location-label { display: block; font-size: var(--lgui-fs-caption); font-weight: var(--lgui-fw-semibold); text-transform: uppercase; letter-spacing: 0.0313rem; color: var(--lgui-text-3); margin-bottom: 0.5rem; }
    .coords-preview { font-size: var(--lgui-fs-caption); color: var(--ion-color-medium); margin-top: 0.25rem; padding: 0 1rem; }
    .coords-ok { color: var(--ion-color-success); }
    .coords-err { color: var(--ion-color-danger); }
    ion-content {
      --background: var(--ion-background-color, #ffffff);
      --color: var(--ion-text-color, #19213D);
    }
    ion-input {
      color: var(--ion-text-color, #19213D);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? 'Editar local' : 'Nuevo local' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-field">
        <ion-input
          name="name"
          label="Nombre del local"
          labelPlacement="stacked"
          [(ngModel)]="form.name"
          placeholder="Ej: El Almacén">
        </ion-input>
      </div>

      <label class="location-label">Ubicación</label>
      <button class="location-btn" (click)="openLocationPicker()">
        <ion-icon name="location-outline" class="loc-icon"></ion-icon>
        <span>{{ locationLabel }}</span>
        <ion-icon name="chevron-down-outline" class="loc-chevron"></ion-icon>
      </button>
      <div class="form-field">
        <ion-input
          name="mapsLink"
          label="Enlace Google Maps"
          labelPlacement="stacked"
          [(ngModel)]="mapsLink"
          (ionInput)="parseLink($event)"
          placeholder="https://maps.app.goo.gl/... o pega la URL">
        </ion-input>
        <p class="coords-preview" [class.coords-ok]="coordsOk" [class.coords-err]="coordsErr">
          {{ coordsMsg }}
        </p>
      </div>
      <div class="form-field">
        <ion-input
          name="maxCapacity"
          label="Aforo máximo"
          labelPlacement="stacked"
          type="number"
          [(ngModel)]="form.maxCapacity"
          placeholder="100">
        </ion-input>
      </div>
      <ion-button expand="block" style="margin-top: 1.5rem;" (click)="submit()">
        {{ editingId ? 'Guardar cambios' : 'Crear local' }}
      </ion-button>
    </ion-content>
  `,
})
export class VenueFormModal implements OnInit {
  @Input() editingId: string | null = null;
  @Input() initial: CreateVenuePayload = { name: '', city: 'Cartagena' };

  form: CreateVenuePayload = { name: '', city: 'Cartagena' };
  mapsLink = '';
  coordsOk = false;
  coordsErr = false;
  coordsMsg = 'Pega un enlace de Google Maps para extraer las coordenadas';

  countries: Country[] = [];
  citiesByCountryId: Record<string, City[]> = {};
  loadingCountries = true;

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly http: HttpClient
  ) {
    addIcons({ locationOutline, chevronDownOutline });
  }

  get locationLabel(): string {
    if (this.form.city && this.form.country) {
      return `${this.form.city}, ${this.form.country}`;
    }
    if (this.form.country) {
      return this.form.country;
    }
    return 'Todas las ciudades';
  }

  private countryCodeToFlag(code: string): string {
    // Convert ISO country code (e.g., "ES", "CO") to flag emoji
    // A-Z (65-90) → 🇦-🇿 (127462-127487)
    return code
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint((char.codePointAt(0) ?? 65) - 65 + 127462))
      .join('');
  }

  ngOnInit() {
    this.form = { ...this.initial };
    if (this.form.lat && this.form.lng) {
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
    }

    // Load countries for the location picker modal
    this.http.get<Country[]>(`${environment.apiUrl}/countries`).subscribe({
      next: (countries) => {
        this.countries = countries || [];

        // Load cities for all countries to build the map and get city counts
        let loadedCount = 0;
        countries.forEach(country => {
          this.http.get<City[]>(`${environment.apiUrl}/countries/${country.id}/cities`).subscribe({
            next: (cities) => {
              this.citiesByCountryId[country.id] = cities || [];
              loadedCount++;
              if (loadedCount === countries.length) {
                this.loadingCountries = false;
              }
            },
            error: () => {
              this.citiesByCountryId[country.id] = [];
              loadedCount++;
              if (loadedCount === countries.length) {
                this.loadingCountries = false;
              }
            }
          });
        });
      },
      error: (error) => {
        this.loadingCountries = false;
        console.error('Failed to load countries:', error);
      }
    });
  }

  parseLink(event: any) {
    const url: string = event.target?.value ?? '';
    this.coordsOk = false;
    this.coordsErr = false;
    this.coordsMsg = '';
    this.form.lat = undefined;
    this.form.lng = undefined;

    if (!url.trim()) {
      this.coordsMsg = 'Pega un enlace de Google Maps para extraer las coordenadas';
      return;
    }

    // Pattern 1: @lat,lng in URL (google.com/maps/@lat,lng,...)
    const atMatch = /@(-?\d+\.\d+),(-?\d+\.\d+)/.exec(url);
    if (atMatch) {
      this.form.lat = Number.parseFloat(atMatch[1]);
      this.form.lng = Number.parseFloat(atMatch[2]);
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
      return;
    }

    // Pattern 2: ?q=lat,lng or &q=lat,lng
    const qMatch = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/.exec(url);
    if (qMatch) {
      this.form.lat = Number.parseFloat(qMatch[1]);
      this.form.lng = Number.parseFloat(qMatch[2]);
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
      return;
    }

    // Pattern 3: destination=lat,lng
    const destMatch = /destination=(-?\d+\.\d+),(-?\d+\.\d+)/.exec(url);
    if (destMatch) {
      this.form.lat = Number.parseFloat(destMatch[1]);
      this.form.lng = Number.parseFloat(destMatch[2]);
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
      return;
    }

    // Shortened URL (maps.app.goo.gl) — can't resolve without HTTP, warn user
    if (url.includes('goo.gl') || url.includes('maps.app')) {
      this.coordsErr = true;
      this.coordsMsg = '⚠️ Enlace corto detectado. Usa el enlace completo de Google Maps (Share → Copy link)';
      return;
    }

    this.coordsErr = true;
    this.coordsMsg = '❌ No se pudieron extraer coordenadas. Usa: Compartir → Copiar enlace en Google Maps';
  }

  async openLocationPicker() {
    // Convert countries to CountryOption format with flags and city counts
    const countryOptions = this.countries
      .map(c => {
        const flag = this.countryCodeToFlag(c.code);
        const cityCount = this.citiesByCountryId[c.id]?.length ?? 0;
        return {
          name: `${flag} ${c.name}`,
          cityCount
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    // Show country picker
    const countryModal = await this.modalCtrl.create({
      component: CountryPickerModal,
      componentProps: {
        countries: countryOptions,
        selectedCountry: this.form.country ? `${this.countryCodeToFlag(this.countries.find(c => c.name === this.form.country)?.code ?? '')} ${this.form.country}` : null
      }
    });
    await countryModal.present();

    const result = await countryModal.onDidDismiss();
    if (!result.data?.country) return;

    // Extract country name (remove flag emoji — flags are 4 JS chars)
    const countryName = result.data.country.slice(4).trim();

    const countryObj = this.countries.find(c => c.name === countryName);
    if (!countryObj) return;

    const cities = this.citiesByCountryId[countryObj.id] || [];
    this.openCityPicker(cities, countryName);
  }

  private async openCityPicker(cities: City[], countryName: string) {
    const cityNames = cities.map(c => c.name).sort((a, b) => a.localeCompare(b));

    const cityModal = await this.modalCtrl.create({
      component: CityPickerModal,
      componentProps: {
        country: countryName,
        cities: cityNames,
        selectedCity: this.form.city
      }
    });
    await cityModal.present();

    const result = await cityModal.onDidDismiss();
    if (!result.data) return;

    if (result.data.goBack) {
      this.openLocationPicker();
      return;
    }

    this.saveLocation(result.data.city, countryName);
  }

  private saveLocation(city: string | null, country: string) {
    this.form.city = city ?? '';
    this.form.country = country;
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }

  submit() {
    if (!this.form.name?.trim()) return;
    if (!this.form.city?.trim()) return;
    if (!this.form.country?.trim()) return;

    // Ensure lat/lng are numbers, not strings (can come in as strings from the API)
    const form = { ...this.form };
    if (form.lat !== undefined) form.lat = Number(form.lat);
    if (form.lng !== undefined) form.lng = Number(form.lng);
    this.modalCtrl.dismiss({ form });
  }
}
