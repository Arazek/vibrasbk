import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonSpinner,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, chevronForward } from 'ionicons/icons';
import { WeeklyEvent } from '@shared/types';
import { EventsService } from '../../services/events.service';
import { EventCardComponent } from '../../components/event-card/event-card.component';

const DAY_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const DAY_NAMES_FULL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

interface CalendarCell {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  dots: string[]; /* tipo colors for this day */
}

/** Returns the Monday of the ISO week containing `date`. */
function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

const TIPO_DOT_COLOR: Record<string, string> = {
  social:   '#4A90D9',
  intensivo: '#D07A2E',
  congreso: '#7B52AB',
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon, IonSpinner,
    EventCardComponent,
  ],
  styles: [`
    /* ── Month header ─────────────────────────────── */
    .month-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--lgui-pad-sm) var(--lgui-pad-md) var(--lgui-gap-sm);
    }
    .month-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--lgui-text-4);
    }

    /* ── Grid ─────────────────────────────────────── */
    .day-headers {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 var(--lgui-pad-md);
      margin-bottom: 2px;
    }
    .day-header-cell {
      text-align: center;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--lgui-text-3);
      padding: 4px 0;
    }
    .cal-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: 0 var(--lgui-pad-md);
      gap: 2px 0;
    }
    .cal-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3px 0 4px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .cal-cell.out-month .day-num { opacity: 0.28; }

    /* Day number circle */
    .day-num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--lgui-text-4);
      transition: background 0.12s;
    }
    .cal-cell.today .day-num {
      background: var(--lgui-surface-3);
      font-weight: 700;
    }
    .cal-cell.selected .day-num {
      background: var(--ion-color-primary);
      color: #fff;
      font-weight: 700;
    }
    .cal-cell.selected.today .day-num {
      background: var(--ion-color-primary);
    }

    /* Event dots */
    .dots-row {
      display: flex;
      gap: 3px;
      margin-top: 2px;
      height: 5px;
      align-items: center;
    }
    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ── Selected day events ──────────────────────── */
    .divider {
      height: 1px;
      background: var(--lgui-border-2);
      margin: var(--lgui-gap-md) var(--lgui-pad-md) 0;
    }
    .selected-label {
      padding: var(--lgui-gap-md) var(--lgui-pad-md) var(--lgui-gap-sm);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--lgui-text-3);
    }
    .no-events {
      text-align: center;
      padding: var(--lgui-space-6) var(--lgui-pad-md);
      font-size: 14px;
      color: var(--lgui-text-3);
    }
    .bottom-space { height: var(--lgui-space-8); }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="goBack()">
            <ion-icon slot="start" name="chevron-back"></ion-icon>
            Agenda
          </ion-button>
        </ion-buttons>
        <ion-title>Calendario</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Loading -->
      <div *ngIf="loading" style="display:flex;justify-content:center;padding:40px 0">
        <ion-spinner color="primary"></ion-spinner>
      </div>

      <div *ngIf="!loading">

        <!-- Month navigation -->
        <div class="month-nav">
          <ion-button fill="clear" size="small" (click)="prevMonth()">
            <ion-icon slot="icon-only" name="chevron-back"></ion-icon>
          </ion-button>
          <span class="month-title">{{ monthTitle }}</span>
          <ion-button fill="clear" size="small" (click)="nextMonth()">
            <ion-icon slot="icon-only" name="chevron-forward"></ion-icon>
          </ion-button>
        </div>

        <!-- Day-of-week headers -->
        <div class="day-headers">
          <div *ngFor="let h of dayHeaders" class="day-header-cell">{{ h }}</div>
        </div>

        <!-- Calendar grid -->
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

        <div class="divider"></div>

        <!-- Selected day label -->
        <div class="selected-label">{{ selectedDayLabel }}</div>

        <!-- Events for selected day -->
        <app-event-card
          *ngFor="let ev of selectedEvents"
          [event]="ev">
        </app-event-card>

        <div *ngIf="selectedEvents.length === 0" class="no-events">
          Sin eventos este día 🎵
        </div>

        <div class="bottom-space"></div>
      </div>
    </ion-content>
  `,
})
export class CalendarPage {
  loading = true;
  events: WeeklyEvent[] = [];

