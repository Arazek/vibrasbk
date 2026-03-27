import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  IonContent,
  IonText, IonButton, IonRefresher, IonRefresherContent,
  IonChip, IonLabel, IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { listOutline, calendarOutline, chevronBack, chevronForward, locationOutline, chevronDownOutline } from 'ionicons/icons';
import { WeeklyEvent, EventType } from '@shared/types';
import { EventsService } from '../../services/events.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { ProfileService } from '../../services/profile.service';
import { CountryPickerModal } from '../../components/location/country-picker.modal';
import { CityPickerModal } from '../../components/location/city-picker.modal';

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
const LOCATION_KEY = 'vibrasbk_location_v2'; // { city: string|null, country: string|null }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, IonContent,
    IonText, IonButton, IonIcon,
    IonRefresher, IonRefresherContent,
    IonChip, IonLabel,
    EventCardComponent, NavbarComponent,
  ],
  styles: [`
    /* ── Location pill ───────────────────────────────────────────── */
    .location-row {
      padding: var(--lgui-space-3) var(--lgui-pad-md) 0;
      background: var(--lgui-surface-1);
    }
    .location-pill {
      display: inline-flex;
      align-items: center;
      gap: var(--lgui-gap-xs);
      height: 2rem;
      padding: 0 var(--lgui-space-3);
      border-radius: var(--lgui-radius-pill);
      background: var(--lgui-surface-3);
      border: none;
      cursor: pointer;
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
      -webkit-tap-highlight-color: transparent;
      transition: background var(--lgui-transition-fast);
    }
    .location-pill:active { background: var(--lgui-surface-4, var(--lgui-surface-3)); }
    .location-pill .loc-icon { font-size: 0.875rem; color: var(--ion-color-primary); }
    .location-pill .loc-chevron { font-size: 0.75rem; color: var(--lgui-text-3); }

    /* ── Filter bar ─────────────────────────────────────────────── */
    .filter-bar-wrap {
      display: flex;
      align-items: center;
      border-bottom: 0.0625rem solid var(--lgui-border-2);
      background: var(--lgui-surface-1);
    }
    .filter-bar {
      display: flex;
      gap: var(--lgui-gap-sm);
      padding: var(--lgui-space-3) var(--lgui-pad-md);
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      flex: 1;
      -webkit-mask-image: linear-gradient(to right, black calc(100% - 2.5rem), transparent 100%);
      mask-image: linear-gradient(to right, black calc(100% - 2.5rem), transparent 100%);
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
      transition: background var(--lgui-transition-fast), color var(--lgui-transition-fast);
      background: var(--lgui-surface-3);
      color: var(--lgui-text-3);
      border: none;
      user-select: none;
    }
    .filter-chip.active                { background: var(--ion-color-primary); color: var(--ion-color-primary-contrast); }
    .filter-chip.active.type-social    { background: var(--type-social-color); color: var(--lgui-text-1); }
    .filter-chip.active.type-intensive { background: var(--type-intensive-color); color: var(--lgui-text-1); }
    .filter-chip.active.type-congress  { background: var(--type-congress-color); color: var(--lgui-text-1); }

    /* ── View toggle ─────────────────────────────────────────────── */
    .view-toggle {
      display: inline-flex;
      border-radius: var(--lgui-radius-pill);
      overflow: hidden;
      background: var(--lgui-surface-3);
      flex-shrink: 0;
      margin-right: var(--lgui-pad-md);
    }
    .view-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.75rem;
      height: 2.75rem;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--lgui-text-3);
      font-size: var(--lgui-fs-body-lg);
      transition: background var(--lgui-transition-fast), color var(--lgui-transition-fast);
      -webkit-tap-highlight-color: transparent;
    }
    .view-btn.active { background: var(--ion-color-primary); color: var(--ion-color-primary-contrast); }

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
      padding: var(--lgui-space-0) 0 var(--lgui-space-1);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      min-height: 2.75rem; /* 44pt minimum touch target */
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
      line-height: var(--lgui-lh-tight);
      transition: background var(--lgui-duration-fast) var(--lgui-ease-out);
    }
    .cal-cell.today    .day-num { background: var(--lgui-surface-3); font-weight: var(--lgui-fw-bold); }
    .cal-cell.selected .day-num { background: var(--ion-color-primary); color: var(--ion-color-primary-contrast); font-weight: var(--lgui-fw-bold); }
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
    <app-navbar></app-navbar>

    <ion-content>
      <!-- Location context pill -->
      <div class="location-row">
        <button class="location-pill" (click)="openLocationPicker()"
                [attr.aria-label]="'Ubicación: ' + locationLabel">
          <ion-icon name="location-outline" class="loc-icon" aria-hidden="true"></ion-icon>
          {{ locationLabel }}
          <ion-icon name="chevron-down-outline" class="loc-chevron" aria-hidden="true"></ion-icon>
        </button>
      </div>

      <!-- Type chips + view toggle -->
      <div class="filter-bar-wrap">
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
        <div class="view-toggle">
          <button class="view-btn" [class.active]="activeView === 'list'" (click)="setView('list')"
                  aria-label="Vista de lista" [attr.aria-pressed]="activeView === 'list'">
            <ion-icon name="list-outline" aria-hidden="true"></ion-icon>
          </button>
          <button class="view-btn" [class.active]="activeView === 'calendar'" (click)="setView('calendar')"
                  aria-label="Vista de calendario" [attr.aria-pressed]="activeView === 'calendar'">
            <ion-icon name="calendar-outline" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </div>

      <ion-refresher slot="fixed" (ionRefresh)="load($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div *ngIf="loading">
        <div *ngFor="let i of skeletonCards" class="skeleton-card"></div>
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
  skeletonCards = [1, 2, 3, 4];
  grouped: { dayName: string; events: WeeklyEvent[] }[] = [];
  selectedType: EventType | null = null;

  // Location filter
  locationCityName: string | null = null;
  locationCountryName: string | null = null;
  availableEventCities: string[] = [];
  private locationInitialized = false;

  activeView: 'list' | 'calendar' = 'list';

  dayHeaders = DAY_HEADERS;
  displayMonth: Date = (() => { const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); return d; })();
  selectedDate: Date = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  cells: CalendarCell[] = [];

  private allLoadedEvents: WeeklyEvent[] = [];
  private filteredEvents: WeeklyEvent[] = [];
  private navSub: Subscription;

  constructor(
    private eventsService: EventsService,
    private router: Router,
    private profileService: ProfileService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
  ) {
    addIcons({ listOutline, calendarOutline, chevronBack, chevronForward, locationOutline, chevronDownOutline });
    const saved = localStorage.getItem(VIEW_KEY);
    if (saved === 'list' || saved === 'calendar') this.activeView = saved;

    const savedLocation = localStorage.getItem(LOCATION_KEY);
    if (savedLocation !== null) {
      try {
        const parsed = JSON.parse(savedLocation);
        this.locationCityName = parsed.city ?? null;
        this.locationCountryName = parsed.country ?? null;
      } catch { /* ignore malformed */ }
      this.locationInitialized = true;
    }

    this.navSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd && e.urlAfterRedirects === '/tabs/home'),
    ).subscribe(() => this.load(null));
  }

  get locationLabel(): string {
    if (this.locationCityName) return this.locationCityName;
    if (this.locationCountryName) return this.locationCountryName;
    return 'Todas las ciudades';
  }

  async openLocationPicker() {
    // Check if we have events loaded
    if (this.allLoadedEvents.length === 0) {
      // Try to load events first
      this.load(null);
      return;
    }

    // Build country → cities map from loaded events
    const countryMap = new Map<string, Set<string>>();
    for (const ev of this.allLoadedEvents) {
      const country = ev.venue?.country ?? 'Sin país';
      const city = ev.venue?.city;
      if (!countryMap.has(country)) countryMap.set(country, new Set());
      if (city) countryMap.get(country)!.add(city);
    }

    // Convert to country options for the modal
    const countryOptions = Array.from(countryMap.entries()).map(([name, cities]) => ({
      name,
      cityCount: cities.size
    })).sort((a, b) => a.name.localeCompare(b.name));

    // Show country picker modal
    const countryModal = await this.modalCtrl.create({
      component: CountryPickerModal,
      componentProps: {
        countries: countryOptions,
        selectedCountry: this.locationCountryName
      }
    });

    await countryModal.present();
    const { data } = await countryModal.onDidDismiss();

    if (!data) return; // User cancelled

    const { country } = data;
    
    // If user selected "All cities"
    if (country === null) {
      this.saveLocation(null, null);
      return;
    }

    // Show city picker for the selected country
    const cities = Array.from(countryMap.get(country) || []).sort();
    
    // If country has no cities (shouldn't happen but defensive)
    if (cities.length === 0) {
      this.saveLocation(null, country);
      return;
    }
    
    const cityModal = await this.modalCtrl.create({
      component: CityPickerModal,
      componentProps: {
        country,
        cities,
        selectedCity: this.locationCityName
      }
    });

    await cityModal.present();
    const cityResult = await cityModal.onDidDismiss();

    if (!cityResult.data) {
      // User went back from city picker, show country picker again
      this.openLocationPicker();
      return;
    }

    const { city, goBack } = cityResult.data;
    
    if (goBack) {
      // User clicked back button, show country picker again
      this.openLocationPicker();
      return;
    }

    this.saveLocation(city, country);
  }

  private saveLocation(city: string | null, country: string | null) {
    localStorage.setItem(LOCATION_KEY, JSON.stringify({ city, country }));
    this.locationCityName = city;
    this.locationCountryName = country;
    this.applyFilters();
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

  load(refresher: any) {
    if (!this.locationInitialized) {
      this.loading = true;
      this.profileService.getProfile().subscribe({
        next: (p) => {
          this.locationCityName = p.city?.name ?? null;
          localStorage.setItem(LOCATION_KEY, JSON.stringify({ city: this.locationCityName, country: null }));
          this.locationInitialized = true;
          this.doLoad(refresher);
        },
        error: () => {
          this.locationInitialized = true;
          this.doLoad(refresher);
        },
      });
      return;
    }
    this.doLoad(refresher);
  }

  private doLoad(refresher: any) {
    this.loading = !refresher;
    this.error = '';
    this.eventsService.getWeeklyEvents(this.selectedType ?? undefined).subscribe({
      next: (events) => {
        this.allLoadedEvents = events;
        this.availableEventCities = [...new Set(
          events.map(e => e.venue?.city).filter((c): c is string => !!c)
        )].sort();
        
        // Build country → cities map to validate selections
        const countryMap = new Map<string, Set<string>>();
        for (const ev of events) {
          const country = ev.venue?.country ?? 'Sin país';
          const city = ev.venue?.city;
          if (!countryMap.has(country)) countryMap.set(country, new Set());
          if (city) countryMap.get(country)!.add(city);
        }
        
        // Validate current location selection
        if (this.locationCityName) {
          // Check if the selected city exists in any country
          let cityFound = false;
          for (const cities of countryMap.values()) {
            if (cities.has(this.locationCityName!)) {
              cityFound = true;
              break;
            }
          }
          if (!cityFound) {
            this.locationCityName = null;
            this.locationCountryName = null;
            localStorage.setItem(LOCATION_KEY, JSON.stringify({ city: null, country: null }));
          }
        } else if (this.locationCountryName) {
          // Check if the selected country exists
          if (!countryMap.has(this.locationCountryName)) {
            this.locationCityName = null;
            this.locationCountryName = null;
            localStorage.setItem(LOCATION_KEY, JSON.stringify({ city: null, country: null }));
          }
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
    if (this.locationCityName) {
      this.filteredEvents = this.allLoadedEvents.filter(e => e.venue?.city === this.locationCityName);
    } else if (this.locationCountryName) {
      this.filteredEvents = this.allLoadedEvents.filter(e => e.venue?.country === this.locationCountryName);
    } else {
      this.filteredEvents = this.allLoadedEvents;
    }
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
        colors.push(TYPE_DOT_COLOR[ev.type] ?? 'var(--lgui-surface-5)');
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
