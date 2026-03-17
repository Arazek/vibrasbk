import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSpinner, IonText, IonButton, IonButtons, IonRefresher, IonRefresherContent,
  IonChip, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { musicalNotes, calendar } from 'ionicons/icons';
import { WeeklyEvent, EventType } from '@shared/types';
import { EventsService } from '../../services/events.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonSpinner, IonText, IonButton, IonButtons, IonIcon,
    IonRefresher, IonRefresherContent,
    IonChip, IonLabel,
    EventCardComponent,
  ],
  styles: [`
    .brand-slot {
      display: flex;
      align-items: center;
      gap: 6px;
      padding-left: 4px;
    }
    .brand-icon { font-size: 22px; color: var(--ion-color-primary); }
    .brand-name {
      font-size: 16px;
      font-weight: 700;
      color: var(--lgui-text-4);
      letter-spacing: -0.3px;
    }
    .filter-bar {
      display: flex;
      gap: var(--lgui-gap-sm);
      padding: var(--lgui-space-3) var(--lgui-pad-md);
      overflow-x: auto;
      overflow-y: hidden;
      border-bottom: 1px solid var(--lgui-border-2);
      background: var(--lgui-surface-1);
      /* Hide scrollbar but keep scroll */
      scrollbar-width: none;
    }
    .filter-bar::-webkit-scrollbar { display: none; }
    .filter-chip {
      display: inline-flex;
      align-items: center;
      height: 30px;
      padding: 0 var(--lgui-space-3);
      border-radius: var(--lgui-radius-pill);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s, color 0.15s;
      background: var(--lgui-surface-3);
      color: var(--lgui-text-3);
      border: none;
      user-select: none;
    }
    .filter-chip.active {
      background: var(--ion-color-primary);
      color: #fff;
    }
    .filter-chip.active.type-social     { background: var(--type-social-color, #4A90D9); }
    .filter-chip.active.type-intensive  { background: var(--type-intensive-color, #D07A2E); }
    .filter-chip.active.type-congress   { background: var(--type-congress-color, #7B52AB); }
    .day-header {
      padding: var(--lgui-space-5) var(--lgui-pad-md) var(--lgui-space-1);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--lgui-text-3);
    }
    .day-group {
      margin-bottom: var(--lgui-gap-sm);
    }
    .content-area {
      padding-bottom: var(--lgui-space-8);
    }
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--lgui-space-9) 0;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--lgui-space-10) var(--lgui-space-6);
      text-align: center;
    }
    .empty-icon {
      font-size: 56px;
      margin-bottom: var(--lgui-gap-lg);
      line-height: 1;
    }
    .empty-title {
      font-size: 17px;
      font-weight: 600;
      color: var(--lgui-text-4);
      margin-bottom: var(--lgui-gap-sm);
    }
    .empty-subtitle {
      font-size: 14px;
      color: var(--lgui-text-3);
      line-height: 1.6;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <div class="brand-slot">
            <ion-icon name="musical-notes" class="brand-icon"></ion-icon>
            <span class="brand-name">Predictor</span>
          </div>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="openCalendar()">
            <ion-icon slot="icon-only" name="calendar"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Filtro por tipo — custom pills (not ion-chip to avoid Ionic override issues) -->
      <div class="filter-bar">
        <button class="filter-chip" [class.active]="!selectedType" (click)="setType(null)">
          Todos
        </button>
        <button class="filter-chip type-social" [class.active]="selectedType === 'social'" (click)="setType('social')">
          Social
        </button>
        <button class="filter-chip type-intensive" [class.active]="selectedType === 'intensive'" (click)="setType('intensive')">
          Intensivo
        </button>
        <button class="filter-chip type-congress" [class.active]="selectedType === 'congress'" (click)="setType('congress')">
          Congreso
        </button>
      </div>

      <!-- Filtro por ciudad — solo visible si hay más de 1 ciudad en los datos -->
      <div class="filter-bar" *ngIf="availableCities.length > 1">
        <button class="filter-chip" [class.active]="!selectedCity" (click)="setCity(null)">
          📍 Todas
        </button>
        <button class="filter-chip" *ngFor="let c of availableCities"
          [class.active]="selectedCity === c" (click)="setCity(c)">
          {{ c }}
        </button>
      </div>

      <ion-refresher slot="fixed" (ionRefresh)="load($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div *ngIf="loading" class="loading-container">
        <ion-spinner color="primary"></ion-spinner>
      </div>

      <div *ngIf="error" class="ion-padding">
        <ion-text color="danger"><p>{{ error }}</p></ion-text>
        <ion-button (click)="load(null)" expand="block">Reintentar</ion-button>
      </div>

      <div *ngIf="!loading && !error" class="content-area">
        <div *ngFor="let group of grouped" class="day-group">
          <div class="day-header">{{ group.dayName }}</div>
          <app-event-card *ngFor="let ev of group.events" [event]="ev"></app-event-card>
        </div>

        <div *ngIf="grouped.length === 0" class="empty-state">
          <div class="empty-icon">🎵</div>
          <div class="empty-title">Sin eventos esta semana</div>
          <div class="empty-subtitle">No hay sociales programados.<br>¡Vuelve pronto!</div>
        </div>
      </div>
    </ion-content>
  `,
})
export class HomePage implements OnDestroy {
  loading = true;
  error = '';
  grouped: { dayName: string; events: WeeklyEvent[] }[] = [];
  selectedType: EventType | null = null;
  selectedCity: string | null = null;
  availableCities: string[] = [];

