import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons,
  IonSpinner, IonText, IonChip, IonLabel, IonToast, IonButton,
} from '@ionic/angular/standalone';
import { WeeklyEvent, EventAnalytics, VoteEstado } from '@shared/types';
import { EventsService } from '../../services/events.service';
import { VotesService } from '../../services/votes.service';
import { environment } from '../../../environments/environment';
import { AnalyticsPanelComponent } from '../../components/analytics-panel/analytics-panel.component';
import { ReplacePipe } from '../../pipes/replace.pipe';

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const TIPO_LABEL: Record<string, string> = {
  social:    'Social',
  intensivo: 'Intensivo',
  congreso:  'Congreso',
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
    .tipo-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: var(--lgui-radius-pill);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .tipo-social    { color: var(--tipo-social-color);   background: var(--tipo-social-bg); }
    .tipo-intensivo { color: var(--tipo-taller-color);   background: var(--tipo-taller-bg); }
    .tipo-congreso  { color: var(--tipo-congreso-color); background: var(--tipo-congreso-bg); }
    .aforo-info {
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
    .vote-btn.active-voy     { background: #E84855; border-color: #E84855; color: #fff; }
    .vote-btn.active-tal-vez { background: #EFC42C; border-color: #EFC42C; color: #fff; }
    .vote-btn.active-no-voy  { background: #BAC0CC; border-color: #BAC0CC; color: #fff; }
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
        <ion-title>{{ event?.venue?.nombre ?? 'Evento' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div *ngIf="loading" class="ion-text-center" style="padding-top: 60px;">
        <ion-spinner color="primary"></ion-spinner>
      </div>

      <div *ngIf="event && !loading">

        <!-- Foto — edge-to-edge, bleeds into padding -->
        <img *ngIf="photoSrc" class="event-photo" [src]="photoSrc" [alt]="event.venue.nombre" />
        <div *ngIf="!photoSrc" class="photo-placeholder">🎵</div>

        <!-- Event info -->
        <div class="event-venue">{{ event.venue.nombre }}</div>
        <div class="event-when">{{ dayName }} · {{ event.horaInicio?.substring(0, 5) }}</div>

        <!-- Tipo + Aforo -->
        <div class="meta-row">
          <span *ngIf="event.tipo" class="tipo-badge" [ngClass]="'tipo-' + event.tipo">{{ tipoLabel }}</span>
          <span *ngIf="event.venue.aforoMaximo" class="aforo-info">
            🏟 {{ event.venue.aforoMaximo }} aforo
          </span>
        </div>

        <div class="chips-row">
          <ion-chip *ngFor="let e of event.estilos" color="secondary">
            <ion-label>{{ e | replace:'_':' ' }}</ion-label>
          </ion-chip>
        </div>

        <!-- Social extras -->
        <ng-container *ngIf="event.tipo === 'social'">
          <div *ngIf="event.tallerIncluido" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">🎓 Incluye taller</div>
          <div *ngIf="event.precioEntrada" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">🎟 Entrada: {{ event.precioEntrada }}€</div>
          <div *ngIf="event.instructores?.length" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:8px;">🎤 {{ event.instructores!.join(', ') }}</div>
        </ng-container>

        <!-- Intensivo extras -->
        <ng-container *ngIf="event.tipo === 'intensivo'">
          <div *ngIf="event.titulo" style="font-size:16px; font-weight:600; color:var(--lgui-text-4); margin-bottom:4px;">{{ event.titulo }}</div>
          <div *ngIf="event.nivel" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📊 Nivel: {{ event.nivel | replace:'_':' ' }}</div>
          <div *ngIf="event.precio" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">💶 {{ event.precio }}€</div>
          <div *ngIf="event.profesores?.length" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">👨‍🏫 {{ event.profesores!.join(', ') }}</div>
          <div *ngIf="event.fechaInicio" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📅 {{ event.fechaInicio }}<span *ngIf="event.fechaFin"> → {{ event.fechaFin }}</span></div>
        </ng-container>

        <!-- Congreso extras -->
        <ng-container *ngIf="event.tipo === 'congreso'">
          <div *ngIf="event.titulo" style="font-size:16px; font-weight:600; color:var(--lgui-text-4); margin-bottom:4px;">{{ event.titulo }}</div>
          <div *ngIf="event.localidad" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📍 {{ event.localidad }}</div>
          <div *ngIf="event.duracionDias" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">📅 {{ event.duracionDias }} días</div>
          <div *ngIf="event.precios" style="font-size:13px; color:var(--lgui-text-3); margin-bottom:4px;">💶 {{ event.precios }}</div>
          <div *ngIf="event.enlaceWeb" style="margin-bottom:8px;">
            <ion-button fill="outline" size="small" (click)="openLink(event.enlaceWeb!)">🌐 Web oficial</ion-button>
          </div>
        </ng-container>

        <div class="interested-count">{{ event.totalInteresados }} personas interesadas</div>

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
              [class.active-voy]="event.userVote === 'voy'"
              [disabled]="voting || !canEdit"
              (click)="vote('voy')">♥ Voy</button>
            <button class="vote-btn"
              [class.active-tal-vez]="event.userVote === 'tal_vez'"
              [disabled]="voting || !canEdit"
              (click)="vote('tal_vez')">~ Tal vez</button>
            <button class="vote-btn"
              [class.active-no-voy]="event.userVote === 'no_voy'"
              [disabled]="voting || !canEdit"
              (click)="vote('no_voy')">✕ No iré</button>
          </div>

          <div *ngIf="!canEdit" class="no-edit-note">
            Voto bloqueado — menos de 2h antes del evento.
          </div>
        </div>

        <!-- Analytics (unlocked after voy/tal_vez) -->
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
        if (ev.userVote === 'voy' || ev.userVote === 'tal_vez') {
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
    const url = this.event?.fotoUrl;
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return environment.socketUrl + url;
  }

  get mapsUrl(): string | null {
    if (!this.event?.venue) return null;
    const { lat, lng, nombre, ciudad } = this.event.venue;
    if (lat && lng) return `https://maps.google.com/?q=${lat},${lng}`;
    const q = [nombre, ciudad].filter(Boolean).join(' ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }

  openMaps(): void {
    if (this.mapsUrl) window.open(this.mapsUrl, '_blank');
  }

  shareWhatsApp(): void {
    if (!this.event) return;
    const venue = this.event.venue?.nombre ?? '';
    const tipo  = this.tipoLabel;
    // title: use event titulo if available, else venue name
    const title = this.event.titulo || venue;
    // trim seconds from "21:00:00" → "21:00"
    const time  = (this.event.horaInicio ?? '').substring(0, 5);
    let desc = '';
    if (this.event.diaSemana != null && this.event.horaInicio) {
      desc = `${tipo} \u00B7 ${this.dayName} a las ${time}`;
    } else if (this.event.fechaInicio) {
      const range = this.event.fechaFin
        ? `${this.event.fechaInicio} \u2014 ${this.event.fechaFin}`
        : this.event.fechaInicio;
      desc = `${tipo} \u00B7 ${range}`;
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

  get tipoLabel(): string {
    return TIPO_LABEL[this.event?.tipo ?? ''] ?? (this.event?.tipo ?? '');
  }

  vote(estado: VoteEstado) {
    if (!this.event || this.voting) return;
    this.voting = true;
    const existingVoteId = this.event.userVoteId;

    const request$ = existingVoteId
      ? this.votesService.updateVote(existingVoteId, estado)
      : this.votesService.castVote(this.event.id, estado);

    request$.subscribe({
      next: (vote) => {
        this.voting = false;
        if (this.event) {
          this.event = { ...this.event, userVote: estado, userVoteId: vote.id };
        }
        if (estado === 'voy' || estado === 'tal_vez') {
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
