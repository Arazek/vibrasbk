import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonInput, IonSelect, IonSelectOption, IonToggle, IonItem, IonLabel, IonIcon,
  ModalController, LoadingController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { Venue, EventType } from '@shared/types';
import { AdminService, CreateEventPayload } from '../../services/admin.service';

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const LEVELS = ['beginner', 'initiation', 'comfortable', 'intermediate', 'advanced'];

@Component({
  selector: 'app-event-form-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonInput, IonSelect, IonSelectOption, IonToggle, IonItem, IonLabel, IonIcon,
  ],
  styles: [`
    .form-field { padding: 0.5rem 0; }
    ion-content {
      --background: var(--ion-background-color, #ffffff);
      --color: var(--ion-text-color, #19213D);
    }
    ion-input, ion-select { color: var(--ion-text-color, #19213D); }
    .photo-label {
      display: block;
      cursor: pointer;
    }
    .photo-label ion-button {
      pointer-events: none;
    }
    .photo-preview {
      width: 100%;
      max-height: 10rem;
      object-fit: cover;
      border-radius: var(--lgui-radius-md);
      margin-bottom: var(--lgui-gap-sm);
      display: block;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? 'Editar evento' : 'Nuevo evento' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- ─── Common ─────────────────────────────────────────── -->
      <div class="form-field">
        <ion-select label="Local" labelPlacement="stacked" [(ngModel)]="form.venueId" interface="action-sheet">
          <ion-select-option *ngFor="let v of venues" [value]="v.id">{{ v.name }}</ion-select-option>
        </ion-select>
      </div>
      <div class="form-field">
        <ion-select label="Tipo" labelPlacement="stacked" [(ngModel)]="form.type" interface="action-sheet">
          <ion-select-option value="social">Social</ion-select-option>
          <ion-select-option value="intensive">Intensivo</ion-select-option>
          <ion-select-option value="congress">Congreso</ion-select-option>
        </ion-select>
      </div>
      <div class="form-field">
        <ion-input label="Nombre (opcional)" labelPlacement="stacked" [(ngModel)]="form.name"></ion-input>
      </div>

      <!-- ─── Social ─────────────────────────────────────────── -->
      <ng-container *ngIf="form.type === 'social'">
        <div class="section-title">Horario</div>
        <ion-item lines="none" style="padding: 0;">
          <ion-label>¿Es recurrente (semanal)?</ion-label>
          <ion-toggle slot="end" [(ngModel)]="isRecurring"></ion-toggle>
        </ion-item>

        <!-- Recurring: day of week -->
        <ng-container *ngIf="isRecurring">
          <div class="form-field">
            <ion-select label="Día de la semana" labelPlacement="stacked" [(ngModel)]="form.dayOfWeek" interface="action-sheet">
              <ion-select-option *ngFor="let d of dayOptions; let i = index" [value]="i">{{ d }}</ion-select-option>
            </ion-select>
          </div>
        </ng-container>

        <!-- One-time: specific date -->
        <ng-container *ngIf="!isRecurring">
          <div class="form-field">
            <ion-input label="Fecha (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.startDate" placeholder="2026-06-14"></ion-input>
          </div>
        </ng-container>

        <div class="form-field">
          <ion-input label="Hora inicio (HH:MM)" labelPlacement="stacked" [(ngModel)]="form.startTime" placeholder="21:00"></ion-input>
        </div>

        <div class="section-title">Detalles</div>
        <ion-item lines="none" style="padding: 0;">
          <ion-label>¿Hay taller incluido?</ion-label>
          <ion-toggle slot="end" [(ngModel)]="form.workshopIncluded"></ion-toggle>
        </ion-item>
        <div class="form-field">
          <ion-input label="Precio entrada (€)" labelPlacement="stacked" type="number" [(ngModel)]="form.entryPrice"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Instructores (separados por coma)" labelPlacement="stacked" [(ngModel)]="instructorsStr"></ion-input>
        </div>
      </ng-container>

      <!-- ─── Intensive: puntual ─────────────────────────────── -->
      <ng-container *ngIf="form.type === 'intensive'">
        <div class="section-title">Fechas</div>
        <div class="form-field">
          <ion-input label="Fecha inicio (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.startDate" placeholder="2026-04-01"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Fecha fin (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.endDate" placeholder="2026-04-03"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Hora inicio (HH:MM)" labelPlacement="stacked" [(ngModel)]="form.startTime" placeholder="10:00"></ion-input>
        </div>
        <div class="section-title">Contenido</div>
        <div class="form-field">
          <ion-input label="Título" labelPlacement="stacked" [(ngModel)]="form.title"></ion-input>
        </div>
        <div class="form-field">
          <ion-select label="Nivel" labelPlacement="stacked" [(ngModel)]="form.level" interface="action-sheet">
            <ion-select-option *ngFor="let n of levels" [value]="n">{{ n }}</ion-select-option>
          </ion-select>
        </div>
        <div class="form-field">
          <ion-input label="Instructores (separados por coma)" labelPlacement="stacked" [(ngModel)]="instructorsStr"></ion-input>
        </div>
      </ng-container>

      <!-- ─── Congress: puntual ──────────────────────────────── -->
      <ng-container *ngIf="form.type === 'congress'">
        <div class="section-title">Fechas</div>
        <div class="form-field">
          <ion-input label="Fecha inicio (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.startDate" placeholder="2026-05-01"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Duración (días)" labelPlacement="stacked" type="number" [(ngModel)]="form.durationDays"></ion-input>
        </div>
        <div class="section-title">Detalles</div>
        <div class="form-field">
          <ion-input label="Título" labelPlacement="stacked" [(ngModel)]="form.title"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Localidad" labelPlacement="stacked" [(ngModel)]="form.locality"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Precios (texto libre, ej: Pase completo 80€)" labelPlacement="stacked" [(ngModel)]="pricesStr"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Enlace web" labelPlacement="stacked" type="url" [(ngModel)]="form.websiteUrl"></ion-input>
        </div>
      </ng-container>

      <!-- ─── Photo upload (edit only) ──────────────────────── -->
      <ng-container *ngIf="editingId">
        <div class="section-title">Foto del evento</div>
        <img *ngIf="currentPhotoUrl" [src]="currentPhotoUrl" class="photo-preview" />
        <label class="photo-label">
          <input type="file" accept="image/*" style="display:none" (change)="uploadPhoto($event)">
          <ion-button expand="block" fill="outline" [disabled]="uploading">
            <ion-icon slot="start" name="camera"></ion-icon>
            {{ uploading ? 'Subiendo...' : (currentPhotoUrl ? 'Cambiar foto' : 'Subir foto') }}
          </ion-button>
        </label>
      </ng-container>

      <ion-button expand="block" style="margin-top: 1.5rem;" (click)="submit()">
        {{ editingId ? 'Guardar cambios' : 'Crear evento' }}
      </ion-button>
    </ion-content>
  `,
})
export class EventFormModal implements OnInit {
  @Input() editingId: string | null = null;
  @Input() initial: Partial<CreateEventPayload> = {};
  @Input() venues: Venue[] = [];
  @Input() currentPhotoUrl: string | null = null;

