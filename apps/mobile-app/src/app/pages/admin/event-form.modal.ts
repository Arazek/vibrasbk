import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonInput, IonSelect, IonSelectOption, IonToggle, IonItem, IonLabel, ModalController,
} from '@ionic/angular/standalone';
import { Venue, TipoEvento } from '@shared/types';
import { CreateEventPayload } from '../../services/admin.service';

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const NIVELES = ['nuevo', 'iniciacion', 'social_comodo', 'intermedio', 'avanzado'];

@Component({
  selector: 'app-event-form-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonInput, IonSelect, IonSelectOption, IonToggle, IonItem, IonLabel,
  ],
  styles: [`
    .form-field { padding: 8px 0; }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: var(--lgui-text-3);
      padding: 16px 0 4px;
    }
    ion-content {
      --background: var(--ion-background-color, #ffffff);
      --color: var(--ion-text-color, #19213D);
    }
    ion-input, ion-select { color: var(--ion-text-color, #19213D); }
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

      <!-- ─── Comunes ─────────────────────────────────────────── -->
      <div class="form-field">
        <ion-select label="Local" labelPlacement="stacked" [(ngModel)]="form.venueId" interface="action-sheet">
          <ion-select-option *ngFor="let v of venues" [value]="v.id">{{ v.nombre }}</ion-select-option>
        </ion-select>
      </div>
      <div class="form-field">
        <ion-select label="Tipo" labelPlacement="stacked" [(ngModel)]="form.tipo" interface="action-sheet">
          <ion-select-option value="social">Social</ion-select-option>
          <ion-select-option value="intensivo">Intensivo</ion-select-option>
          <ion-select-option value="congreso">Congreso</ion-select-option>
        </ion-select>
      </div>
      <div class="form-field">
        <ion-input label="Nombre (opcional)" labelPlacement="stacked" [(ngModel)]="form.nombre"></ion-input>
      </div>

      <!-- ─── Social: recurrente ─────────────────────────────── -->
      <ng-container *ngIf="form.tipo === 'social'">
        <div class="section-title">Horario recurrente</div>
        <div class="form-field">
          <ion-select label="Día de la semana" labelPlacement="stacked" [(ngModel)]="form.diaSemana" interface="action-sheet">
            <ion-select-option *ngFor="let d of dayOptions; let i = index" [value]="i">{{ d }}</ion-select-option>
          </ion-select>
        </div>
        <div class="form-field">
          <ion-input label="Hora inicio (HH:MM)" labelPlacement="stacked" [(ngModel)]="form.horaInicio" placeholder="21:00"></ion-input>
        </div>
        <div class="section-title">Detalles</div>
        <ion-item lines="none" style="padding: 0;">
          <ion-label>¿Hay taller incluido?</ion-label>
          <ion-toggle slot="end" [(ngModel)]="form.tallerIncluido"></ion-toggle>
        </ion-item>
        <div class="form-field">
          <ion-input label="Precio entrada (€)" labelPlacement="stacked" type="number" [(ngModel)]="form.precioEntrada"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Instructores (separados por coma)" labelPlacement="stacked" [(ngModel)]="instructoresStr"></ion-input>
        </div>
      </ng-container>

      <!-- ─── Intensivo: puntual ─────────────────────────────── -->
      <ng-container *ngIf="form.tipo === 'intensivo'">
        <div class="section-title">Fechas</div>
        <div class="form-field">
          <ion-input label="Fecha inicio (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.fechaInicio" placeholder="2026-04-01"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Fecha fin (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.fechaFin" placeholder="2026-04-03"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Hora inicio (HH:MM)" labelPlacement="stacked" [(ngModel)]="form.horaInicio" placeholder="10:00"></ion-input>
        </div>
        <div class="section-title">Contenido</div>
        <div class="form-field">
          <ion-input label="Título" labelPlacement="stacked" [(ngModel)]="form.titulo"></ion-input>
        </div>
        <div class="form-field">
          <ion-select label="Nivel" labelPlacement="stacked" [(ngModel)]="form.nivel" interface="action-sheet">
            <ion-select-option *ngFor="let n of niveles" [value]="n">{{ n }}</ion-select-option>
          </ion-select>
        </div>
        <div class="form-field">
          <ion-input label="Precio (€)" labelPlacement="stacked" type="number" [(ngModel)]="form.precio"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Profesores (separados por coma)" labelPlacement="stacked" [(ngModel)]="profesoresStr"></ion-input>
        </div>
      </ng-container>

      <!-- ─── Congreso: puntual ──────────────────────────────── -->
      <ng-container *ngIf="form.tipo === 'congreso'">
        <div class="section-title">Fechas</div>
        <div class="form-field">
          <ion-input label="Fecha inicio (YYYY-MM-DD)" labelPlacement="stacked" [(ngModel)]="form.fechaInicio" placeholder="2026-05-01"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Duración (días)" labelPlacement="stacked" type="number" [(ngModel)]="form.duracionDias"></ion-input>
        </div>
        <div class="section-title">Detalles</div>
        <div class="form-field">
          <ion-input label="Título" labelPlacement="stacked" [(ngModel)]="form.titulo"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Localidad" labelPlacement="stacked" [(ngModel)]="form.localidad"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Precios (texto libre, ej: Pase completo 80€)" labelPlacement="stacked" [(ngModel)]="preciosStr"></ion-input>
        </div>
        <div class="form-field">
          <ion-input label="Enlace web" labelPlacement="stacked" type="url" [(ngModel)]="form.enlaceWeb"></ion-input>
        </div>
      </ng-container>

      <ion-button expand="block" style="margin-top: 24px;" (click)="submit()">
        {{ editingId ? 'Guardar cambios' : 'Crear evento' }}
      </ion-button>
    </ion-content>
  `,
})
export class EventFormModal implements OnInit {
  @Input() editingId: string | null = null;
  @Input() initial: Partial<CreateEventPayload> = {};
  @Input() venues: Venue[] = [];

  form: CreateEventPayload = { venueId: '', tipo: 'social', diaSemana: 0, horaInicio: '21:00' };

  dayOptions = DAY_NAMES;
  niveles = NIVELES;

  // Helper strings for array fields
  instructoresStr = '';
  profesoresStr = '';
  preciosStr = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.form = {
      ...this.initial,
      venueId: this.initial.venueId ?? this.venues[0]?.id ?? '',
      tipo: (this.initial.tipo as TipoEvento) ?? 'social',
      diaSemana: this.initial.diaSemana ?? 0,
      horaInicio: this.initial.horaInicio ?? '21:00',
    };
    this.instructoresStr = (this.initial.instructores ?? []).join(', ');
    this.profesoresStr = (this.initial.profesores ?? []).join(', ');
    this.preciosStr = this.initial.precios ?? '';
  }

  dismiss() { this.modalCtrl.dismiss(null); }

  submit() {
    if (!this.form.venueId) return;
    // Parse array helpers back
    if (this.form.tipo === 'social') {
      this.form.instructores = this.instructoresStr ? this.instructoresStr.split(',').map((s) => s.trim()) : undefined;
    }
    if (this.form.tipo === 'intensivo') {
      this.form.profesores = this.profesoresStr ? this.profesoresStr.split(',').map((s) => s.trim()) : undefined;
    }
    if (this.form.tipo === 'congreso') {
      this.form.precios = this.preciosStr || undefined;
    }
    this.modalCtrl.dismiss({ form: this.form });
  }
}