  private allLoadedEvents: WeeklyEvent[] = [];
  private navSub: Subscription;

  constructor(private eventsService: EventsService, private router: Router) {
    addIcons({ musicalNotes, calendar });
    // Reload every time the router lands on /tabs/home (initial + return from event detail)
    this.navSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd && e.urlAfterRedirects === '/tabs/home'),
    ).subscribe(() => this.load(null));
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
  }

  openCalendar() {
    this.router.navigate(['/calendar']);
  }

  setType(type: EventType | null) {
    this.selectedType = type;
    this.load(null);
  }

  setCity(city: string | null) {
    this.selectedCity = city;
    this.applyFilters();
  }

  load(refresher: any) {
    this.loading = !refresher;
    this.error = '';
    this.eventsService.getWeeklyEvents(this.selectedType ?? undefined).subscribe({
      next: (events) => {
        this.allLoadedEvents = events;
        this.availableCities = [...new Set(
          events.map(e => e.venue?.city).filter((c): c is string => !!c)
        )];
        if (this.selectedCity && !this.availableCities.includes(this.selectedCity)) {
          this.selectedCity = null;
        }
        this.applyFilters();
        this.loading = false;
        refresher?.complete();
      },
      error: () => {
        this.error = 'No se pudo cargar la agenda.';
        this.loading = false;
        refresher?.complete();
      },
    });
  }

  private applyFilters() {
    const filtered = this.selectedCity
      ? this.allLoadedEvents.filter(e => e.venue?.city === this.selectedCity)
      : this.allLoadedEvents;
    this.grouped = this.groupByDay(filtered);
  }

  private groupByDay(events: WeeklyEvent[]): { dayName: string; events: WeeklyEvent[] }[] {
    const map = new Map<number, { date: Date; events: WeeklyEvent[] }>();
    for (const ev of events) {
      // Parsear "YYYY-MM-DD" como fecha local para evitar el desfase UTC
      const [yr, mo, dy] = ev.eventDate.split('-').map(Number);
      const d = new Date(yr, mo - 1, dy);
      const normalized = d.getDay() === 0 ? 6 : d.getDay() - 1;
      if (!map.has(normalized)) map.set(normalized, { date: d, events: [] });
      map.get(normalized)!.events.push(ev);
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([day, { date, events: evs }]) => ({
        dayName: `${DAY_NAMES[day]} ${date.getDate()} de ${MONTH_NAMES[date.getMonth()]}`,
        events: evs,
      }));
  }
}