  form: CreateEventPayload = { venueId: '', type: 'social', dayOfWeek: 0, startTime: '21:00' };

  dayOptions = DAY_NAMES;
  levels = LEVELS;
  isRecurring = true;
  uploading = false;

  // Helper strings for array fields
  instructorsStr = '';
  pricesStr = '';

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private admin: AdminService,
  ) { addIcons({ camera }); }

  ngOnInit() {
    this.form = {
      ...this.initial,
      venueId: this.initial.venueId ?? this.venues[0]?.id ?? '',
      type: (this.initial.type as EventType) ?? 'social',
      dayOfWeek: this.initial.dayOfWeek ?? 0,
      startTime: this.initial.startTime ?? '21:00',
    };
    // When editing a social: recurring if it has dayOfWeek, one-time if it has startDate
    if (this.form.type === 'social') {
      this.isRecurring = this.initial.startDate == null;
    }
    this.instructorsStr = (this.initial.instructors ?? []).join(', ');
    this.pricesStr = this.initial.prices ?? '';
  }

  dismiss() { this.modalCtrl.dismiss(null); }

  async uploadPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !this.editingId) return;
    this.uploading = true;
    const loading = await this.loadingCtrl.create({ message: 'Subiendo foto...' });
    await loading.present();
    this.admin.uploadEventPhoto(this.editingId, file).subscribe({
      next: (ev) => {
        this.currentPhotoUrl = ev.photoUrl
          ? (ev.photoUrl.startsWith('http') ? ev.photoUrl : (window.location.origin.replace(/:\d+$/, ':3333') + ev.photoUrl))
          : null;
        loading.dismiss();
        this.uploading = false;
      },
      error: () => { loading.dismiss(); this.uploading = false; },
    });
    (event.target as HTMLInputElement).value = '';
  }

  submit() {
    if (!this.form.venueId) return;
    // For social: clear the field that doesn't apply to the chosen mode
    if (this.form.type === 'social') {
      if (this.isRecurring) {
        this.form.startDate = undefined;
      } else {
        this.form.dayOfWeek = undefined;
      }
    }
    if (this.form.type === 'social' || this.form.type === 'intensive') {
      this.form.instructors = this.instructorsStr ? this.instructorsStr.split(',').map((s) => s.trim()) : undefined;
    }
    if (this.form.type === 'congress') {
      this.form.prices = this.pricesStr || undefined;
    }
    this.modalCtrl.dismiss({ form: this.form });
  }
}
