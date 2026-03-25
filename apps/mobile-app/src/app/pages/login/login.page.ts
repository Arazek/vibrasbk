import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonFooter, IonToolbar,
  IonButton, IonItem, IonInput, IonList, IonToast,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonFooter, IonToolbar,
    IonButton, IonItem, IonInput, IonList, IonToast,
  ],
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 2rem 1.5rem;
      text-align: center;
    }
    .login-logo {
      height: 3.5rem;
      width: auto;
      margin-bottom: 1.5rem;
    }
    .login-title {
      font-size: 1.625rem;
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      margin-bottom: 0.5rem;
    }
    .login-subtitle {
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-3);
      margin-bottom: 2rem;
      line-height: 1.5;
    }
    .register-link {
      margin-top: 1rem;
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-3);
    }
    .register-link span {
      color: var(--ion-color-primary);
      font-weight: var(--lgui-fw-semibold);
      cursor: pointer;
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
              type="password"
              [(ngModel)]="password"
              placeholder="Contraseña"
              autocomplete="current-password"
              (keyup.enter)="login()">
            </ion-input>
          </ion-item>
        </ion-list>

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

    <ion-footer>
      <ion-toolbar>
        <ion-button
          expand="block"
          style="margin: 0.5rem"
          [disabled]="!!(!canSubmit || loading)"
          (click)="login()">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
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

  goToRegister(): void {
    this.router.navigate(['/onboarding/ciudad']);
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
