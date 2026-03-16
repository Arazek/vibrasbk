import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
  IonToast, IonSpinner, ModalController, AlertController, NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, pencil, chevronBack } from 'ionicons/icons';
import { Venue } from '@shared/types';
import { AdminService } from '../../services/admin.service';
import { VenueFormModal } from './venue-form.modal';

@Component({
  selector: 'app-admin-venues',
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
        <ion-title>Locales</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngIf="loading" class="ion-text-center ion-padding">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <ion-list *ngIf="!loading">
        <ion-item *ngFor="let venue of venues">
          <ion-label>
            <h3>{{ venue.nombre }}</h3>
            <p>{{ venue.ciudad }}</p>
            <p *ngIf="venue.aforoMaximo">Aforo: {{ venue.aforoMaximo }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" (click)="openEdit(venue)">
            <ion-icon name="pencil"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" color="danger" (click)="confirmDelete(venue)">
            <ion-icon name="trash"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button color="primary" (click)="openCreate()">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-toast [isOpen]="!!toast" [message]="toast" duration="2500" (didDismiss)="toast = ''"></ion-toast>
    </ion-content>
  `,
})
export class AdminVenuesPage implements OnInit {
  venues: Venue[] = [];
  loading = true;
  toast = '';

  constructor(
    private admin: AdminService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) { addIcons({ add, trash, pencil, chevronBack }); }

  goBack() { this.navCtrl.navigateBack('/admin'); }

  ngOnInit() { this.loadVenues(); }

  loadVenues() {
    this.loading = true;
    this.admin.getVenues().subscribe({
      next: (v) => { this.venues = v; this.loading = false; },
      error: () => { this.toast = 'Error cargando locales'; this.loading = false; },
    });
  }

  async openCreate() {
    const modal = await this.modalCtrl.create({
      component: VenueFormModal,
      componentProps: { editingId: null, initial: { nombre: '', ciudad: 'Cartagena' } },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data?.form) return;
    this.admin.createVenue(data.form).subscribe({
      next: () => { this.toast = 'Local creado'; this.loadVenues(); },
      error: () => { this.toast = 'Error al crear'; },
    });
  }

  async openEdit(venue: Venue) {
    const modal = await this.modalCtrl.create({
      component: VenueFormModal,
      componentProps: {
        editingId: venue.id,
        initial: { nombre: venue.nombre, ciudad: venue.ciudad, lat: venue.lat, lng: venue.lng, aforoMaximo: venue.aforoMaximo },
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!data?.form) return;
    this.admin.updateVenue(venue.id, data.form).subscribe({
      next: () => { this.toast = 'Local actualizado'; this.loadVenues(); },
      error: () => { this.toast = 'Error al actualizar'; },
    });
  }

  async confirmDelete(venue: Venue) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar local',
      message: 'Eliminar ' + venue.nombre + '?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => {
          this.admin.deleteVenue(venue.id).subscribe({
            next: () => { this.toast = 'Local eliminado'; this.loadVenues(); },
            error: () => { this.toast = 'Error al eliminar'; },
          });
        }},
      ],
    });
    await alert.present();
  }
}
