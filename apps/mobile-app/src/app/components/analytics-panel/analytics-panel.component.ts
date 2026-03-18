import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard, IonCardContent, IonProgressBar,
} from '@ionic/angular/standalone';
import { EventAnalytics, Vibe, Level } from '@shared/types';

/* Use CSS variables so values adapt automatically in dark mode */
const VIBE_HEX: Record<Vibe, string> = {
  quiet:  'var(--vibe-quiet)',
  normal: 'var(--vibe-normal)',
  lively: 'var(--vibe-lively)',
  packed: 'var(--vibe-packed)',
};

const VIBE_BG: Record<Vibe, string> = {
  quiet:  'var(--vibe-bg-quiet)',
  normal: 'var(--vibe-bg-normal)',
  lively: 'var(--vibe-bg-lively)',
  packed: 'var(--vibe-bg-packed)',
};

const VIBE_EMOJI: Record<Vibe, string> = {
  quiet:  '😴',
  normal: '🙂',
  lively: '🔥',
  packed: '🎉',
};

const VIBE_LABEL: Record<Vibe, string> = {
  quiet:  'Flojo',
  normal: 'Normal',
  lively: 'Animado',
  packed: 'Muy lleno',
};

const LEVEL_LABELS: Record<Level, string> = {
  beginner:     'Nuevo',
  initiation:   'Iniciación',
  comfortable:  'Social cómodo',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
};

const LEVEL_ORDER: Level[] = ['beginner', 'initiation', 'comfortable', 'intermediate', 'advanced'];

const BALANCE_LABEL: Record<string, string> = {
  balanced:        '⚖️ Equilibrado',
  need_leaders:    '⚠️ Faltan leaders',
  need_followers:  '⚠️ Faltan followers',
};

const BALANCE_COLOR: Record<string, string> = {
  balanced:        '#4AD562',  /* --lgui-green-400  */
  need_leaders:    '#EFC42C',  /* --lgui-yellow-400 */
  need_followers:  '#EFC42C',  /* --lgui-yellow-400 */
};

