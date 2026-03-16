import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
  IonToast, IonSpinner, ModalController, AlertController, NavController, LoadingController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, pencil, camera, chevronBack } from 'ionicons/icons';
import { WeeklyEvent, Venue } from '@shared/types';
import { AdminService } from '../../services/admin.service';
import { EventFormModal } from './event-form.modal';
import { environment } from '../../../environments/environment';

const DAY_NAMES = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
    IonToast, IonSpinner,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="goBack()">
            <ion-icon slot="start" name="chevron-back"></ion-icon>
            Admin
          </ion-button>
        </ion-buttons>
        <ion-title>Eventos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngIf="loading" class="ion-text-center ion-padding">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <ion-list *ngIf="!loading">
        <ion-item *ngFor="let ev of events">
          <!-- Thumbnail: shows uploaded photo or placeholder -->
          <img *ngIf="ev.fotoUrl" slot="start" [src]="photoThumb(ev.fotoUrl)"
            style="width:44px; height:44px; object-fit:cover; border-radius:8px; flex-shrink:0;" />
          <div *ngIf="!ev.fotoUrl" slot="start"
            style="width:44px; height:44px; border-radius:8px; background:var(--lgui-surface-3); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">🎵</div>
          <ion-label>
            <h3>{{ ev.venue?.nombre }} - {{ ev.tipo }}</h3>
            <p>{{ dayName(ev.diaSemana) }} {{ ev.horaInicio }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" (click)="openPhotoUpload(ev)"
            [color]="ev.fotoUrl ? 'success' : 'medium'">
            <ion-icon name="camera"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" (click)="openEdit(ev)">
            <ion-icon name="pencil"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" color="danger" (click)="confirmDelete(ev)">
            <ion-icon name="trash"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
      <!-- Hidden file input for photo upload -->
      <input #photoInput type="file" accept="image/*" style="display:none"
        (change)="onPhotoSelected($event)">
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button color="primary" (click)="openCreate()">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-toast [isOpen]="!!toast" [message]="toast" duration="2500" (didDismiss)="toast = ''"></ion-toast>
    </ion-content>
  `,
})
export class AdminEventsPage implements OnInit {
  @ViewChild('photoInput') photoInput!: ElementRef<HTMLInputElement>;

  events: WeeklyEvent[] = [];
  venues: Venue[] = [];
  loading = true;
  toast = '';
  selectedEventId: string | null = null;

  constructor(
    private admin: AdminService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { addIcons({ add, trash, pencil, camera, chevronBack }); }

  goBack() { this.navCtrl.navigateBack('/admin'); }

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.admin.getEvents().subscribe({
      next: (evs) => { this.events = evs; this.loading = false; },
      error: () => { this.loading = false; },
    });
    this.admin.getVenues().subscribe({ next: (vs) => { this.venues = vs; } });
  }

  dayName(idx: number): string { return DAY_NAMES[idx] ?? ''; }

  photoThumb(url: string): string {
    return url.startsWith('http') ? url : environment.socketUrl + url;
  }

  async openCreate() {
    const modal = await this.modalCtrl.create({
      component: EventFormModal,
      componentProps: {
        editingId: null, venues: this.venues,
        initial: { venueId: this.venues[0]?.id ?? '', tipo: 'social', diaSemana: 0, horaInicio: '21:00' },
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data?.form) return;
    this.admin.createEvent(data.form).subscribe({
      next: () => { this.toast = 'Evento creado'; this.load(); },
      error: (e: any) => { this.toast = e?.error?.message ?? 'Error al crear'; },
    });
  }

  async openEdit(ev: WeeklyEvent) {
    const modal = await this.modalCtrl.create({
      component: EventFormModal,
      componentProps: {
        editingId: ev.id, venues: this.venues,
        initial: { venueId: ev.venue?.id ?? '', tipo: ev.tipo, diaSemana: ev.diaSemana ?? 0, horaInicio: ev.horaInicio, nombre: ev.nombre, precio: ev.precio, profesores: ev.profesores, instructores: ev.instructores, fechaFin: ev.fechaFin, fechaInicio: ev.fechaInicio, titulo: ev.titulo, nivel: ev.nivel, precioEntrada: ev.precioEntrada, tallerIncluido: ev.tallerIncluido, localidad: ev.localidad, duracionDias: ev.duracionDias, precios: ev.precios, enlaceWeb: ev.enlaceWeb },
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data?.form) return;
    this.admin.updateEvent(ev.id, data.form).subscribe({
      next: () => { this.toast = 'Evento actualizado'; this.load(); },
      error: (e: any) => { this.toast = e?.error?.message ?? 'Error al actualizar'; },
    });
  }

  openPhotoUpload(ev: WeeklyEvent) {
    this.selectedEventId = ev.id;
    this.photoInput.nativeElement.click();
  }

  async onPhotoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !this.selectedEventId) return;
    const loading = await this.loadingCtrl.create({ message: 'Subiendo foto...' });
    await loading.present();
    this.admin.uploadEventPhoto(this.selectedEventId, file).subscribe({
      next: () => { loading.dismiss(); this.toast = 'Foto subida'; this.load(); },
      error: () => { loading.dismiss(); this.toast = 'Error al subir foto'; },
    });
    (event.target as HTMLInputElement).value = '';
  }

  async confirmDelete(ev: WeeklyEvent) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar evento',
      message: 'Eliminar este evento?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => {
          this.admin.deleteEvent(ev.id).subscribe({
            next: () => { this.toast = 'Evento eliminado'; this.load(); },
            error: () => { this.toast = 'Error al eliminar'; },
          });
        }},
      ],
    });
    await alert.present();
  }
}
