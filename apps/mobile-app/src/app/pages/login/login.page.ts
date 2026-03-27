import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton, IonItem, IonInput, IonList, IonToast, IonIcon, IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent,
    IonButton, IonItem, IonInput, IonList, IonToast, IonIcon, IonSpinner,
  ],
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100%;
      padding: var(--lgui-pad-xl) var(--lgui-pad-lg) var(--lgui-space-8);
      text-align: center;
    }
    .login-logo {
      height: var(--lgui-space-7);
      width: auto;
      margin-bottom: var(--lgui-gap-xl);
    }
    .login-title {
      font-size: var(--lgui-fs-display);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      margin-bottom: var(--lgui-gap-sm);
      line-height: var(--lgui-lh-tight);
    }
    .login-subtitle {
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-pad-xl);
      line-height: var(--lgui-lh-normal);
    }
    .form-list {
      width: 21rem;
      max-width: 100%;
    }
    .login-submit-btn {
      margin: var(--lgui-gap-lg) 0 var(--lgui-gap-sm);
      width: 21rem;
      max-width: 100%;
    }
    .register-link {
      margin-top: var(--lgui-gap-lg);
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-3);
    }
    .register-link span {
      color: var(--ion-color-primary);
      font-weight: var(--lgui-fw-semibold);
      cursor: pointer;
    }
    .eye-btn {
      --padding-start: var(--lgui-gap-sm);
      --padding-end: var(--lgui-gap-sm);
      --color: var(--lgui-text-3);
      height: 2.75rem;
      margin: 0;
    }
  `],
  template: `
    <ion-content fullscreen="true">
      <div class="login-container">
        <img src="assets/vibrasbk.png" class="login-logo" alt="VibraSBK" />
        <div class="login-title">¡Bienvenido de vuelta!</div>
        <div class="login-subtitle">
          Introduce tu email y contraseña para volver a la pista.
        </div>

        <ion-list lines="none" class="form-list">
          <ion-item>
            <ion-input
              type="email"
              [(ngModel)]="email"
              placeholder="Email"
              autocomplete="email"
              (keyup.enter)="passwordInput.setFocus()">
            </ion-input>
          </ion-item>
        </ion-list>

        <ion-list lines="none" class="form-list">
          <ion-item>
            <ion-input
              #passwordInput
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="password"
              placeholder="Contraseña"
              autocomplete="current-password"
              (keyup.enter)="login()">
            </ion-input>
            <ion-button
              slot="end"
              fill="clear"
              class="eye-btn"
              [attr.aria-label]="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              (click)="showPassword = !showPassword">
              <ion-icon [name]="showPassword ? 'eye-off-outline' : 'eye-outline'" aria-hidden="true"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>

        <ion-button
          expand="block"
          class="login-submit-btn"
          [disabled]="!!(!canSubmit || loading)"
          (click)="login()">
          <ion-spinner *ngIf="loading" name="crescent" slot="start"></ion-spinner>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </ion-button>

        <div class="register-link">
          ¿Aún no tienes cuenta?
          <span (click)="goToRegister()">Crear cuenta</span>
        </div>

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
  showPassword = false;

  get canSubmit(): boolean {
    return this.email.trim().includes('@') && this.password.length >= 6;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  goToRegister(): void {
    this.router.navigate(['/onboarding/pais']);
  }

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
