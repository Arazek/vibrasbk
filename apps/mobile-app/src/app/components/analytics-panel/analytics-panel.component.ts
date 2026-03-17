import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { EventAnalytics, Vibe, Level } from '@shared/types';

/* LanguageGUI System Colors — mirrors CSS variables in theme/variables.css */
const VIBE_HEX: Record<Vibe, string> = {
  quiet:  '#BAC0CC',  /* --lgui-neutral-500 */
  normal: '#EFC42C',  /* --lgui-yellow-400  */
  lively: '#4AD562',  /* --lgui-green-400   */
  packed: '#FE566B',  /* --lgui-red-400     */
};

const VIBE_BG: Record<Vibe, string> = {
  quiet:  '#F0F2F5',  /* --lgui-neutral-300  */
  normal: '#FFFAE9',  /* --lgui-yellow-100   */
  lively: '#EEF9F5',  /* --lgui-green-100    */
  packed: '#FFF5F6',  /* --lgui-red-100      */
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
    CommonModule, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonProgressBar,
  ],
  styles: [`
    ion-card {
      margin: 0;
      border-radius: var(--lgui-radius-default);
    }
    ion-card-header {
      padding-bottom: 0;
    }
    ion-card-title {
      font-size: 12px !important;
      font-weight: 700 !important;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--lgui-text-3) !important;
    }
    .vibe-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-md);
      margin-bottom: var(--lgui-gap-lg);
    }
    .vibe-emoji {
      font-size: 32px;
      line-height: 1;
      flex-shrink: 0;
    }
    .vibe-name {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
    }
    .vibe-count {
      font-size: 12px;
      margin-top: 3px;
      opacity: 0.8;
    }
    .section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-space-2);
    }
    .balance-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--lgui-gap-md);
    }
    .balance-value {
      font-size: 13px;
      font-weight: 600;
    }
    .role-bars {
      margin-bottom: var(--lgui-gap-sm);
    }
    .role-bar-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-sm);
      margin-bottom: 6px;
    }
    .role-label {
      font-size: 12px;
      color: var(--lgui-text-3);
      width: 56px;
      flex-shrink: 0;
    }
    .role-track {
      flex: 1;
      height: 7px;
      background: var(--lgui-surface-3);
      border-radius: 4px;
      overflow: hidden;
    }
    .role-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .leader-fill   { background: #4A90D9; }
    .follower-fill { background: #E84855; }
    .switch-fill   { background: #F4A261; }
    .role-pct {
      font-size: 11px;
      font-weight: 700;
      color: var(--lgui-text-4);
      width: 30px;
      text-align: right;
      flex-shrink: 0;
    }
    .section-gap {
      height: var(--lgui-gap-lg);
    }
    .level-row {
      margin: 5px 0;
    }
    .level-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
    }
    .level-name {
      font-size: 12px;
      color: var(--lgui-text-3);
    }
    .level-count {
      font-size: 12px;
      font-weight: 600;
      color: var(--lgui-text-4);
    }
    .recommendation-box {
      margin-top: var(--lgui-gap-lg);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-md);
      border-left: 3px solid;
    }
    .recommendation-text {
      font-size: 13px;
      line-height: 1.55;
      margin: 0;
      color: var(--lgui-text-4);
    }
  `],
  template: `
    <ion-card>
      <ion-card-header>
        <ion-card-title>Predicción del ambiente</ion-card-title>
      </ion-card-header>
      <ion-card-content>

        <!-- Vibe row -->
        <div class="vibe-row" [style.background]="vibeBg">
          <div class="vibe-emoji">{{ vibeEmoji }}</div>
          <div>
            <div class="vibe-name" [style.color]="vibeHex">{{ vibeLabel }}</div>
            <div class="vibe-count" [style.color]="vibeHex">
              ~{{ analytics.estimatedAttendance | number:'1.0-0' }} personas esperadas
            </div>
          </div>
        </div>

        <!-- Role balance -->
        <div class="section-label">Distribución de roles</div>
        <div class="balance-row">
          <span class="balance-value" [style.color]="balanceColor">{{ balanceLabel }}</span>
        </div>
        <div class="role-bars">
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
        </div>

        <!-- Level distribution -->
        <div class="section-gap"></div>
        <div class="section-label">Nivel de los asistentes</div>
        <div *ngFor="let level of levelOrder" class="level-row">
          <div class="level-header">
            <span class="level-name">{{ levelLabels[level] }}</span>
            <span class="level-count">{{ analytics.levelDistribution[level] }}%</span>
          </div>
          <ion-progress-bar [value]="getBar(level)" color="secondary"></ion-progress-bar>
        </div>

        <!-- Recommendation -->
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
  get balanceLabel(): string  { return BALANCE_LABEL[this.analytics.roleBalance.balance] ?? ''; }
  get balanceColor(): string  { return BALANCE_COLOR[this.analytics.roleBalance.balance] ?? '#9e9e9e'; }

  // levelDistribution values are percentages (0-100), bar needs 0-1
  getBar(level: Level): number {
    return (this.analytics.levelDistribution[level] ?? 0) / 100;
  }
}
