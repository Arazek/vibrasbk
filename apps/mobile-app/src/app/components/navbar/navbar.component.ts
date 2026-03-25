import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { WeeklyEvent } from '@shared/types';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonIcon],
  styles: [`
    ion-toolbar {
      --padding-start: var(--lgui-pad-md);
      --padding-end: var(--lgui-pad-md);

    }

    .navbar-inner {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      width: 100%;
    }

    .nav-logo {
      height: 1.6rem;
      cursor: pointer;
      flex-shrink: 0;
    }

    .search-wrap {
      flex: 1;
      position: relative;
    }

    .search-input {
      width: 100%;
      height: 2.25rem;
      padding: 0 var(--lgui-pad-md);
      border-radius: var(--lgui-radius-pill);
      border: none;
      outline: none;
      background: var(--lgui-surface-3);
      color: var(--lgui-text-4);
      font-size: var(--lgui-fs-body);
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--lgui-text-3);
    }

    .search-dropdown {
      position: fixed;
      top: calc(56px + env(safe-area-inset-top, 0px));
      left: var(--lgui-pad-md);
      right: var(--lgui-pad-md);
      background: var(--lgui-surface-1);
      border-radius: var(--lgui-radius-default);
      box-shadow: var(--lgui-shadow-lg);
      overflow: hidden;
      z-index: 9999;
    }

    .search-item {
      display: flex;
      flex-direction: column;
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      cursor: pointer;
      border-bottom: 0.0625rem solid var(--lgui-border-2);
    }

    .search-item:last-child {
      border-bottom: none;
    }

    .search-item:active,
    .search-item:hover {
      background: var(--lgui-surface-3);
    }

    .search-primary {
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .search-secondary {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-profile-btn {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background: var(--lgui-surface-3);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      color: var(--lgui-text-4);
      font-size: 1.125rem;
      -webkit-tap-highlight-color: transparent;
    }

    .nav-profile-btn:active {
      background: var(--lgui-surface-4);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <div class="navbar-inner">
          <img
            class="nav-logo"
            src="assets/sbk.png"
            alt="SBK"
            (click)="goHome()"
          />

          <div class="search-wrap">
            <input
              class="search-input"
              type="search"
              placeholder="Buscar eventos..."
              [value]="query"
              (focus)="onFocus()"
              (input)="onInput($event)"
              (blur)="onBlur()"
            />
          </div>

          <button class="nav-profile-btn" (click)="goProfile()">
            <ion-icon name="person-outline"></ion-icon>
          </button>
        </div>
      </ion-toolbar>
    </ion-header>

    <div class="search-dropdown" *ngIf="showDropdown && results.length > 0">
      <div
        class="search-item"
        *ngFor="let ev of results"
        (mousedown)="selectResult(ev)">
        <span class="search-primary">{{ ev.venue.name }}</span>
        <span class="search-secondary">{{ ev.eventStart | slice:0:16 }} · {{ ev.styles.join(', ') }}</span>
      </div>
    </div>
  `,
})
export class NavbarComponent {
  query = '';
  results: WeeklyEvent[] = [];
  showDropdown = false;

  private allEvents: WeeklyEvent[] | null = null;
  private blurTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private router: Router, private eventsService: EventsService) {
    addIcons({ personOutline });
  }

  goHome() {
    this.router.navigate(['/tabs/home']);
  }

  goProfile() {
    this.router.navigate(['/tabs/profile']);
  }

  onFocus() {
    if (this.allEvents === null) {
      this.eventsService.getWeeklyEvents().subscribe({
        next: (events) => {
          this.allEvents = events;
          this.filter();
        },
        error: () => {
          this.allEvents = [];
        },
      });
    } else {
      this.filter();
    }
    this.showDropdown = true;
  }

  onInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.filter();
    this.showDropdown = true;
  }

  onBlur() {
    this.blurTimer = setTimeout(() => {
      this.showDropdown = false;
      this.query = '';
      this.results = [];
    }, 150);
  }

  selectResult(ev: WeeklyEvent) {
    if (this.blurTimer !== null) {
      clearTimeout(this.blurTimer);
      this.blurTimer = null;
    }
    this.showDropdown = false;
    this.query = '';
    this.results = [];
    this.router.navigate(['/event', ev.id]);
  }

  private filter() {
    if (!this.allEvents) {
      this.results = [];
      return;
    }
    const q = this.query.trim().toLowerCase();
    if (!q) {
      this.results = this.allEvents.slice(0, 8);
      return;
    }
    this.results = this.allEvents
      .filter(ev => {
        return (
          ev.venue?.name?.toLowerCase().includes(q) ||
          ev.styles?.some(s => s.toLowerCase().includes(q)) ||
          ev.name?.toLowerCase().includes(q) ||
          ev.title?.toLowerCase().includes(q)
        );
      })
      .slice(0, 8);
  }
}
