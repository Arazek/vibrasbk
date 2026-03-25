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
      justify-content: center;
      height: 100%;
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
        <ion-button expand="block" color="primary" style="margin: 0.5rem; width: 100%" (click)="next()">
          Crear perfil — Soy nuevo
        </ion-button>
      </div>
    </ion-content>
  `,
})
export class OnboardingCiudadPage {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/onboarding/rol']);
  }
}
