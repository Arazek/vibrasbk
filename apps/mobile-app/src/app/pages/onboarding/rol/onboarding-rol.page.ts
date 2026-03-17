import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonProgressBar, IonButtons, IonBackButton,
} from '@ionic/angular/standalone';
import { Rol } from '@shared/types';
import { OnboardingStateService } from '../../../services/onboarding-state.service';

const ROLES: { value: Rol; label: string; description: string; emoji: string }[] = [
  { value: 'leader',   label: 'Leader',   description: 'Llevo el compás en pista',     emoji: '🕺' },
  { value: 'follower', label: 'Follower', description: 'Me dejo llevar por el ritmo',   emoji: '💃' },
  { value: 'switch',   label: 'Switch',   description: 'Bailo ambos roles con soltura', emoji: '🔄' },
];

@Component({
  selector: 'app-onboarding-rol',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonProgressBar, IonButtons, IonBackButton],
  styles: [`
    .question {
      font-size: 22px;
      font-weight: 700;
      color: var(--lgui-text-4);
      margin-bottom: 24px;
    }
    .role-card {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-lg);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-default);
      border: 2px solid var(--lgui-border-3);
      margin-bottom: var(--lgui-gap-sm);
      cursor: pointer;
      background: var(--lgui-surface-1);
      transition: border-color 0.15s, background 0.15s, transform 0.1s;
    }
    .role-card:active {
      transform: scale(0.98);
    }
    .role-card.selected {
      border-color: var(--ion-color-primary);
      background: var(--ion-color-primary);
      color: #fff;
    }
    .role-emoji {
      font-size: 36px;
      line-height: 1;
      flex-shrink: 0;
    }
    .role-label {
      font-size: 17px;
      font-weight: 600;
      color: var(--lgui-text-4);
    }
    .role-card.selected .role-label { color: #fff; }
    .role-desc {
      font-size: 13px;
      margin-top: 2px;
      color: var(--lgui-text-3);
    }
    .role-card.selected .role-desc { color: rgba(255,255,255,0.78); }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/onboarding/ciudad"></ion-back-button>
        </ion-buttons>
        <ion-title>Paso 2 de 4 — Tu rol</ion-title>
      </ion-toolbar>
      <ion-progress-bar value="0.5" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="question">¿Qué rol bailas?</div>

      <div
        *ngFor="let r of roles"
        class="role-card"
        [class.selected]="selected === r.value"
        (click)="selected = r.value">
        <div class="role-emoji">{{ r.emoji }}</div>
        <div>
          <div class="role-label">{{ r.label }}</div>
          <div class="role-desc">{{ r.description }}</div>
        </div>
      </div>

      <ion-button expand="block" [disabled]="!!(!selected)" (click)="next()" style="margin-top: 24px;">
        Siguiente
      </ion-button>
    </ion-content>
  `,
})
export class OnboardingRolPage {
  roles = ROLES;
  selected: Rol | null = null;

  constructor(private router: Router, private state: OnboardingStateService) {
    this.selected = this.state.get().rol;
  }

  next() {
    if (!this.selected) return;
    this.state.set({ rol: this.selected });
    this.router.navigate(['/onboarding/nivel']);
  }
}