@Component({
  selector: 'app-analytics-panel',
  standalone: true,
  imports: [
    CommonModule, IonCard, IonCardContent, IonProgressBar,
  ],
  styles: [`
    ion-card {
      margin: 0;
      border-radius: var(--lgui-radius-default);
    }

    /* First section title sits flush against the card's top padding */
    .section-title-first {
      margin-top: 0;
    }

    /* ── Vibe row ──────────────────────────────────────────────── */
    .vibe-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-md);
      margin-bottom: var(--lgui-gap-lg);
    }
    .vibe-emoji {
      font-size: 2rem;
      line-height: 1;
      flex-shrink: 0;
    }
    .vibe-name {
      font-size: var(--lgui-fs-heading);
      font-weight: var(--lgui-fw-bold);
      line-height: 1.2;
    }
    .vibe-count {
      font-size: var(--lgui-fs-caption);
      margin-top: var(--lgui-gap-xs);
      opacity: 0.8;
    }

    /* ── Role balance ──────────────────────────────────────────── */
    .balance-row {
      display: flex;
      align-items: center;
      margin-bottom: var(--lgui-gap-md);
    }
    .balance-value {
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-semibold);
    }
    .role-bar-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-sm);
      margin-bottom: var(--lgui-gap-xs);
    }
    .role-label {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
      width: 4.5rem;
      flex-shrink: 0;
    }
    .role-track {
      flex: 1;
      height: 0.4375rem;
      background: var(--lgui-surface-3);
      border-radius: var(--lgui-radius-sm);
      overflow: hidden;
    }
    .role-fill {
      height: 100%;
      border-radius: var(--lgui-radius-sm);
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .leader-fill   { background: var(--type-social-color); }
    .follower-fill { background: var(--ion-color-primary); }
    .switch-fill   { background: var(--ion-color-secondary); }
    .role-pct {
      font-size: var(--lgui-fs-micro);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      width: 1.875rem;
      text-align: right;
      flex-shrink: 0;
    }

    /* ── Level distribution ────────────────────────────────────── */
    .level-row {
      margin-bottom: var(--lgui-gap-sm);
    }
    .level-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--lgui-gap-xs);
    }
    .level-name {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
    }
    .level-count {
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
    }

    /* ── Recommendation ────────────────────────────────────────── */
    .recommendation-box {
      margin-top: var(--lgui-gap-xl);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-md);
      border-left: 0.1875rem solid;
    }
    .recommendation-text {
      font-size: var(--lgui-fs-body);
      line-height: 1.55;
      margin: 0;
      color: var(--lgui-text-4);
    }
  `],
  template: `
    <ion-card>
      <ion-card-content>

        <!-- Predicción del ambiente -->
        <div class="section-title section-title-first">Predicción del ambiente</div>
        <div class="vibe-row" [style.background]="vibeBg">
          <div class="vibe-emoji">{{ vibeEmoji }}</div>
          <div>
            <div class="vibe-name" [style.color]="vibeHex">{{ vibeLabel }}</div>
            <div class="vibe-count" [style.color]="vibeHex">
              ~{{ analytics.estimatedAttendance | number:'1.0-0' }} personas esperadas
            </div>
          </div>
        </div>

        <!-- Distribución de roles -->
        <div class="section-title">Distribución de roles</div>
        <div class="balance-row">
          <span class="balance-value" [style.color]="balanceColor">{{ balanceLabel }}</span>
        </div>
        <div class="role-bar-row">
          <span class="role-label">Leaders</span>
          <div class="role-track">
            <div class="role-fill leader-fill" [style.width.%]="analytics.roleBalance.leadersPercent"></div>
          </div>
          <span class="role-pct">{{ analytics.roleBalance.leadersPercent }}%</span>
        </div>
        <div class="role-bar-row">
          <span class="role-label">Followers</span>
          <div class="role-track">
            <div class="role-fill follower-fill" [style.width.%]="analytics.roleBalance.followersPercent"></div>
          </div>
          <span class="role-pct">{{ analytics.roleBalance.followersPercent }}%</span>
        </div>
        <div class="role-bar-row" *ngIf="analytics.roleBalance.switchesPercent > 0">
          <span class="role-label">Switch</span>
          <div class="role-track">
            <div class="role-fill switch-fill" [style.width.%]="analytics.roleBalance.switchesPercent"></div>
          </div>
          <span class="role-pct">{{ analytics.roleBalance.switchesPercent }}%</span>
        </div>

        <!-- Nivel de los asistentes -->
        <div class="section-title">Nivel de los asistentes</div>
        <div *ngFor="let level of levelOrder" class="level-row">
          <div class="level-header">
            <span class="level-name">{{ levelLabels[level] }}</span>
            <span class="level-count">{{ analytics.levelDistribution[level] }}%</span>
          </div>
          <ion-progress-bar [value]="getBar(level)" color="secondary"></ion-progress-bar>
        </div>

        <!-- Recomendación -->
        <div
          class="recommendation-box"
          [style.border-left-color]="vibeHex"
          [style.background]="vibeBg">
          <p class="recommendation-text">{{ analytics.recommendation }}</p>
        </div>

      </ion-card-content>
    </ion-card>
  `,
})
export class AnalyticsPanelComponent {
  @Input() analytics!: EventAnalytics;

  levelOrder = LEVEL_ORDER;
  levelLabels = LEVEL_LABELS;

  get vibeHex(): string   { return VIBE_HEX[this.analytics.vibe]; }
  get vibeBg(): string    { return VIBE_BG[this.analytics.vibe]; }
  get vibeEmoji(): string { return VIBE_EMOJI[this.analytics.vibe]; }
  get vibeLabel(): string { return VIBE_LABEL[this.analytics.vibe]; }
  get balanceLabel(): string { return BALANCE_LABEL[this.analytics.roleBalance.balance] ?? ''; }
  get balanceColor(): string { return BALANCE_COLOR[this.analytics.roleBalance.balance] ?? '#9e9e9e'; }

  getBar(level: Level): number {
    return (this.analytics.levelDistribution[level] ?? 0) / 100;
  }
}
