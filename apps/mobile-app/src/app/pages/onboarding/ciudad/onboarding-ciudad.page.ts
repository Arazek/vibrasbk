import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton, IonProgressBar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-onboarding-ciudad',
  standalone: true,
  imports: [IonContent, IonButton, IonProgressBar],
  styles: [`
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      min-height: 100%;
      padding: var(--lgui-pad-xl) var(--lgui-pad-lg) var(--lgui-space-8);
      text-align: center;
    }
    .hero-logo {
      height: var(--lgui-space-7);
      width: auto;
      margin-bottom: var(--lgui-gap-xl);
    }
    .hero-subtitle {
      font-size: var(--lgui-fs-subheading);
      color: var(--ion-color-medium);
      line-height: var(--lgui-lh-relaxed);
      margin-bottom: var(--lgui-gap-sm);
    }
    .city-badge {
      display: inline-block;
      background: var(--ion-color-primary);
      color: var(--ion-color-primary-contrast);
      font-weight: var(--lgui-fw-semibold);
      font-size: var(--lgui-fs-body-lg);
      padding: 0.375rem 1rem;
      border-radius: var(--lgui-radius-lg);
      margin: var(--lgui-gap-lg) 0 var(--lgui-gap-xl);
    }
    .cta-btn {
      margin: var(--lgui-gap-sm);
      width: 100%;
    }
    .login-link {
      margin-top: var(--lgui-gap-lg);
      font-size: var(--lgui-fs-body);
      color: var(--lgui-text-3);
    }
    .login-link a {
      color: var(--ion-color-primary);
      font-weight: var(--lgui-fw-semibold);
      text-decoration: none;
      cursor: pointer;
    }
  `],
  template: `
    <ion-content fullscreen="true">
      <div class="hero">
        <img src="assets/vibrasbk.png" class="hero-logo" alt="VibraSBK" />
        <div class="hero-subtitle">
          Descubre cómo será el ambiente antes de salir a bailar.
          Sabe si la pista estará animada, el nivel de los bailarines
          y el balance de roles.
        </div>
        <div class="city-badge">📍 Cartagena</div>
        <ion-button expand="block" color="primary" class="cta-btn" (click)="next()">
          Crear perfil — Soy nuevo
        </ion-button>
        <p class="login-link">
          ¿Ya tienes cuenta? <a (click)="goToLogin()">Iniciar sesión</a>
        </p>
      </div>
    </ion-content>
  `,
})
export class OnboardingCiudadPage {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/onboarding/pais']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
