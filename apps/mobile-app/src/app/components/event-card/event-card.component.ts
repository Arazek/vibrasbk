import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { ReplacePipe } from '../../pipes/replace.pipe';
import { WeeklyEvent, Vibe } from '@shared/types';
import { environment } from '../../../environments/environment';

/* CSS variable strings — theme-aware, dark mode safe */
const VIBE_COLOR: Record<Vibe, string> = {
  quiet:  'var(--vibe-quiet)',
  normal: 'var(--vibe-normal)',
  lively: 'var(--vibe-lively)',
  packed: 'var(--vibe-packed)',
};

const VIBE_LABEL: Record<Vibe, string> = {
  quiet:  'Flojo',
  normal: 'Normal',
  lively: 'Animado',
  packed: 'Muy lleno',
};

const VIBE_EMOJI: Record<Vibe, string> = {
  quiet:  '😴',
  normal: '🙂',
  lively: '🔥',
  packed: '🎉',
};

const VOTE_LABEL: Record<string, string> = {
  going:     '♥ Voy',
  maybe:     '~ Tal vez',
  not_going: '✕ No iré',
};

const VOTE_COLOR: Record<string, string> = {
  going:     'var(--vibe-packed)',
  maybe:     'var(--vibe-normal)',
  not_going: 'var(--lgui-text-3)',
};

const TYPE_LABEL: Record<string, string> = {
  social:    'Social',
  intensive: 'Intensivo',
  congress:  'Congreso',
};

const TYPE_COLOR: Record<string, string> = {
  social:    'var(--type-social-color, #4A90D9)',
  intensive: 'var(--type-intensive-color, #D07A2E)',
  congress:  'var(--type-congress-color, #7B52AB)',
};

const TYPE_BG: Record<string, string> = {
  social:    'var(--type-social-bg, #E3EFFF)',
  intensive: 'var(--type-intensive-bg, #FFF3E6)',
  congress:  'var(--type-congress-bg, #F3EEFF)',
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
      transition: box-shadow var(--lgui-transition-fast),
                  transform var(--lgui-duration-instant) var(--lgui-ease-out);
    }
    .card-wrapper:active {
      box-shadow: var(--lgui-shadow-sm);
      transform: scale(0.985);
    }
    .event-photo {
      width: 100%;
      height: 13rem;
      object-fit: cover;
      display: block;
      flex-shrink: 0;
    }
    .photo-placeholder {
      width: 100%;
      height: 13rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.875rem;
      flex-shrink: 0;
      background: linear-gradient(135deg, var(--lgui-surface-3) 0%, var(--lgui-surface-4) 100%);
    }
    /* Row with accent bar + body */
    .card-row {
      display: flex;
      flex: 1;
    }
    .accent-bar {
      width: 0.25rem;
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
      font-size: var(--lgui-fs-subheading);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event-time {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
      margin-top: 0.125rem;
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
      font-size: var(--lgui-fs-micro);
      color: var(--lgui-text-3);
    }
    .vibe-pill {
      display: flex;
      align-items: center;
      gap: 0.1875rem;
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-bold);
    }
    .vote-badge {
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-bold);
      padding: 0.125rem var(--lgui-gap-sm);
      border-radius: var(--lgui-radius-pill);
      white-space: nowrap;
    }
    .type-chip {
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-bold);
      padding: 0.125rem 0.4375rem;
      border-radius: var(--lgui-radius-pill);
      letter-spacing: 0.0187rem;
      text-transform: uppercase;
      white-space: nowrap;
    }
    /* Role balance mini-bar */
    .role-mini-bar {
      display: flex;
      height: 0.1875rem;
      border-radius: 0.125rem;
      overflow: hidden;
      margin-top: var(--lgui-space-1);
      background: var(--lgui-surface-3);
    }
    .rm-leader   { background: var(--type-social-color); }
    .rm-follower { background: var(--vibe-packed); }
    .rm-switch   { background: var(--ion-color-secondary); }
    /* Inline style overrides extracted to class */
    .card-header-meta {
      flex: 1;
      min-width: 0;
    }
    .card-header-badges {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--lgui-gap-xs);
      flex-shrink: 0;
    }
    .style-chip {
      height: 1.25rem;
      margin: 0;
      --background: rgba(102, 111, 141, 0.10);
      --color: var(--lgui-text-3);
      --border-radius: var(--lgui-radius-pill);
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-semibold);
    }
  `],
  template: `
    <div class="card-wrapper" (click)="open()">

      <!-- Photo spans full width at top (layout fixed: column direction) -->
      <img *ngIf="photoSrc" class="event-photo" [src]="photoSrc" [alt]="event.venue.name" />
      <div *ngIf="!photoSrc" class="photo-placeholder">🎵</div>

      <!-- Accent bar + body in a row -->
      <div class="card-row">
        <div class="accent-bar" [style.background]="vibeColor"></div>
        <div class="card-body">

          <div class="card-header-row">
            <div class="card-header-meta">
              <div class="venue-name">{{ event.venue.name }}</div>
              <div class="event-time">{{ event.startTime?.substring(0, 5) }}</div>
            </div>
            <div class="card-header-badges">
              <span
                *ngIf="event.type"
                class="type-chip"
                [style.color]="typeColor"
                [style.background]="typeBg">
                {{ typeLabel }}
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
            <ion-chip *ngFor="let e of event.styles" class="style-chip">
              <ion-label>{{ e | replace:'_':' ' }}</ion-label>
            </ion-chip>
          </div>

          <div class="footer-row">
            <span class="stats">{{ event.totalInterested }} interesados</span>
            <span class="vibe-pill" [style.color]="vibeColor">
              {{ vibeEmoji }} {{ vibeLabel }}
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

  get vibeColor(): string {
    return VIBE_COLOR[this.event.vibeColor] ?? 'var(--lgui-text-3)';
  }
  get vibeLabel(): string {
    return VIBE_LABEL[this.event.vibeColor] ?? '';
  }
  get vibeEmoji(): string {
    return VIBE_EMOJI[this.event.vibeColor] ?? '';
  }
  get voteLabel(): string {
    return this.event.userVote ? VOTE_LABEL[this.event.userVote] : '';
  }
  get voteBadgeColor(): string {
    return this.event.userVote ? VOTE_COLOR[this.event.userVote] : 'var(--lgui-text-3)';
  }
  get voteBadgeBg(): string {
    const c = this.voteBadgeColor;
    return c + '1A'; /* 10% opacity tint */
  }
  get typeLabel(): string {
    return TYPE_LABEL[this.event.type] ?? this.event.type;
  }
  get typeColor(): string {
    return TYPE_COLOR[this.event.type] ?? 'var(--lgui-text-3)';
  }
  get typeBg(): string {
    return TYPE_BG[this.event.type] ?? 'var(--lgui-surface-2)';
  }

  /** Resolves photoUrl (relative /uploads/... or absolute http) to a full URL. */
  get photoSrc(): string | null {
    const url = this.event.photoUrl;
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return environment.socketUrl + url;
  }

  get hasRoleData(): boolean {
    return !!this.event.roleBalance && this.event.totalInterested > 0;
  }
  get roleLeader(): number   { return this.event.roleBalance?.leadersPercent   ?? 0; }
  get roleFollower(): number { return this.event.roleBalance?.followersPercent ?? 0; }
  get roleSwitch(): number   { return this.event.roleBalance?.switchesPercent  ?? 0; }

  open(): void {
    this.router.navigate(['/event', this.event.id]);
  }
}
