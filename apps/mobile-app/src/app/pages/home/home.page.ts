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
import { listOutline, calendarOutline, chevronBack, chevronForward } from 'ionicons/icons';
import { WeeklyEvent, EventType } from '@shared/types';
import { EventsService } from '../../services/events.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTH_NAMES_FULL = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAY_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const TYPE_DOT_COLOR: Record<string, string> = {
  social:    'var(--type-social-color)',
  intensive: 'var(--type-intensive-color)',
  congress:  'var(--type-congress-color)',
};

interface CalendarCell {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  dots: string[];
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

const VIEW_KEY = 'vibrasbk_home_view';

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
    /* ── Filter bar ─────────────────────────────────────────────── */
    .filter-bar {
      display: flex;
      gap: var(--lgui-gap-sm);
      padding: var(--lgui-space-3) var(--lgui-pad-md);
      overflow-x: auto;
      overflow-y: hidden;
      border-bottom: 0.0625rem solid var(--lgui-border-2);
      background: var(--lgui-surface-1);
      scrollbar-width: none;
    }
    .filter-bar::-webkit-scrollbar { display: none; }
    .filter-chip {
      display: inline-flex;
      align-items: center;
      height: 1.875rem;
      padding: 0 var(--lgui-space-3);
      border-radius: var(--lgui-radius-pill);
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-semibold);
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s, color 0.15s;
      background: var(--lgui-surface-3);
      color: var(--lgui-text-3);
      border: none;
      user-select: none;
    }
    .filter-chip.active                { background: var(--ion-color-primary); color: #fff; }
    .filter-chip.active.type-social    { background: var(--type-social-color, #4A90D9); }
    .filter-chip.active.type-intensive { background: var(--type-intensive-color, #D07A2E); }
    .filter-chip.active.type-congress  { background: var(--type-congress-color, #7B52AB); }

    /* ── View toggle ─────────────────────────────────────────────── */
    .view-toggle {
      display: inline-flex;
      margin-left: auto;
      border-radius: var(--lgui-radius-pill);
      overflow: hidden;
      background: var(--lgui-surface-3);
      flex-shrink: 0;
    }
    .view-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 1.875rem;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--lgui-text-3);
      font-size: 1rem;
      transition: background 0.15s, color 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .view-btn.active { background: var(--ion-color-primary); color: #fff; }

    /* ── List view ───────────────────────────────────────────────── */
    .day-header {
      padding: var(--lgui-space-5) var(--lgui-pad-md) var(--lgui-space-1);
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-bold);
      letter-spacing: 0.0625rem;
      text-transform: uppercase;
      color: var(--lgui-text-3);
    }
    .day-group   { margin-bottom: var(--lgui-gap-sm); }
    .content-area { padding-bottom: var(--lgui-space-8); }

    /* ── Calendar view ───────────────────────────────────────────── */
    .month-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--lgui-pad-sm) var(--lgui-pad-md) var(--lgui-gap-sm);
    }
    .month-title {
      font-size: var(--lgui-fs-heading);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
    }
    .cal-day-headers {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 var(--lgui-pad-md);
      margin-bottom: 0.125rem;
    }
    .cal-day-header-cell {
      text-align: center;
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-bold);
      letter-spacing: 0.0313rem;
      color: var(--lgui-text-3);
      padding: 0.25rem 0;
    }
    .cal-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 var(--lgui-pad-md);
      gap: 0.125rem 0;
    }
    .cal-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.1875rem 0 0.25rem;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .cal-cell.out-month .day-num { opacity: 0.28; }
    .day-num {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-medium);
      color: var(--lgui-text-4);
      transition: background 0.12s;
    }
    .cal-cell.today    .day-num { background: var(--lgui-surface-3); font-weight: var(--lgui-fw-bold); }
    .cal-cell.selected .day-num { background: var(--ion-color-primary); color: #fff; font-weight: var(--lgui-fw-bold); }
    .cal-cell.selected.today .day-num { background: var(--ion-color-primary); }
    .dots-row {
      display: flex;
      gap: 0.1875rem;
      margin-top: 0.125rem;
      height: 0.3125rem;
      align-items: center;
    }
    .dot {
      width: 0.3125rem;
      height: 0.3125rem;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .cal-divider {
      height: 0.0625rem;
      background: var(--lgui-border-2);
      margin: var(--lgui-gap-md) var(--lgui-pad-md) 0;
    }
    .selected-label {
      padding: var(--lgui-gap-md) var(--lgui-pad-md) var(--lgui-gap-sm);
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-bold);
      letter-spacing: 0.0375rem;
      text-transform: uppercase;
      color: var(--lgui-text-3);
    }
    .bottom-space { height: var(--lgui-space-8); }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <span class="breadcrumb">Agenda</span>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Type chips + view toggle -->
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
        <div class="view-toggle">
          <button class="view-btn" [class.active]="activeView === 'list'" (click)="setView('list')">
            <ion-icon name="list-outline"></ion-icon>
          </button>
          <button class="view-btn" [class.active]="activeView === 'calendar'" (click)="setView('calendar')">
            <ion-icon name="calendar-outline"></ion-icon>
          </button>
        </div>
      </div>

      <!-- City filter — only if more than 1 city -->
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

      <!-- ── List view ─────────────────────────────────────────── -->
      <div *ngIf="!loading && !error && activeView === 'list'" class="content-area">
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

      <!-- ── Calendar view ──────────────────────────────────────── -->
      <div *ngIf="!loading && !error && activeView === 'calendar'">
        <div class="month-nav">
          <ion-button fill="clear" size="small" (click)="prevMonth()">
            <ion-icon slot="icon-only" name="chevron-back"></ion-icon>
          </ion-button>
          <span class="month-title">{{ monthTitle }}</span>
          <ion-button fill="clear" size="small" (click)="nextMonth()">
            <ion-icon slot="icon-only" name="chevron-forward"></ion-icon>
          </ion-button>
        </div>

        <div class="cal-day-headers">
          <div *ngFor="let h of dayHeaders" class="cal-day-header-cell">{{ h }}</div>
        </div>

        <div class="cal-grid">
          <div
            *ngFor="let cell of cells"
            class="cal-cell"
            [class.out-month]="!cell.inMonth"
            [class.today]="cell.isToday"
            [class.selected]="isSameDay(cell.date, selectedDate)"
            (click)="selectDate(cell.date)">
            <div class="day-num">{{ cell.date.getDate() }}</div>
            <div class="dots-row">
              <div *ngFor="let color of cell.dots.slice(0,3)" class="dot" [style.background]="color"></div>
            </div>
          </div>
        </div>

        <div class="cal-divider"></div>
        <div class="selected-label">{{ selectedDayLabel }}</div>

        <app-event-card *ngFor="let ev of selectedDayEvents" [event]="ev"></app-event-card>

        <div *ngIf="selectedDayEvents.length === 0" class="empty-state">
          <div class="empty-icon">🎵</div>
          <div class="empty-title">Sin eventos este día</div>
          <div class="empty-subtitle">No hay sociales programados.</div>
        </div>

        <div class="bottom-space"></div>
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
  activeView: 'list' | 'calendar' = 'list';

  dayHeaders = DAY_HEADERS;
  displayMonth: Date = (() => { const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); return d; })();
  selectedDate: Date = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  cells: CalendarCell[] = [];

  private allLoadedEvents: WeeklyEvent[] = [];
  private filteredEvents: WeeklyEvent[] = [];
  private navSub: Subscription;

  constructor(private eventsService: EventsService, private router: Router) {
    addIcons({ listOutline, calendarOutline, chevronBack, chevronForward });
    const saved = localStorage.getItem(VIEW_KEY);
    if (saved === 'list' || saved === 'calendar') this.activeView = saved;
    this.navSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd && e.urlAfterRedirects === '/tabs/home'),
    ).subscribe(() => this.load(null));
  }

  ngOnDestroy() { this.navSub.unsubscribe(); }

  setView(v: 'list' | 'calendar') {
    this.activeView = v;
    localStorage.setItem(VIEW_KEY, v);
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
    this.filteredEvents = this.selectedCity
      ? this.allLoadedEvents.filter(e => e.venue?.city === this.selectedCity)
      : this.allLoadedEvents;
    this.grouped = this.groupByDay(this.filteredEvents);
    this.buildCells();
  }

  // ── Calendar ──────────────────────────────────────────────────────

  get monthTitle(): string {
    return `${MONTH_NAMES_FULL[this.displayMonth.getMonth()]} ${this.displayMonth.getFullYear()}`;
  }

  get selectedDayLabel(): string {
    const d = this.selectedDate;
    const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
    return `${DAY_NAMES[dayIdx]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]}`;
  }

  get selectedDayEvents(): WeeklyEvent[] {
    const norm = this.selectedDate.getDay() === 0 ? 6 : this.selectedDate.getDay() - 1;
    return this.filteredEvents.filter(ev => (ev.dayOfWeek ?? -1) === norm);
  }

  prevMonth() {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
    this.buildCells();
  }

  nextMonth() {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
    this.buildCells();
  }

  selectDate(date: Date) {
    this.selectedDate = new Date(date);
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth()    === b.getMonth()    &&
           a.getDate()     === b.getDate();
  }

  private buildCells() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const year  = this.displayMonth.getFullYear();
    const month = this.displayMonth.getMonth();
    const startCell = getMondayOfWeek(new Date(year, month, 1));

    this.cells = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startCell);
      date.setDate(startCell.getDate() + i);
      this.cells.push({
        date,
        inMonth: date.getMonth() === month,
        isToday: this.isSameDay(date, today),
        dots: this.dotsForDate(date),
      });
    }
    // Trim trailing rows that are fully out-of-month
    while (this.cells.length > 35) {
      const lastRow = this.cells.slice(-7);
      if (lastRow.every(c => !c.inMonth)) this.cells.splice(-7);
      else break;
    }
  }

  private dotsForDate(date: Date): string[] {
    const norm = date.getDay() === 0 ? 6 : date.getDay() - 1;
    const colors: string[] = [];
    const seen = new Set<string>();
    for (const ev of this.filteredEvents) {
      if ((ev.dayOfWeek ?? -1) === norm && !seen.has(ev.type)) {
        seen.add(ev.type);
        colors.push(TYPE_DOT_COLOR[ev.type] ?? '#BAC0CC');
      }
    }
    return colors;
  }

  // ── List ──────────────────────────────────────────────────────────

  private groupByDay(events: WeeklyEvent[]): { dayName: string; events: WeeklyEvent[] }[] {
    const map = new Map<number, { date: Date; events: WeeklyEvent[] }>();
    for (const ev of events) {
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
