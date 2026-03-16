import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { EventAnalytics, Ambiente, Nivel } from '@shared/types';

/* LanguageGUI System Colors — mirrors CSS variables in theme/variables.css */
const AMBIENTE_HEX: Record<Ambiente, string> = {
  flojo:     '#BAC0CC',  /* --lgui-neutral-500 */
  normal:    '#EFC42C',  /* --lgui-yellow-400  */
  animado:   '#4AD562',  /* --lgui-green-400   */
  muy_lleno: '#FE566B',  /* --lgui-red-400     */
};

const AMBIENTE_BG: Record<Ambiente, string> = {
  flojo:     '#F0F2F5',  /* --lgui-neutral-300  */
  normal:    '#FFFAE9',  /* --lgui-yellow-100   */
  animado:   '#EEF9F5',  /* --lgui-green-100    */
  muy_lleno: '#FFF5F6',  /* --lgui-red-100      */
};

const AMBIENTE_EMOJI: Record<Ambiente, string> = {
  flojo:     '😴',
  normal:    '🙂',
  animado:   '🔥',
  muy_lleno: '🎉',
};

const AMBIENTE_LABEL: Record<Ambiente, string> = {
  flojo:     'Flojo',
  normal:    'Normal',
  animado:   'Animado',
  muy_lleno: 'Muy lleno',
};

const NIVEL_LABELS: Record<Nivel, string> = {
  nuevo:         'Nuevo',
  iniciacion:    'Iniciación',
  social_comodo: 'Social cómodo',
  intermedio:    'Intermedio',
  avanzado:      'Avanzado',
};

const NIVEL_ORDER: Nivel[] = ['nuevo', 'iniciacion', 'social_comodo', 'intermedio', 'avanzado'];

const BALANCE_LABEL: Record<string, string> = {
  equilibrado:       '⚖️ Equilibrado',
  faltan_leaders:    '⚠️ Faltan leaders',
  faltan_followers:  '⚠️ Faltan followers',
};

const BALANCE_COLOR: Record<string, string> = {
  equilibrado:       '#4AD562',  /* --lgui-green-400  */
  faltan_leaders:    '#EFC42C',  /* --lgui-yellow-400 */
  faltan_followers:  '#EFC42C',  /* --lgui-yellow-400 */
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
    .ambiente-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-md);
      margin-bottom: var(--lgui-gap-lg);
    }
    .ambiente-emoji {
      font-size: 32px;
      line-height: 1;
      flex-shrink: 0;
    }
    .ambiente-name {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
    }
    .ambiente-count {
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
    .nivel-row {
      margin: 5px 0;
    }
    .nivel-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
    }
    .nivel-name {
      font-size: 12px;
      color: var(--lgui-text-3);
    }
    .nivel-count {
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

        <!-- Ambiente row -->
        <div class="ambiente-row" [style.background]="ambienteBg">
          <div class="ambiente-emoji">{{ ambienteEmoji }}</div>
          <div>
            <div class="ambiente-name" [style.color]="ambienteHex">{{ ambienteLabel }}</div>
            <div class="ambiente-count" [style.color]="ambienteHex">
              ~{{ analytics.asistenciaEstimada | number:'1.0-0' }} personas esperadas
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
        <div *ngFor="let nivel of nivelOrder" class="nivel-row">
          <div class="nivel-header">
            <span class="nivel-name">{{ nivelLabels[nivel] }}</span>
            <span class="nivel-count">{{ analytics.nivelDistribution[nivel] }}%</span>
          </div>
          <ion-progress-bar [value]="getBar(nivel)" color="secondary"></ion-progress-bar>
        </div>

        <!-- Recommendation -->
        <div
          class="recommendation-box"
          [style.border-left-color]="ambienteHex"
          [style.background]="ambienteBg">
          <p class="recommendation-text">{{ analytics.recommendation }}</p>
        </div>

      </ion-card-content>
    </ion-card>
  `,
})
export class AnalyticsPanelComponent {
  @Input() analytics!: EventAnalytics;

  nivelOrder = NIVEL_ORDER;
  nivelLabels = NIVEL_LABELS;

  get ambienteHex(): string   { return AMBIENTE_HEX[this.analytics.ambiente]; }
  get ambienteBg(): string    { return AMBIENTE_BG[this.analytics.ambiente]; }
  get ambienteEmoji(): string { return AMBIENTE_EMOJI[this.analytics.ambiente]; }
  get ambienteLabel(): string { return AMBIENTE_LABEL[this.analytics.ambiente]; }
  get balanceLabel(): string  { return BALANCE_LABEL[this.analytics.roleBalance.balance] ?? ''; }
  get balanceColor(): string  { return BALANCE_COLOR[this.analytics.roleBalance.balance] ?? '#9e9e9e'; }

  // nivelDistribution values are percentages (0-100), bar needs 0-1
  getBar(nivel: Nivel): number {
    return (this.analytics.nivelDistribution[nivel] ?? 0) / 100;
  }
}
