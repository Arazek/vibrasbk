import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons,
  IonSpinner, IonText, IonChip, IonLabel, IonToast, IonButton,
} from '@ionic/angular/standalone';
import { WeeklyEvent, EventAnalytics, VoteStatus } from '@shared/types';
import { EventsService } from '../../services/events.service';
import { VotesService } from '../../services/votes.service';
import { environment } from '../../../environments/environment';
import { AnalyticsPanelComponent } from '../../components/analytics-panel/analytics-panel.component';
import { ReplacePipe } from '../../pipes/replace.pipe';

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const TYPE_LABEL: Record<string, string> = {
  social:    'Social',
  intensive: 'Intensivo',
  congress:  'Congreso',
};

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons,
    IonSpinner, IonText, IonChip, IonLabel, IonToast, IonButton,
    AnalyticsPanelComponent, ReplacePipe,
  ],
  styles: [`
    .event-photo {
      width: calc(100% + 32px);
      margin: -16px -16px var(--lgui-gap-lg);
      max-height: 220px;
      object-fit: cover;
      display: block;
    }
    .photo-placeholder {
      width: calc(100% + 32px);
      margin: -16px -16px var(--lgui-gap-lg);
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      background: linear-gradient(135deg, var(--lgui-surface-3) 0%, var(--lgui-surface-4) 100%);
    }
    .event-venue {
      font-size: 22px;
      font-weight: 700;
      color: var(--lgui-text-4);
      margin-bottom: var(--lgui-space-1);
      line-height: 1.2;
    }
    .event-when {
      font-size: 14px;
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-md);
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-sm);
      margin-bottom: var(--lgui-gap-md);
      flex-wrap: wrap;
    }
    .type-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: var(--lgui-radius-pill);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .type-social    { color: var(--type-social-color);    background: var(--type-social-bg); }
    .type-intensive { color: var(--type-intensive-color); background: var(--type-intensive-bg); }
    .type-congress  { color: var(--type-congress-color);  background: var(--type-congress-bg); }
    .capacity-info {
      font-size: 12px;
      color: var(--lgui-text-3);
    }
    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lgui-gap-xs);
      margin-bottom: var(--lgui-gap-md);
    }
    .interested-count {
      font-size: 13px;
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-md);
    }
    .maps-btn-row {
      margin-bottom: 0;
    }
    .section-divider {
      height: 1px;
      background: var(--lgui-border-2);
      margin: var(--lgui-gap-xl) 0;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-md);
    }
    .vote-section {
      margin-bottom: var(--lgui-gap-xl);
    }
    /* Custom vote buttons */
    .vote-buttons {
      display: flex;
      gap: 8px;
    }
    .vote-btn {
      flex: 1;
      padding: 10px 6px;
      border-radius: var(--lgui-radius-default);
      border: 1.5px solid var(--lgui-border-3);
      background: var(--lgui-surface-2);
      color: var(--lgui-text-3);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .vote-btn:disabled { opacity: 0.45; cursor: default; }
    .vote-btn.active-going     { background: #E84855; border-color: #E84855; color: #fff; }
    .vote-btn.active-maybe     { background: #EFC42C; border-color: #EFC42C; color: #fff; }
    .vote-btn.active-not-going { background: #BAC0CC; border-color: #BAC0CC; color: #fff; }
    .no-edit-note {
      font-size: 12px;
      color: var(--lgui-text-3);
      margin-top: var(--lgui-gap-sm);
      text-align: center;
    }
    .lock-hint {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-md);
      background: var(--lgui-surface-3);
      border-radius: var(--lgui-radius-default);
      margin-top: var(--lgui-gap-lg);
    }
    .lock-icon {
      font-size: 28px;
      flex-shrink: 0;
    }
    .lock-text {
      font-size: 13px;
      color: var(--lgui-text-3);
      line-height: 1.5;
    }
    .bottom-space {
      height: var(--lgui-space-8);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ event?.venue?.name ?? 'Evento' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div *ngIf="loading" class="ion-text-center" style="padding-top: 60px;">
        <ion-spinner color="primary"></ion-spinner>
      </div>

      <div *ngIf="event && !loading">

        <!-- Foto — edge-to-edge, bleeds into padding -->
        <img *ngIf="photoSrc" class="event-photo" [src]="photoSrc" [alt]="event.venue.name" />
        <div *ngIf="!photoSrc" class="photo-placeholder">🎵</div>

        <!-- Event info -->
        <div class="event-venue">{{ event.venue.name }}</div>
        <div class="event-when">{{ dayName }} · {{ event.startTime?.substring(0, 5) }}</div>

        <!-- Type + Capacity -->
        <div class="meta-row">
          <span *ngIf="event.type" class="type-badge" [ngClass]="'type-' + event.type">{{ typeLabel }}</span>
          <span *ngIf="event.venue.maxCapacity" class="capacity-info">
            🏟 {{ event.venue.maxCapacity }} aforo
          </span>
        </div>

        <div class="chips-row">
          <ion-chip *ngFor="let e of event.styles" color="secondary">
            <ion-label>{{ e | replace:'_':' ' }}</ion-label>
          </ion-chip>
        </div>

        <!-- Social extras -->
        <ng-container *ngIf="event.type === 'social'">
          <div *ngIf="event.workshopIncluded" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">🎓 Incluye taller</div>
          <div *ngIf="event.entryPrice" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">🎟 Entrada: {{ event.entryPrice }}€</div>
          <div *ngIf="event.instructors?.length" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:8px;">🎤 {{ event.instructors!.join(', ') }}</div>
        </ng-container>

        <!-- Intensive extras -->
        <ng-container *ngIf="event.type === 'intensive'">
          <div *ngIf="event.title" style="font-size:16px; font-weight:600; color:var(--lgui-text-4); margin-bottom:4px;">{{ event.title }}</div>
          <div *ngIf="event.level" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📊 Nivel: {{ event.level | replace:'_':' ' }}</div>
          <div *ngIf="event.instructors?.length" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">👨‍🏫 {{ event.instructors!.join(', ') }}</div>
          <div *ngIf="event.startDate" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📅 {{ event.startDate }}<span *ngIf="event.endDate"> → {{ event.endDate }}</span></div>
        </ng-container>

        <!-- Congress extras -->
        <ng-container *ngIf="event.type === 'congress'">
          <div *ngIf="event.title" style="font-size:16px; font-weight:600; color:var(--lgui-text-4); margin-bottom:4px;">{{ event.title }}</div>
          <div *ngIf="event.locality" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📍 {{ event.locality }}</div>
          <div *ngIf="event.durationDays" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📅 {{ event.durationDays }} días</div>
          <div *ngIf="event.prices" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">💶 {{ event.prices }}</div>
          <div *ngIf="event.websiteUrl" style="margin-bottom:8px;">
            <ion-button fill="outline" size="small" (click)="openLink(event.websiteUrl!)">🌐 Web oficial</ion-button>
          </div>
        </ng-container>

        <div class="interested-count">{{ event.totalInterested }} personas interesadas</div>

        <!-- Google Maps + WhatsApp share -->
        <div *ngIf="mapsUrl" class="maps-btn-row">
          <ion-button expand="block" fill="outline" color="primary" (click)="openMaps()">
            📍 ¿Cómo llegar?
          </ion-button>
        </div>
        <div style="margin-top: 8px;">
          <ion-button expand="block" fill="outline" color="success" (click)="shareWhatsApp()">
            📲 Compartir en WhatsApp
          </ion-button>
        </div>

        <div class="section-divider"></div>

        <!-- Vote section -->
        <div class="vote-section">
          <div class="section-title">¿Irás a este evento?</div>

          <div class="vote-buttons">
            <button class="vote-btn"
              [class.active-going]="event.userVote === 'going'"
              [disabled]="voting || !canEdit"
              (click)="vote('going')">♥ Voy</button>
            <button class="vote-btn"
              [class.active-maybe]="event.userVote === 'maybe'"
              [disabled]="voting || !canEdit"
              (click)="vote('maybe')">~ Tal vez</button>
            <button class="vote-btn"
              [class.active-not-going]="event.userVote === 'not_going'"
              [disabled]="voting || !canEdit"
              (click)="vote('not_going')">✕ No iré</button>
          </div>

          <div *ngIf="!canEdit" class="no-edit-note">
            Voto bloqueado — menos de 2h antes del evento.
          </div>
        </div>

        <!-- Analytics (unlocked after going/maybe) -->
        <app-analytics-panel *ngIf="analytics" [analytics]="analytics"></app-analytics-panel>

        <div *ngIf="analyticsLoading" class="ion-text-center">
          <ion-spinner name="dots" color="primary"></ion-spinner>
        </div>

        <div *ngIf="showAnalyticsHint && !analytics && !analyticsLoading" class="lock-hint">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">
            Vota <strong>Voy</strong> o <strong>Tal vez</strong> para desbloquear
            la predicción del ambiente.
          </div>
        </div>

        <div class="bottom-space"></div>
      </div>

      <ion-toast
        [isOpen]="!!toastMsg"
        [message]="toastMsg"
        duration="2500"
        (didDismiss)="toastMsg = ''">
      </ion-toast>
    </ion-content>
  `,
})
export class EventDetailPage implements OnInit {
  event: WeeklyEvent | null = null;
  analytics: EventAnalytics | null = null;
  loading = true;
  voting = false;
  analyticsLoading = false;
  showAnalyticsHint = false;
  toastMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private votesService: VotesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.eventsService.getEventDetail(id).subscribe({
      next: (ev) => {
        this.event = ev as WeeklyEvent;
        this.loading = false;
        this.showAnalyticsHint = true;
        if (ev.userVote === 'going' || ev.userVote === 'maybe') {
          this.loadAnalytics(id);
        }
      },
      error: () => {
        this.loading = false;
        this.toastMsg = 'No se pudo cargar el evento.';
      },
    });
  }

  get photoSrc(): string | null {
    const url = this.event?.photoUrl;
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return environment.socketUrl + url;
  }

  get mapsUrl(): string | null {
    if (!this.event?.venue) return null;
    const { lat, lng, name, city } = this.event.venue;
    if (lat && lng) return `https://maps.google.com/?q=${lat},${lng}`;
    const q = [name, city].filter(Boolean).join(' ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }

  openMaps(): void {
    if (this.mapsUrl) window.open(this.mapsUrl, '_blank');
  }

  shareWhatsApp(): void {
    if (!this.event) return;
    const venue = this.event.venue?.name ?? '';
    const type  = this.typeLabel;
    // title: use event title if available, else venue name
    const title = this.event.title || venue;
    // trim seconds from "21:00:00" → "21:00"
    const time  = (this.event.startTime ?? '').substring(0, 5);
    let desc = '';
    if (this.event.dayOfWeek != null && this.event.startTime) {
      desc = `${type} \u00B7 ${this.dayName} a las ${time}`;
    } else if (this.event.startDate) {
      const range = this.event.endDate
        ? `${this.event.startDate} \u2014 ${this.event.endDate}`
        : this.event.startDate;
      desc = `${type} \u00B7 ${range}`;
    }
    const textLines = [title, desc, this.mapsUrl, this.photoSrc].filter(Boolean) as string[];
    const fallbackText = textLines.join('\n');
    // Web Share API: attach the image file directly (works on mobile browsers)
    if (this.photoSrc && typeof navigator.share === 'function') {
      void this.shareNative(title, desc, fallbackText);
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(fallbackText)}`, '_blank');
  }

  private async shareNative(title: string, desc: string, fallbackText: string): Promise<void> {
    try {
      const response = await fetch(this.photoSrc!);
      const blob     = await response.blob();
      const ext  = blob.type.includes('png') ? 'png' : 'jpg';
      const file = new File([blob], `evento.${ext}`, { type: blob.type });
      if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        await navigator.share({ title, text: desc, files: [file] });
        return;
      }
      // files not supported — share text only
      await navigator.share({ title, text: fallbackText });
    } catch {
      // AbortError (user cancelled) or fetch error — fallback to wa.me
      window.open(`https://wa.me/?text=${encodeURIComponent(fallbackText)}`, '_blank');
    }
  }

  openLink(url: string): void {
    window.open(url.startsWith('http') ? url : 'https://' + url, '_blank');
  }

  get canEdit(): boolean {
    if (!this.event) return false;
    const start = new Date(this.event.eventStart);
    return new Date() < new Date(start.getTime() - 2 * 60 * 60 * 1000);
  }

  get dayName(): string {
    if (!this.event) return '';
    const d = new Date(this.event.eventDate).getDay();
    return DAY_NAMES[d === 0 ? 6 : d - 1];
  }

  get typeLabel(): string {
    return TYPE_LABEL[this.event?.type ?? ''] ?? (this.event?.type ?? '');
  }

  vote(status: VoteStatus) {
    if (!this.event || this.voting) return;
    this.voting = true;
    const existingVoteId = this.event.userVoteId;

    const request$ = existingVoteId
      ? this.votesService.updateVote(existingVoteId, status)
      : this.votesService.castVote(this.event.id, status);

    request$.subscribe({
      next: (vote) => {
        this.voting = false;
        if (this.event) {
          this.event = { ...this.event, userVote: status, userVoteId: vote.id };
        }
        if (status === 'going' || status === 'maybe') {
          this.loadAnalytics(this.event!.id);
        } else {
          this.analytics = null;
        }
      },
      error: (err) => {
        this.voting = false;
        this.toastMsg = err?.error?.message ?? 'Error al votar.';
      },
    });
  }

  private loadAnalytics(eventId: string) {
    this.analyticsLoading = true;
    this.eventsService.getAnalytics(eventId).subscribe({
      next: (a) => {
        this.analytics = a;
        this.analyticsLoading = false;
      },
      error: () => {
        this.analyticsLoading = false;
      },
    });
  }
}