  dayHeaders = DAY_HEADERS;

  /** First day of the displayed month */
  displayMonth: Date = new Date();
  selectedDate: Date = new Date();

  cells: CalendarCell[] = [];

  constructor(
    private eventsService: EventsService,
    private navCtrl: NavController,
  ) {
    addIcons({ chevronBack, chevronForward });
    // Normalise to first of month
    this.displayMonth.setDate(1);
    this.displayMonth.setHours(0, 0, 0, 0);
    this.selectedDate.setHours(0, 0, 0, 0);
  }

  ionViewWillEnter() {
    this.eventsService.getWeeklyEvents().subscribe({
      next: (evs) => {
        this.events = evs;
        this.loading = false;
        this.buildCells();
      },
      error: () => { this.loading = false; },
    });
  }

  goBack() { this.navCtrl.navigateBack('/tabs/home'); }

  get monthTitle(): string {
    return `${MONTH_NAMES[this.displayMonth.getMonth()]} ${this.displayMonth.getFullYear()}`;
  }

  prevMonth() {
    this.displayMonth = new Date(
      this.displayMonth.getFullYear(),
      this.displayMonth.getMonth() - 1,
      1
    );
    this.buildCells();
  }

  nextMonth() {
    this.displayMonth = new Date(
      this.displayMonth.getFullYear(),
      this.displayMonth.getMonth() + 1,
      1
    );
    this.buildCells();
  }

  selectDate(date: Date) {
    this.selectedDate = new Date(date);
  }

  isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  get selectedDayLabel(): string {
    const d = this.selectedDate;
    const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1; // 0=Mon
    return `${DAY_NAMES_FULL[dayIdx]} ${d.getDate()} de ${MONTH_NAMES[d.getMonth()].toLowerCase()}`;
  }

  get selectedEvents(): WeeklyEvent[] {
    return this.eventsForDate(this.selectedDate);
  }

  // ── Grid builder ──────────────────────────────────────────────

  buildCells() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = this.displayMonth.getFullYear();
    const month = this.displayMonth.getMonth();

    // First cell: Monday of the week that contains the 1st of the month
    const firstOfMonth = new Date(year, month, 1);
    const startCell = getMondayOfWeek(firstOfMonth);

    // Build 6 weeks × 7 days = 42 cells
    this.cells = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startCell);
      date.setDate(startCell.getDate() + i);

      const inMonth = date.getMonth() === month;
      const isToday = this.isSameDay(date, today);
      const dots = this.dotsForDate(date);

      this.cells.push({ date, inMonth, isToday, dots });
    }

    // Trim trailing empty rows (if the last row is all out-of-month)
    while (this.cells.length > 35) {
      const lastRow = this.cells.slice(-7);
      if (lastRow.every(c => !c.inMonth)) {
        this.cells.splice(-7);
      } else {
        break;
      }
    }
  }

  /**
   * Returns dot colors for a given date.
   * Since events are weekly recurring, an event with diaSemana=X
   * occurs on every week's X-th day (0=Mon…6=Sun).
   * We normalise the date's day-of-week to 0=Mon…6=Sun and match.
   */
  private dotsForDate(date: Date): string[] {
    const jsDay = date.getDay(); // 0=Sun…6=Sat
    const normalised = jsDay === 0 ? 6 : jsDay - 1; // 0=Mon…6=Sun

    const colors: string[] = [];
    const seen = new Set<string>(); // one dot per tipo
    for (const ev of this.events) {
      if ((ev.diaSemana ?? -1) === normalised) {
        const color = TIPO_DOT_COLOR[ev.tipo] ?? '#BAC0CC';
        if (!seen.has(color)) {
          seen.add(color);
          colors.push(color);
        }
      }
    }
    return colors;
  }

  /** Events for a specific date (matched by day-of-week). */
  private eventsForDate(date: Date): WeeklyEvent[] {
    const jsDay = date.getDay();
    const normalised = jsDay === 0 ? 6 : jsDay - 1;
    return this.events.filter(ev => (ev.diaSemana ?? -1) === normalised);
  }
}
