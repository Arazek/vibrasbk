import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
  IonChip, IonLabel, IonItem, IonInput, IonList, IonToast, IonProgressBar,
  IonSelect, IonSelectOption, IonSpinner,
} from '@ionic/angular/standalone';
import { DanceStyle, Academia } from '@shared/types';
import { OnboardingStateService } from '../../../services/onboarding-state.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-onboarding-estilos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonChip, IonLabel, IonItem, IonInput, IonList, IonToast, IonProgressBar,
    IonSelect, IonSelectOption, IonSpinner,
  ],
  styles: [`
    .question {
      font-size: 22px;
      font-weight: 700;
      color: var(--lgui-text-4);
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 14px;
      color: var(--lgui-text-3);
      margin-bottom: 20px;
    }
    .chips-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 28px;
    }
    .estilo-chip {
      height: 36px;
      font-size: 13px;
      font-weight: 500;
      border-radius: 18px;
      padding: 0 4px;
    }
    .field-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--lgui-text-3);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 4px;
      padding-left: 4px;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--lgui-text-4);
      margin: 24px 0 12px;
      padding-left: 4px;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Paso 4 de 4 — Estilos</ion-title>
      </ion-toolbar>
      <ion-progress-bar value="1.0" color="secondary"></ion-progress-bar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="question">¿Qué estilos bailas?</div>
      <div class="subtitle">Selecciona al menos uno.</div>

      <div *ngIf="loadingStyles" class="ion-text-center" style="margin-bottom: 20px;">
        <ion-spinner color="primary" name="dots"></ion-spinner>
      </div>
      <div class="chips-grid" *ngIf="!loadingStyles">
        <ion-chip
          *ngFor="let e of estilos"
          [color]="isSelected(e.slug) ? 'primary' : 'medium'"
          class="estilo-chip"
          (click)="toggle(e.slug)">
          <ion-label>{{ e.nombre }}</ion-label>
        </ion-chip>
      </div>

      <div class="field-label">Tu alias</div>
      <ion-list lines="none" style="margin-bottom: 16px; border-radius: 10px; overflow: hidden;">
        <ion-item>
          <ion-input [(ngModel)]="alias" placeholder="Ej. salsa_king" required></ion-input>
        </ion-item>
      </ion-list>

      <div class="field-label">Academia (opcional)</div>
      <ion-list lines="none" style="margin-bottom: 24px; border-radius: 10px; overflow: hidden;">
        <ion-item>
          <ion-select [(ngModel)]="selectedAcademiaId" placeholder="Sin academia" interface="action-sheet">
            <ion-select-option [value]="null">Sin academia</ion-select-option>
            <ion-select-option *ngFor="let a of academias" [value]="a.id">{{ a.nombre }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <!-- Account credentials -->
      <div class="section-title">Crea tu cuenta</div>

      <div class="field-label">Email</div>
      <ion-list lines="none" style="margin-bottom: 16px; border-radius: 10px; overflow: hidden;">
        <ion-item>
          <ion-input
            type="email"
            [(ngModel)]="email"
            placeholder="tu@email.com"
            autocomplete="email">
          </ion-input>
        </ion-item>
      </ion-list>

      <div class="field-label">Contraseña (mínimo 6 caracteres)</div>
      <ion-list lines="none" style="margin-bottom: 16px; border-radius: 10px; overflow: hidden;">
        <ion-item>
          <ion-input
            type="password"
            [(ngModel)]="password"
            placeholder="••••••"
            autocomplete="new-password">
          </ion-input>
        </ion-item>
      </ion-list>

      <div class="field-label">Confirmar contraseña</div>
      <ion-list lines="none" style="margin-bottom: 24px; border-radius: 10px; overflow: hidden;">
        <ion-item>
          <ion-input
            type="password"
            [(ngModel)]="confirmPassword"
            placeholder="••••••"
            autocomplete="new-password"
            (keyup.enter)="finish()">
          </ion-input>
        </ion-item>
      </ion-list>

      <ion-button
        expand="block"
        [disabled]="!canSubmit || loading"
        (click)="finish()">
        {{ loading ? 'Creando perfil...' : 'Entrar a la app 🎵' }}
      </ion-button>

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
export class OnboardingEstilosPage implements OnInit {
  estilos: DanceStyle[] = [];
  academias: Academia[] = [];
  selected: string[] = [];
  selectedAcademiaId: string | null = null;
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
    this.selected = [...this.state.get().estilos];
  }

  ngOnInit() {
    this.http.get<DanceStyle[]>(`${environment.apiUrl}/dance-styles`).subscribe({
      next: (s) => { this.estilos = s; this.loadingStyles = false; },
      error: () => { this.loadingStyles = false; },
    });
    this.http.get<Academia[]>(`${environment.apiUrl}/academias`).subscribe({
      next: (a) => { this.academias = a; },
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
    if (!onboarding.rol || !onboarding.nivel || this.selected.length === 0 || !this.alias.trim()) {
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
        rol: onboarding.rol,
        nivel: onboarding.nivel,
        estilos: this.selected,
        academiaId: this.selectedAcademiaId ?? undefined,
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
