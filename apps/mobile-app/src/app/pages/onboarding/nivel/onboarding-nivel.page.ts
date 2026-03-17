import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonProgressBar, IonButtons, IonBackButton,
} from '@ionic/angular/standalone';
import { Nivel } from '@shared/types';
import { OnboardingStateService } from '../../../services/onboarding-state.service';

const NIVELES: { value: Nivel; label: string; description: string; emoji: string }[] = [
  { value: 'nuevo',         label: 'Nuevo',          description: 'Estoy empezando mis primeras clases', emoji: '🌱' },
  { value: 'iniciacion',    label: 'Iniciación',      description: 'Tengo las bases, salgo con apoyo',   emoji: '📚' },
  { value: 'social_comodo', label: 'Social cómodo',   description: 'Me manejo bien en la pista',         emoji: '😎' },
  { value: 'intermedio',    label: 'Intermedio',      description: 'Aplico técnica y combos variados',   emoji: '⚡' },
  { value: 'avanzado',      label: 'Avanzado',        description: 'Nivel alto, bailo con solvencia',    emoji: '🏆' },
];

@Component({
  selector: 'app-onboarding-nivel',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonProgressBar, IonButtons, IonBackButton],
  styles: [`
    .question {
      font-size: 22px;
      font-weight: 700;
      color: var(--lgui-text-4);
      margin-bottom: 24px;
    }
    .nivel-card {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-radius: var(--lgui-radius-default);
      border: 2px solid var(--lgui-border-3);
      margin-bottom: var(--lgui-gap-sm);
      cursor: pointer;
      background: var(--lgui-surface-1);
      transition: border-color 0.15s, background 0.15s, transform 0.1s;
    }
    .nivel-card:active {
      transform: scale(0.98);
    }
    .nivel-card.selected {
      border-color: var(--ion-color-primary);
      background: var(--lgui-red-100, rgba(232, 72, 85, 0.06));
    }
    .nivel-label {
      font-size: 15px;
      font-weight: 600;
      color: var(--lgui-text-4);
    }
    .nivel-card.selected .nivel-label {
      color: var(--ion-color-primary);
    }
    .nivel-desc {
      font-size: 12px;
      color: var(--lgui-text-4);
      margin-top: 2px;
    }
    .check {
      font-size: 20px;
      color: var(--ion-color-primary);
      flex-shrink: 0;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/onboarding/rol"></ion-back-button>
        </ion-buttons>
        <ion-title>Paso 3 de 4 — Tu nivel</ion-title>
      </ion-toolbar>
      <ion-progress-bar value="0.75" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="question">¿Cómo describes tu nivel?</div>

      <div
        *ngFor="let n of niveles"
        class="nivel-card"
        [class.selected]="selected === n.value"
        (click)="selected = n.value">
        <span style="font-size:28px; line-height:1; flex-shrink:0;">{{ n.emoji }}</span>
        <div style="flex:1;">
          <div class="nivel-label">{{ n.label }}</div>
          <div class="nivel-desc">{{ n.description }}</div>
        </div>
        <span *ngIf="selected === n.value" class="check">✓</span>
      </div>

      <ion-button expand="block" [disabled]="!!(!selected)" (click)="next()" style="margin-top: 24px;">
        Siguiente
      </ion-button>
    </ion-content>
  `,
})
export class OnboardingNivelPage {
  niveles = NIVELES;
  selected: Nivel | null = null;

  constructor(private router: Router, private state: OnboardingStateService) {
    this.selected = this.state.get().nivel;
  }

  next() {
    if (!this.selected) return;
    this.state.set({ nivel: this.selected });
    this.router.navigate(['/onboarding/estilos']);
  }
}
