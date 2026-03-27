import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonList, IonItem, IonLabel, IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkOutline, globeOutline } from 'ionicons/icons';

export interface CountryOption {
  name: string;
  cityCount: number;
}

@Component({
  selector: 'app-country-picker-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonList, IonItem, IonLabel, IonIcon,
  ],
  styles: [`
    ion-content {
      --background: var(--lgui-surface-2);
    }
    .country-item {
      --background: var(--lgui-surface-1);
      --border-color: var(--lgui-border-2);
      margin-bottom: 0.0625rem;
    }
    .country-item:last-child {
      margin-bottom: 0;
    }
    .country-name {
      font-size: var(--lgui-fs-body-lg);
      font-weight: var(--lgui-fw-medium);
      color: var(--lgui-text-4);
    }
    .city-count {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
    }
    .selected-check {
      color: var(--ion-color-primary);
      font-size: var(--lgui-fs-body-lg);
    }
    .all-cities-item {
      --background: var(--lgui-surface-1);
      margin-bottom: 0.5rem;
      border-radius: var(--lgui-radius-default);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Seleccionar país</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- "All cities" option -->
      <ion-item button detail="false" class="all-cities-item" (click)="selectAllCities()">
        <ion-icon slot="start" name="globe-outline" color="primary"></ion-icon>
        <ion-label>
          <div class="country-name">🌍 Todas las ciudades</div>
          <div class="city-count">Mostrar eventos de todos los países</div>
        </ion-label>
        <ion-icon *ngIf="!selectedCountry" slot="end" name="checkmark-outline" class="selected-check"></ion-icon>
      </ion-item>

      <!-- Country list -->
      <ion-list lines="none">
        <ion-item 
          *ngFor="let country of countries" 
          button 
          detail="false" 
          class="country-item"
          (click)="selectCountry(country.name)">
          <ion-label>
            <div class="country-name">🗺 {{ country.name }}</div>
            <div class="city-count">{{ country.cityCount }} {{ country.cityCount === 1 ? 'ciudad' : 'ciudades' }}</div>
          </ion-label>
          <ion-icon *ngIf="selectedCountry === country.name" slot="end" name="checkmark-outline" class="selected-check"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class CountryPickerModal {
  @Input() countries: CountryOption[] = [];
  @Input() selectedCountry: string | null = null;

  constructor(private modalCtrl: ModalController) {
    addIcons({ checkmarkOutline, globeOutline });
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }

  selectAllCities() {
    this.modalCtrl.dismiss({ country: null });
  }

  selectCountry(country: string) {
    this.modalCtrl.dismiss({ country });
  }
}
