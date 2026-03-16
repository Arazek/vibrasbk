import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { ReplacePipe } from '../../pipes/replace.pipe';
import { WeeklyEvent, Ambiente } from '@shared/types';
import { environment } from '../../../environments/environment';

/* LanguageGUI System Colors — matches CSS variables in theme/variables.css */
const AMBIENTE_COLOR: Record<Ambiente, string> = {
  flojo:     '#BAC0CC',
  normal:    '#EFC42C',
  animado:   '#4AD562',
  muy_lleno: '#FE566B',
};

const AMBIENTE_LABEL: Record<Ambiente, string> = {
  flojo:     'Flojo',
  normal:    'Normal',
  animado:   'Animado',
  muy_lleno: 'Muy lleno',
};

const AMBIENTE_EMOJI: Record<Ambiente, string> = {
  flojo:     '😴',
  normal:    '🙂',
  animado:   '🔥',
  muy_lleno: '🎉',
};

const VOTE_LABEL: Record<string, string> = {
  voy:     '♥ Voy',
  tal_vez: '~ Tal vez',
  no_voy:  '✕ No iré',
};

const VOTE_COLOR: Record<string, string> = {
  voy:     '#E84855',
  tal_vez: '#EFC42C',
  no_voy:  '#BAC0CC',
};

const TIPO_LABEL: Record<string, string> = {
  social:    'Social',
  intensivo: 'Intensivo',
  congreso:  'Congreso',
};

const TIPO_COLOR: Record<string, string> = {
  social:    'var(--tipo-social-color, #4A90D9)',
  intensivo: 'var(--tipo-taller-color, #D07A2E)',
  congreso:  'var(--tipo-congreso-color, #7B52AB)',
};

