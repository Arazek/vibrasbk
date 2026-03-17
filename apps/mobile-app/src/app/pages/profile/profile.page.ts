import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonSpinner, IonText, IonList, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonChip, IonToast, IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { UserProfile, Nivel, DanceStyle, Academia } from '@shared/types';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

const NIVEL_OPTIONS: { value: Nivel; label: string }[] = [
  { value: 'nuevo',         label: 'Nuevo' },
  { value: 'iniciacion',    label: 'Iniciación' },
  { value: 'social_comodo', label: 'Social cómodo' },
  { value: 'intermedio',    label: 'Intermedio' },
  { value: 'avanzado',      label: 'Avanzado' },
];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonSpinner, IonText, IonList, IonItem, IonLabel,
    IonSelect, IonSelectOption, IonChip, IonToast, IonIcon,
  ],
  styles: [`
    .identity-card {
      background: var(--ion-color-primary);
      border-radius: var(--lgui-radius-default);
      padding: var(--lgui-pad-lg) var(--lgui-pad-md);
      margin-bottom: var(--lgui-gap-xl);
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-lg);
      box-shadow: var(--lgui-shadow-accent-md);
    }
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: rgba(255,255,255,0.22);
      border: 2px solid rgba(255,255,255,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
      letter-spacing: -0.5px;
    }
    .identity-info { flex: 1; min-width: 0; }
    .identity-alias {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .identity-meta { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 3px; }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--lgui-text-3);
      margin-bottom: var(--lgui-gap-sm);
      margin-top: var(--lgui-gap-xl);
    }
    .estilos-grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lgui-gap-sm);
      margin-bottom: var(--lgui-gap-xl);
    }
    .estilo-chip { height: 36px; font-size: 13px; font-weight: 500; }
    .bottom-space { height: var(--lgui-space-8); }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">Salir</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div *ngIf="loading" class="ion-text-center" style="padding-top: 60px;">
        <ion-spinner color="primary"></ion-spinner>
      </div>

      <div *ngIf="profile && !loading">
        <!-- Identity card -->
        <div class="identity-card">
          <div class="avatar">{{ initials }}</div>
          <div class="identity-info">
            <div class="identity-alias">{{ profile.alias }}</div>
            <div class="identity-meta">{{ profile.ciudad }} · {{ rolLabel }}</div>
          </div>
        </div>

        <!-- Admin button -->
        <ion-button
          *ngIf="profile.rol === 'admin'"
          expand="block"
          color="secondary"
          (click)="router.navigate(['/admin'])">
          Panel Admin
        </ion-button>

        <!-- Nivel (editable) -->
        <div class="section-title">Nivel</div>
        <ion-list style="border-radius: 10px; overflow: hidden; margin-bottom: 0;">
          <ion-item>
            <ion-label>Nivel actual</ion-label>
            <ion-select [(ngModel)]="selectedNivel" interface="action-sheet">
              <ion-select-option *ngFor="let n of nivelOptions" [value]="n.value">
                {{ n.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <!-- Estilos (editable, API-driven) -->
        <div class="section-title">Estilos</div>
        <div *ngIf="loadingStyles" class="ion-text-center" style="margin-bottom: 16px;">
          <ion-spinner name="dots" color="primary"></ion-spinner>
        </div>
        <div class="estilos-grid" *ngIf="!loadingStyles">
          <ion-chip
            *ngFor="let e of estiloOptions"
            [color]="isSelected(e.slug) ? 'primary' : 'medium'"
            class="estilo-chip"
            (click)="toggleEstilo(e.slug)">
            <ion-label>{{ e.nombre }}</ion-label>
          </ion-chip>
        </div>

        <!-- Academia (dropdown, API-driven) -->
        <div class="section-title">Academia</div>
        <ion-list style="border-radius: 10px; overflow: hidden; margin-bottom: var(--lgui-gap-xl);">
          <ion-item>
            <ion-label>Academia</ion-label>
            <ion-select [(ngModel)]="selectedAcademiaId" interface="action-sheet">
              <ion-select-option [value]="null">Sin academia</ion-select-option>
              <ion-select-option *ngFor="let a of academias" [value]="a.id">{{ a.nombre }}</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-button expand="block" [disabled]="!!(saving || selectedEstilos.length === 0)" (click)="save()">
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </ion-button>

        <!-- Logout -->
        <ion-button
          expand="block"
          fill="clear"
          color="danger"
          style="margin-top: var(--lgui-gap-xl);"
          (click)="confirmLogout()">
          <ion-icon slot="start" name="log-out-outline"></ion-icon>
          Cerrar sesión
        </ion-button>
        <div class="bottom-space"></div>
      </div>

      <ion-toast
        [isOpen]="!!toastMsg"
        [message]="toastMsg"
        duration="2000"
        (didDismiss)="toastMsg = ''">
      </ion-toast>
    </ion-content>
  `,
})
export class ProfilePage implements OnInit {
  profile: UserProfile | null = null;
  loading = true;
  loadingStyles = true;
  saving = false;
  toastMsg = '';

  selectedNivel: Nivel = 'social_comodo';
  selectedEstilos: string[] = [];
  selectedAcademiaId: string | null = null;

  nivelOptions = NIVEL_OPTIONS;
  estiloOptions: DanceStyle[] = [];
  academias: Academia[] = [];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    public router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient,
  ) {
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (p) => {
        this.profile = p;
        this.selectedNivel = p.nivel;
        this.selectedEstilos = [...p.estilos];
        this.selectedAcademiaId = p.academiaId ?? null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastMsg = 'No se pudo cargar el perfil.';
      },
    });
    this.http.get<DanceStyle[]>(`${environment.apiUrl}/dance-styles`).subscribe({
      next: (s) => { this.estiloOptions = s; this.loadingStyles = false; },
      error: () => { this.loadingStyles = false; },
    });
    this.http.get<Academia[]>(`${environment.apiUrl}/academias`).subscribe({
      next: (a) => { this.academias = a; },
    });
  }

  get initials(): string {
    return (this.profile?.alias ?? '?').slice(0, 2).toUpperCase();
  }

  get rolLabel(): string {
    const map: Record<string, string> = { leader: 'Leader', follower: 'Follower', switch: 'Switch', admin: 'Admin' };
    return map[this.profile?.rol ?? ''] ?? '';
  }

  isSelected(slug: string): boolean {
    return this.selectedEstilos.includes(slug);
  }

  toggleEstilo(slug: string): void {
    if (this.isSelected(slug)) {
      this.selectedEstilos = this.selectedEstilos.filter((s) => s !== slug);
    } else {
      this.selectedEstilos = [...this.selectedEstilos, slug];
    }
  }

  save() {
    this.saving = true;
    this.profileService.updateProfile({
      nivel: this.selectedNivel,
      estilos: this.selectedEstilos,
      academiaId: this.selectedAcademiaId ?? undefined,
    }).subscribe({
      next: (p) => {
        this.profile = p;
        this.saving = false;
        this.toastMsg = 'Perfil actualizado.';
      },
      error: () => {
        this.saving = false;
        this.toastMsg = 'Error al guardar.';
      },
    });
  }

  async confirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que quieres salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salir', role: 'destructive', handler: () => this.logout() },
      ],
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/onboarding/ciudad'], { replaceUrl: true });
  }
}
