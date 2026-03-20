import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonFooter,
  IonButton, IonItem, IonInput, IonList, IonToast, IonBackButton, IonButtons,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { FormFieldComponent } from '../../components/form-field/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonFooter,
    IonButton, IonItem, IonInput, IonList, IonToast, IonBackButton, IonButtons,
    FormFieldComponent,
  ],
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
      padding: 2rem 1.5rem;
      text-align: center;
    }
    .login-emoji {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      line-height: 1;
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
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/onboarding/ciudad" text=""></ion-back-button>
          <span class="breadcrumb">Iniciar sesión</span>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="login-container">
        <div class="login-emoji">🎶</div>
        <div class="login-title">¡Bienvenido de vuelta!</div>
        <div class="login-subtitle">
          Introduce tu email y contraseña para volver a la pista.
        </div>

        <app-form-field label="Email">
          <ion-input
            type="email"
            [(ngModel)]="email"
            placeholder="tu@email.com"
            autocomplete="email"
            (keyup.enter)="passwordInput.setFocus()">
          </ion-input>
        </app-form-field>

        <app-form-field label="Contraseña">
          <ion-input
            #passwordInput
            type="password"
            [(ngModel)]="password"
            placeholder="••••••"
            autocomplete="current-password"
            (keyup.enter)="login()">
          </ion-input>
        </app-form-field>

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