const TIPO_BG: Record<string, string> = {
  social:    'var(--tipo-social-bg, #E3EFFF)',
  intensivo: 'var(--tipo-taller-bg, #FFF3E6)',
  congreso:  'var(--tipo-congreso-bg, #F3EEFF)',
};

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, IonChip, IonLabel, ReplacePipe],
  styles: [`
    :host {
      display: block;
    }
    /* Card is now column: photo on top, then content row below */
    .card-wrapper {
      margin: var(--lgui-gap-sm) var(--lgui-gap-lg);
      border-radius: var(--lgui-radius-default);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--lgui-shadow-md);
      background: var(--lgui-surface-1);
      cursor: pointer;
      transition: box-shadow 0.15s ease, transform 0.12s ease;
    }
    .card-wrapper:active {
      box-shadow: var(--lgui-shadow-sm);
      transform: scale(0.985);
    }
    .event-photo {
      width: 100%;
      height: 130px;
      object-fit: cover;
      display: block;
      flex-shrink: 0;
    }
    .photo-placeholder {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      flex-shrink: 0;
      background: linear-gradient(135deg, var(--lgui-surface-3) 0%, var(--lgui-surface-4) 100%);
    }
    /* Row with accent bar + body */
    .card-row {
      display: flex;
      flex: 1;
    }
    .accent-bar {
      width: 4px;
      flex-shrink: 0;
    }
    .card-body {
      flex: 1;
      padding: var(--lgui-pad-sm) var(--lgui-pad-md) var(--lgui-pad-sm) var(--lgui-space-3);
      min-width: 0;
    }
    .card-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--lgui-gap-sm);
      margin-bottom: var(--lgui-gap-xs);
    }
    .venue-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--lgui-text-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event-time {
      font-size: 12px;
      color: var(--lgui-text-3);
      margin-top: 2px;
    }
    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lgui-gap-xs);
      margin-bottom: var(--lgui-gap-sm);
    }
    .footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--lgui-gap-xs);
    }
    .stats {
      font-size: 11px;
      color: var(--lgui-text-3);
    }
    .ambiente-pill {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 11px;
      font-weight: 700;
    }
    .vote-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px var(--lgui-gap-sm);
      border-radius: var(--lgui-radius-pill);
      white-space: nowrap;
    }
    .tipo-chip {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: var(--lgui-radius-pill);
      letter-spacing: 0.3px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    /* Role balance mini-bar */
    .role-mini-bar {
      display: flex;
      height: 3px;
      border-radius: 2px;
      overflow: hidden;
      margin-top: var(--lgui-space-1);
      background: var(--lgui-surface-3);
    }
    .rm-leader   { background: #4A90D9; }
    .rm-follower { background: #E84855; }
    .rm-switch   { background: #F4A261; }
  `],
  template: `
    <div class="card-wrapper" (click)="open()">

      <!-- Photo spans full width at top (layout fixed: column direction) -->
      <img *ngIf="photoSrc" class="event-photo" [src]="photoSrc" [alt]="event.venue.nombre" />
      <div *ngIf="!photoSrc" class="photo-placeholder">🎵</div>

      <!-- Accent bar + body in a row -->
      <div class="card-row">
        <div class="accent-bar" [style.background]="ambienteColor"></div>
        <div class="card-body">

          <div class="card-header-row">
            <div style="flex:1; min-width:0;">
              <div class="venue-name">{{ event.venue.nombre }}</div>
              <div class="event-time">{{ event.horaInicio?.substring(0, 5) }}</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0;">
              <span
                *ngIf="event.tipo"
                class="tipo-chip"
                [style.color]="tipoColor"
                [style.background]="tipoBg">
                {{ tipoLabel }}
              </span>
              <span
                *ngIf="event.userVote"
                class="vote-badge"
                [style.color]="voteBadgeColor"
                [style.background]="voteBadgeBg">
                {{ voteLabel }}
              </span>
            </div>
          </div>

          <div class="chips-row">
            <ion-chip *ngFor="let e of event.estilos" style="height:20px; margin:0; --background: rgba(102,111,141,0.10); --color: var(--lgui-text-3); --border-radius: 200px;">
              <ion-label style="font-size:10px; font-weight:600;">{{ e | replace:'_':' ' }}</ion-label>
            </ion-chip>
          </div>

          <div class="footer-row">
            <span class="stats">{{ event.totalInteresados }} interesados</span>
            <span class="ambiente-pill" [style.color]="ambienteColor">
              {{ ambienteEmoji }} {{ ambienteLabel }}
            </span>
          </div>

          <div *ngIf="hasRoleData" class="role-mini-bar">
            <div class="rm-leader"   [style.flex]="roleLeader"></div>
            <div class="rm-follower" [style.flex]="roleFollower"></div>
            <div class="rm-switch"   [style.flex]="roleSwitch"></div>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class EventCardComponent {
  @Input() event!: WeeklyEvent;

  constructor(private router: Router) {}

  get ambienteColor(): string {
    return AMBIENTE_COLOR[this.event.ambienteColor] ?? '#9e9e9e';
  }
  get ambienteLabel(): string {
    return AMBIENTE_LABEL[this.event.ambienteColor] ?? '';
  }
  get ambienteEmoji(): string {
    return AMBIENTE_EMOJI[this.event.ambienteColor] ?? '';
  }
  get voteLabel(): string {
    return this.event.userVote ? VOTE_LABEL[this.event.userVote] : '';
  }
  get voteBadgeColor(): string {
    return this.event.userVote ? VOTE_COLOR[this.event.userVote] : '#666';
  }
  get voteBadgeBg(): string {
    const c = this.voteBadgeColor;
    return c + '1A'; /* 10% opacity tint */
  }
  get tipoLabel(): string {
    return TIPO_LABEL[this.event.tipo] ?? this.event.tipo;
  }
  get tipoColor(): string {
    return TIPO_COLOR[this.event.tipo] ?? 'var(--lgui-text-3)';
  }
  get tipoBg(): string {
    return TIPO_BG[this.event.tipo] ?? 'var(--lgui-surface-2)';
  }

  /** Resolves fotoUrl (relative /uploads/... or absolute http) to a full URL. */
  get photoSrc(): string | null {
    const url = this.event.fotoUrl;
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return environment.socketUrl + url;
  }

  get hasRoleData(): boolean {
    return !!this.event.roleBalance && this.event.totalInteresados > 0;
  }
  get roleLeader(): number   { return this.event.roleBalance?.leadersPercent   ?? 0; }
  get roleFollower(): number { return this.event.roleBalance?.followersPercent ?? 0; }
  get roleSwitch(): number   { return this.event.roleBalance?.switchesPercent  ?? 0; }

  open(): void {
    this.router.navigate(['/event', this.event.id]);
  }
}
