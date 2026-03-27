import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  IonContent,
  IonButton, IonSpinner, IonText, IonList, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonInput, IonChip, IonToast, IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ThemeService, THEMES, AppTheme } from '../../services/theme.service';
import { addIcons } from 'ionicons';
import { logOutOutline, cameraOutline } from 'ionicons/icons';
import { UserProfile, Level, DanceStyle } from '@shared/types';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { StyleChipGridComponent } from '../../components/style-chip-grid/style-chip-grid.component';

const LEVEL_OPTIONS: { value: Level; label: string }[] = [
  { value: 'beginner',     label: 'Nuevo' },
  { value: 'initiation',   label: 'Iniciación' },
  { value: 'comfortable',  label: 'Social cómodo' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced',     label: 'Avanzado' },
];

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent,
    IonButton, IonSpinner, IonText, IonList, IonItem, IonLabel,
    IonSelect, IonSelectOption, IonInput, IonChip, IonToast, IonIcon,
    StyleChipGridComponent, NavbarComponent,
  ],
  styles: [`
    .identity-card {
      background: transparent;
      padding: var(--lgui-pad-lg) var(--lgui-pad-md);
      margin-bottom: var(--lgui-gap-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--lgui-gap-md);
    }
    .avatar-wrap {
      position: relative;
      cursor: pointer;
      flex-shrink: 0;
    }
    .avatar {
      --avatar-size: var(--lgui-space-8);
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 50%;
      background: rgba(var(--ion-color-primary-rgb), 0.15);
      border: 0.125rem solid var(--ion-color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--lgui-fs-display);
      font-weight: var(--lgui-fw-bold);
      color: var(--ion-color-primary);
      letter-spacing: -0.0313rem;
      overflow: hidden;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .avatar-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      background: var(--ion-color-primary);
      border: 0.125rem solid var(--lgui-surface-1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ion-color-primary-contrast);
      font-size: 0.875rem;
    }
    .avatar-uploading {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--lgui-scrim);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .identity-info { text-align: center; min-width: 0; }
    .identity-alias {
      font-size: var(--lgui-fs-heading);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .identity-meta { font-size: var(--lgui-fs-body); color: var(--lgui-text-3); margin-top: var(--lgui-space-0); }
    .bottom-space { height: var(--lgui-space-8); }

    .theme-grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lgui-gap-lg);
      margin-bottom: var(--lgui-gap-xl);
    }
    .theme-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.375rem;
      cursor: pointer;
    }
    .theme-swatch {
      --swatch-size: 2.75rem;
      width: var(--swatch-size);
      height: var(--swatch-size);
      border-radius: 50%;
      border: 0.1875rem solid transparent;
      transition: border-color var(--lgui-transition-fast);
    }
    .theme-card.active .theme-swatch {
      border-color: var(--ion-color-primary);
    }
    .theme-label {
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-3);
    }
    .theme-card.active .theme-label {
      color: var(--lgui-text-4);
    }
  `],
  template: `
    <app-navbar></app-navbar>

    <!-- Hidden file input for photo picking -->
    <input
      #photoInput
      type="file"
      accept="image/jpeg,image/png,image/webp"
      style="display:none"
      (change)="onPhotoSelected($event)">

    <ion-content class="ion-padding">
      <div *ngIf="loading" class="ion-text-center" class="loading-container">
        <ion-spinner color="primary"></ion-spinner>
      </div>

      <div *ngIf="profile && !loading">
        <!-- Identity card -->
        <div class="identity-card">
          <div class="avatar-wrap" (click)="photoInput.click()" role="button" aria-label="Cambiar foto de perfil">
            <div class="avatar">
              <img *ngIf="photoSrc" [src]="photoSrc" alt="Foto de perfil">
              <span *ngIf="!photoSrc">{{ initials }}</span>
            </div>
            <div class="avatar-badge">
              <ion-icon name="camera-outline" aria-hidden="true"></ion-icon>
            </div>
            <div *ngIf="uploadingPhoto" class="avatar-uploading">
              <ion-spinner name="crescent" color="light"></ion-spinner>
            </div>
          </div>
          <div class="identity-info">
            <div class="identity-alias">{{ profile.alias }}</div>
            <div class="identity-meta">{{ profile.city?.name ?? profile.country?.capital ?? profile.country?.name }} · {{ roleLabel }}</div>
          </div>
        </div>

        <!-- Admin button -->
        <ion-button
          *ngIf="profile.applicationRole === 'admin' || profile.applicationRole === 'superadmin'"
          expand="block"
          color="secondary"
          (click)="router.navigate(['/admin'])">
          Panel Admin
        </ion-button>

        <!-- Level (editable) -->
        <div class="section-title">Nivel</div>
        <ion-list class="form-list" style="margin-bottom: 0;">
          <ion-item>
            <ion-label>Nivel actual</ion-label>
            <ion-select [(ngModel)]="selectedLevel" interface="action-sheet">
              <ion-select-option *ngFor="let n of levelOptions" [value]="n.value">
                {{ n.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <!-- Styles (editable, API-driven) -->
        <div class="section-title">Estilos</div>
        <app-style-chip-grid
          [styles]="styleOptions"
          [selected]="selectedStyles"
          [loading]="loadingStyles"
          (selectionChange)="selectedStyles = $event">
        </app-style-chip-grid>

        <!-- Academia (free text) -->
        <div class="section-title">Academia</div>
        <ion-list class="form-list">
          <ion-item>
            <ion-input
              [(ngModel)]="academyName"
              placeholder="Nombre de tu academia"
              autocomplete="organization">
            </ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="block" [disabled]="!!(saving || selectedStyles.length === 0)" (click)="save()">
          {{ saving ? 'Guardando...' : 'Guardar cambios' }}
        </ion-button>

        <!-- Theme picker -->
        <div class="section-title">Apariencia</div>
        <div class="theme-grid">
          <div
            *ngFor="let t of themes"
            class="theme-card"
            [class.active]="activeTheme === t.id"
            (click)="setTheme(t.id)">
            <div class="theme-swatch" [style.background]="t.preview"></div>
            <div class="theme-label">{{ t.label }}</div>
          </div>
        </div>

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
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;

  profile: UserProfile | null = null;
  loading = true;
  loadingStyles = true;
  saving = false;
  uploadingPhoto = false;
  toastMsg = '';

  selectedLevel: Level = 'comfortable';
  selectedStyles: string[] = [];
  academyName = '';

  levelOptions = LEVEL_OPTIONS;
  styleOptions: DanceStyle[] = [];

  themes = THEMES;
  activeTheme: AppTheme = 'noir';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    public router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private readonly themeService: ThemeService,
  ) {
    addIcons({ logOutOutline, cameraOutline });
    this.activeTheme = this.themeService.getTheme();
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (p) => {
        this.profile = p;
        this.selectedLevel = p.level;
        this.selectedStyles = [...p.styles];
        this.academyName = p.academyName ?? '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastMsg = 'No se pudo cargar el perfil.';
      },
    });
    this.http.get<DanceStyle[]>(`${environment.apiUrl}/dance-styles`).subscribe({
      next: (s) => { this.styleOptions = s; this.loadingStyles = false; },
      error: () => { this.loadingStyles = false; },
    });
  }

  get initials(): string {
    return (this.profile?.alias ?? '?').slice(0, 2).toUpperCase();
  }

  get roleLabel(): string {
    const map: Record<string, string> = { leader: 'Leader', follower: 'Follower', switch: 'Switch' };
    return map[this.profile?.dancingRole ?? ''] ?? '';
  }

  get photoSrc(): string | null {
    const url = this.profile?.photoUrl;
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return environment.socketUrl + url;
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingPhoto = true;
    this.profileService.uploadPhoto(file).subscribe({
      next: (p) => {
        this.profile = p;
        this.uploadingPhoto = false;
        this.toastMsg = 'Foto actualizada.';
      },
      error: () => {
        this.uploadingPhoto = false;
        this.toastMsg = 'Error al subir la foto.';
      },
    });
    // Reset so the same file can be re-selected
    (event.target as HTMLInputElement).value = '';
  }

  isSelected(slug: string): boolean {
    return this.selectedStyles.includes(slug);
  }

  toggleStyle(slug: string): void {
    if (this.isSelected(slug)) {
      this.selectedStyles = this.selectedStyles.filter((s) => s !== slug);
    } else {
      this.selectedStyles = [...this.selectedStyles, slug];
    }
  }

  save() {
    this.saving = true;
    this.profileService.updateProfile({
      level: this.selectedLevel,
      styles: this.selectedStyles,
      academyName: this.academyName.trim() || undefined,
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

  setTheme(theme: AppTheme) {
    this.activeTheme = theme;
    this.themeService.setTheme(theme);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
