import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar,
  IonButton, IonButtons, IonProgressBar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-ciudad',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonButton, IonButtons, IonProgressBar],
  styles: [`
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
      padding: 2rem 1.5rem;
      text-align: center;
    }
    .hero-logo {
      height: 3.5rem;
      width: auto;
      margin-bottom: 1.5rem;
    }
    .hero-subtitle {
      font-size: var(--lgui-fs-subheading);
      color: var(--ion-color-medium);
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }
    .city-badge {
      display: inline-block;
      background: var(--ion-color-primary, #E84855);
      color: #fff;
      font-weight: var(--lgui-fw-semibold);
      font-size: var(--lgui-fs-body-lg);
      padding: 0.375rem 1rem;
      border-radius: 1.25rem;
      margin: 1rem 0 2rem;
    }
    .login-link {
      margin-top: 1rem;
      font-size: var(--lgui-fs-body-lg);
      color: var(--ion-color-medium);
    }
    .login-link span {
      color: var(--ion-color-primary, #E84855);
      font-weight: var(--lgui-fw-semibold);
      cursor: pointer;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <span class="breadcrumb">Bienvenido</span>
        </ion-buttons>
      </ion-toolbar>
      <ion-progress-bar value="0.25" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content>
      <div class="hero">
        <img src="assets/vibrasbk.png" class="hero-logo" alt="VibraSBK" />
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
