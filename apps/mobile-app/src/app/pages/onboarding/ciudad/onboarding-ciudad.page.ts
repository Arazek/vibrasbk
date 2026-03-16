import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonProgressBar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-ciudad',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonProgressBar],
  styles: [`
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
      padding: 32px 24px;
      text-align: center;
    }
    .hero-emoji {
      font-size: 64px;
      margin-bottom: 24px;
      line-height: 1;
    }
    .hero-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--ion-text-color, #1a1a2e);
      margin-bottom: 12px;
    }
    .hero-subtitle {
      font-size: 15px;
      color: var(--ion-color-medium);
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .city-badge {
      display: inline-block;
      background: var(--ion-color-primary, #E84855);
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 20px;
      margin: 16px 0 32px;
    }
    .login-link {
      margin-top: 16px;
      font-size: 14px;
      color: var(--ion-color-medium);
    }
    .login-link span {
      color: var(--ion-color-primary, #E84855);
      font-weight: 600;
      cursor: pointer;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Bienvenido</ion-title>
      </ion-toolbar>
      <ion-progress-bar value="0.25" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content>
      <div class="hero">
        <div class="hero-emoji">💃🕺</div>
        <div class="hero-title">Predictor de Sociales</div>
        <div class="hero-subtitle">
          Descubre cómo será el ambiente antes de salir a bailar.
          Sabe si la pista estará animada, el nivel de los bailarines
          y el balance de roles.
        </div>
        <div class="city-badge">📍 Cartagena</div>
        <ion-button expand="block" (click)="next()" style="width: 100%;">
          Crear perfil — Soy nuevo
        </ion-button>
        <div class="login-link">
          ¿Ya tienes cuenta?
          <span (click)="goToLogin()">Iniciar sesión</span>
        </div>
      </div>
    </ion-content>
  `,
})
export class OnboardingCiudadPage {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/onboarding/rol']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
