import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonList, IonItem, IonLabel, IonIcon, IonSearchbar,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkOutline, locationOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-city-picker-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonList, IonItem, IonLabel, IonIcon, IonSearchbar,
  ],
  styles: [`
    ion-content {
      --background: var(--lgui-surface-2);
    }
    .searchbar-container {
      padding: var(--lgui-pad-md) var(--lgui-pad-md) 0;
      background: var(--lgui-surface-2);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    .city-item {
      --background: var(--lgui-surface-1);
      --border-color: var(--lgui-border-2);
      margin-bottom: 0.0625rem;
    }
    .city-item:last-child {
      margin-bottom: 0;
    }
    .city-name {
      font-size: var(--lgui-fs-body-lg);
      font-weight: var(--lgui-fw-medium);
      color: var(--lgui-text-4);
    }
    .selected-check {
      color: var(--ion-color-primary);
      font-size: var(--lgui-fs-body-lg);
    }
    .all-country-item {
      --background: var(--lgui-surface-1);
      margin-bottom: 0.5rem;
      border-radius: var(--lgui-radius-default);
    }
    .empty-state {
      text-align: center;
      padding: var(--lgui-space-8) var(--lgui-pad-md);
      color: var(--lgui-text-3);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="goBack()">
            <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ country }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Search bar -->
      <div class="searchbar-container">
        <ion-searchbar 
          [(ngModel)]="searchQuery"
          (ionInput)="filterCities()"
          placeholder="Buscar ciudad..."
          debounce="150">
        </ion-searchbar>
      </div>

      <!-- "All cities in country" option -->
      <ion-item button detail="false" class="all-country-item" (click)="selectAllCitiesInCountry()">
        <ion-icon slot="start" name="location-outline" color="primary"></ion-icon>
        <ion-label>
          <div class="city-name">📍 Todas las ciudades de {{ country }}</div>
        </ion-label>
        <ion-icon *ngIf="!selectedCity" slot="end" name="checkmark-outline" class="selected-check"></ion-icon>
      </ion-item>

      <!-- City list -->
      <ion-list lines="none">
        <ion-item 
          *ngFor="let city of filteredCities" 
          button 
          detail="false" 
          class="city-item"
          (click)="selectCity(city)">
          <ion-icon slot="start" name="location-outline" color="medium"></ion-icon>
          <ion-label>
            <div class="city-name">{{ city }}</div>
          </ion-label>
          <ion-icon *ngIf="selectedCity === city" slot="end" name="checkmark-outline" class="selected-check"></ion-icon>
        </ion-item>
      </ion-list>

      <!-- Empty state -->
      <div *ngIf="filteredCities.length === 0" class="empty-state">
        <p>No se encontraron ciudades</p>
      </div>
    </ion-content>
  `,
})
export class CityPickerModal {
  @Input() country: string = '';
  @Input() cities: string[] = [];
  @Input() selectedCity: string | null = null;

  searchQuery: string = '';
  filteredCities: string[] = [];

  constructor(private modalCtrl: ModalController) {
    addIcons({ checkmarkOutline, locationOutline, arrowBackOutline });
  }

  ngOnInit() {
    this.filteredCities = [...this.cities].sort();
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }

  goBack() {
    this.modalCtrl.dismiss({ goBack: true });
  }

  selectAllCitiesInCountry() {
    this.modalCtrl.dismiss({ city: null, country: this.country });
  }

  selectCity(city: string) {
    this.modalCtrl.dismiss({ city, country: this.country });
  }

  filterCities() {
    if (!this.searchQuery.trim()) {
      this.filteredCities = [...this.cities].sort();
      return;
    }
    
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredCities = this.cities
      .filter(city => city.toLowerCase().includes(query))
      .sort();
  }
}
