import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonFooter, IonButton,
  IonItem, IonInput, IonList, IonToast, IonProgressBar,
  IonButtons, IonBackButton,
} from '@ionic/angular/standalone';
import { DanceStyle } from '@shared/types';
import { OnboardingStateService } from '../../../services/onboarding-state.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { StyleChipGridComponent } from '../../../components/style-chip-grid/style-chip-grid.component';
import { FormFieldComponent } from '../../../components/form-field/form-field.component';

@Component({
  selector: 'app-onboarding-estilos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle, IonFooter,
    IonButton, IonItem, IonInput, IonList, IonToast, IonProgressBar,
    IonButtons, IonBackButton,
    StyleChipGridComponent, FormFieldComponent,
  ],
  styles: [`
    .question {
      font-size: var(--lgui-fs-display);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      margin-bottom: 0.375rem;
    }
    .subtitle {
      font-size: var(--lgui-fs-body-lg);
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-lg);
    }
    .form-heading {
      font-size: var(--lgui-fs-subheading);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      margin: var(--lgui-gap-xl) 0 var(--lgui-gap-md);
      padding-left: var(--lgui-space-1);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Estilos</ion-title>
      </ion-toolbar>
      <ion-progress-bar value="1.0" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="question">¿Qué estilos bailas?</div>
      <div class="subtitle">Selecciona al menos uno.</div>

      <app-style-chip-grid
        [styles]="styles"
        [selected]="selected"
        [loading]="loadingStyles"
        (selectionChange)="selected = $event">
      </app-style-chip-grid>

      <app-form-field label="Tu alias">
        <ion-input [(ngModel)]="alias" placeholder="Ej. salsa_king" required></ion-input>
      </app-form-field>

      <app-form-field label="Academia (opcional)">
        <ion-input [(ngModel)]="academyName" placeholder="Nombre de tu academia" autocomplete="organization"></ion-input>
      </app-form-field>

      <!-- Account credentials -->
      <div class="form-heading">Crea tu cuenta</div>

      <app-form-field label="Email">
        <ion-input
          type="email"
          [(ngModel)]="email"
          placeholder="tu@email.com"
          autocomplete="email">
        </ion-input>
      </app-form-field>

      <app-form-field label="Contraseña (mínimo 6 caracteres)">
        <ion-input
          type="password"
          [(ngModel)]="password"
          placeholder="••••••"
          autocomplete="new-password">
        </ion-input>
      </app-form-field>

      <app-form-field label="Confirmar contraseña">
        <ion-input
          type="password"
          [(ngModel)]="confirmPassword"
          placeholder="••••••"
          autocomplete="new-password"
          (keyup.enter)="finish()">
        </ion-input>
      </app-form-field>

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
          color="primary"
          style="margin: var(--lgui-gap-sm)"
          [disabled]="!!(!canSubmit || loading)"
          (click)="finish()">
          {{ loading ? 'Creando perfil...' : 'Entrar a la app 🎵' }}
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
})
export class OnboardingEstilosPage implements OnInit {
  styles: DanceStyle[] = [];
  selected: string[] = [];
  academyName = '';
  alias = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  loadingStyles = true;
  error = '';

  constructor(
    private router: Router,
    private state: OnboardingStateService,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.selected = [...this.state.get().styles];
  }

  ngOnInit() {
    this.http.get<DanceStyle[]>(`${environment.apiUrl}/dance-styles`).subscribe({
      next: (s) => { this.styles = s; this.loadingStyles = false; },
      error: () => { this.loadingStyles = false; },
    });
  }

  isSelected(slug: string): boolean {
    return this.selected.includes(slug);
  }

  toggle(slug: string): void {
    if (this.isSelected(slug)) {
      this.selected = this.selected.filter((s) => s !== slug);
    } else {
      this.selected = [...this.selected, slug];
    }
  }

  get canSubmit(): boolean {
    return (
      this.selected.length > 0 &&
      !!this.alias.trim() &&
      this.email.trim().includes('@') &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword
    );
  }

  finish(): void {
    const onboarding = this.state.get();
    if (!onboarding.dancingRole || !onboarding.level || this.selected.length === 0 || !this.alias.trim()) {
      this.error = 'Por favor completa todos los campos requeridos.';
      return;
    }
    if (!this.email.trim().includes('@')) {
      this.error = 'Introduce un email válido.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    this.authService
      .register({
        alias: this.alias.trim(),
        email: this.email.trim(),
        password: this.password,
        countryId: onboarding.countryId ?? undefined,
        cityId: onboarding.cityId ?? undefined,
        dancingRole: onboarding.dancingRole,
        level: onboarding.level,
        styles: this.selected,
        academyName: this.academyName.trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.state.reset();
          this.loading = false;
          this.router.navigate(['/tabs/home'], { replaceUrl: true });
        },
        error: (err) => {
          this.loading = false;
          console.error('Registration error:', err);
          this.error = err?.error?.message ?? 'Error al crear el perfil.';
        },
      });
  }
}
