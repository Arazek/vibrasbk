import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonFooter,
  IonButton, IonProgressBar, IonButtons, IonBackButton,
} from '@ionic/angular/standalone';
import { DancingRole } from '@shared/types';
import { OnboardingStateService } from '../../../services/onboarding-state.service';

const ROLES: { value: DancingRole; label: string; description: string; emoji: string }[] = [
  { value: 'leader',   label: 'Leader',   description: 'Llevo el compás en pista',     emoji: '🕺' },
  { value: 'follower', label: 'Follower', description: 'Me dejo llevar por el ritmo',   emoji: '💃' },
  { value: 'switch',   label: 'Switch',   description: 'Bailo ambos roles con soltura', emoji: '🔄' },
];

@Component({
  selector: 'app-onboarding-rol',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonFooter, IonButton, IonProgressBar, IonButtons, IonBackButton],
  styles: [`
    .question {
      font-size: var(--lgui-fs-display);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      margin-bottom: 1.5rem;
    }
    .role-card {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-lg);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-default);
      border: 0.125rem solid var(--lgui-border-3);
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
      font-size: 2.25rem;
      line-height: 1;
      flex-shrink: 0;
    }
    .role-label {
      font-size: var(--lgui-fs-heading);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
    }
    .role-card.selected .role-label { color: #fff; }
    .role-desc {
      font-size: var(--lgui-fs-body);
      margin-top: 0.125rem;
      color: var(--lgui-text-3);
    }
    .role-card.selected .role-desc { color: rgba(255,255,255,0.78); }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/onboarding/ciudad" text=""></ion-back-button>
          <span class="breadcrumb">Tu rol</span>
        </ion-buttons>
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

    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" color="primary" style="margin: 0.5rem" [disabled]="!!(!selected)" (click)="next()">
          Siguiente
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
})
export class OnboardingRolPage {
  roles = ROLES;
  selected: DancingRole | null = null;

  constructor(private router: Router, private state: OnboardingStateService) {
    this.selected = this.state.get().dancingRole;
  }

  next() {
    if (!this.selected) return;
    this.state.set({ dancingRole: this.selected });
    this.router.navigate(['/onboarding/nivel']);
  }
}
