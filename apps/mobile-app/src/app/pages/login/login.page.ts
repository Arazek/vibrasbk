import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonItem, IonInput, IonList, IonToast, IonBackButton, IonButtons,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonItem, IonInput, IonList, IonToast, IonBackButton, IonButtons,
  ],
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
      padding: 32px 24px;
      text-align: center;
    }
    .login-emoji {
      font-size: 56px;
      margin-bottom: 24px;
      line-height: 1;
    }
    .login-title {
      font-size: 26px;
      font-weight: 700;
      color: var(--lgui-text-4);
      margin-bottom: 8px;
    }
    .login-subtitle {
      font-size: 14px;
      color: var(--lgui-text-3);
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--lgui-text-3);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 4px;
      text-align: left;
      width: 100%;
    }
    .input-block {
      width: 100%;
      margin-bottom: 16px;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/onboarding/ciudad"></ion-back-button>
        </ion-buttons>
        <ion-title>Iniciar sesión</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="login-container">
        <div class="login-emoji">🎶</div>
        <div class="login-title">¡Bienvenido de vuelta!</div>
        <div class="login-subtitle">
          Introduce tu email y contraseña para volver a la pista.
        </div>

        <div class="input-block">
          <div class="field-label">Email</div>
          <ion-list lines="none" style="border-radius: 10px; overflow: hidden;">
            <ion-item>
              <ion-input
                type="email"
                [(ngModel)]="email"
                placeholder="tu@email.com"
                autocomplete="email"
                (keyup.enter)="passwordInput.setFocus()">
              </ion-input>
            </ion-item>
          </ion-list>
        </div>

        <div class="input-block">
          <div class="field-label">Contraseña</div>
          <ion-list lines="none" style="border-radius: 10px; overflow: hidden;">
            <ion-item>
              <ion-input
                #passwordInput
                type="password"
                [(ngModel)]="password"
                placeholder="••••••"
                autocomplete="current-password"
                (keyup.enter)="login()">
              </ion-input>
            </ion-item>
          </ion-list>
        </div>

        <ion-button
          expand="block"
          style="width: 100%; margin-top: 8px;"
          [disabled]="!canSubmit || loading"
          (click)="login()">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </ion-button>
      </div>

      <ion-toast
        [isOpen]="!!error"
        [message]="error"
        duration="3000"
        color="danger"
        (didDismiss)="error = ''">
      </ion-toast>
    </ion-content>
  `,
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  error = '';

  get canSubmit(): boolean {
    return this.email.trim().includes('@') && this.password.length >= 6;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    if (!this.canSubmit || this.loading) return;
    this.loading = true;
    this.authService.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Email o contraseña incorrectos.';
      },
    });
  }
}
