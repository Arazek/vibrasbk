import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
  IonToast, IonSpinner, IonBackButton, ModalController, AlertController, NavController, LoadingController,
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
    IonToast, IonSpinner, IonBackButton,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/admin" text=""></ion-back-button>
          <span class="breadcrumb">Eventos</span>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngIf="loading" class="ion-text-center ion-padding">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <ion-list *ngIf="!loading">
        <ion-item *ngFor="let ev of events">
          <!-- Thumbnail: shows uploaded photo or placeholder -->
          <img *ngIf="ev.photoUrl" slot="start" [src]="photoThumb(ev.photoUrl)"
            style="width:2.75rem; height:2.75rem; object-fit:cover; border-radius:0.5rem; flex-shrink:0;" />
          <div *ngIf="!ev.photoUrl" slot="start"
            style="width:2.75rem; height:2.75rem; border-radius:0.5rem; background:var(--lgui-surface-3); display:flex; align-items:center; justify-content:center; font-size:1.25rem; flex-shrink:0;">🎵</div>
          <ion-label>
            <h3>{{ ev.venue?.name }} - {{ ev.type }}</h3>
            <p>{{ dayName(ev.dayOfWeek) }} {{ ev.startTime }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" (click)="openPhotoUpload(ev)"
            [color]="ev.photoUrl ? 'success' : 'medium'">
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
        initial: { venueId: this.venues[0]?.id ?? '', type: 'social', dayOfWeek: 0, startTime: '21:00' },
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
        currentPhotoUrl: ev.photoUrl ? this.photoThumb(ev.photoUrl) : null,
        initial: { venueId: ev.venue?.id ?? '', type: ev.type, dayOfWeek: ev.dayOfWeek ?? 0, startTime: ev.startTime, name: ev.name, instructors: ev.instructors, endDate: ev.endDate, startDate: ev.startDate, title: ev.title, level: ev.level, entryPrice: ev.entryPrice, workshopIncluded: ev.workshopIncluded, locality: ev.locality, durationDays: ev.durationDays, prices: ev.prices, websiteUrl: ev.websiteUrl },
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
