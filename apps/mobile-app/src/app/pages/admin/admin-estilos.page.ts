import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
  IonToast, IonSpinner, IonInput, ModalController, AlertController, NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, pencil, chevronBack } from 'ionicons/icons';
import { DanceStyle } from '@shared/types';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-estilos',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
    IonToast, IonSpinner, IonInput,
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
        <ion-title>Estilos de Baile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngIf="loading" class="ion-text-center ion-padding">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <ion-list *ngIf="!loading">
        <ion-item *ngFor="let style of styles">
          <ion-label>
            <h3>{{ style.nombre }}</h3>
            <p>{{ style.slug }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" (click)="openEdit(style)">
            <ion-icon name="pencil"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" color="danger" (click)="confirmDelete(style)">
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
export class AdminEstilosPage implements OnInit {
  styles: DanceStyle[] = [];
  loading = true;
  toast = '';

  constructor(
    private admin: AdminService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) { addIcons({ add, trash, pencil, chevronBack }); }

  goBack() { this.navCtrl.navigateBack('/admin'); }
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.admin.getDanceStyles().subscribe({
      next: (s) => { this.styles = s; this.loading = false; },
      error: () => { this.loading = false; this.toast = 'Error cargando estilos'; },
    });
  }

  async openCreate() {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo estilo',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre (ej: Salsa Cubana)' },
        { name: 'slug', type: 'text', placeholder: 'Slug (ej: salsa_cubana)' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data): boolean => {
            if (!data.nombre || !data.slug) return false;
            this.admin.createDanceStyle({ nombre: data.nombre, slug: data.slug }).subscribe({
              next: () => { this.toast = 'Estilo creado'; this.load(); },
              error: () => { this.toast = 'Error al crear estilo'; },
            });
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async openEdit(style: DanceStyle) {
    const alert = await this.alertCtrl.create({
      header: 'Editar estilo',
      inputs: [
        { name: 'nombre', type: 'text', value: style.nombre, placeholder: 'Nombre' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data): boolean => {
            if (!data.nombre) return false;
            this.admin.updateDanceStyle(style.id, { nombre: data.nombre }).subscribe({
              next: () => { this.toast = 'Estilo actualizado'; this.load(); },
              error: () => { this.toast = 'Error al actualizar'; },
            });
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmDelete(style: DanceStyle) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar estilo',
      message: `¿Eliminar "${style.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.admin.deleteDanceStyle(style.id).subscribe({
              next: () => { this.toast = 'Estilo eliminado'; this.load(); },
              error: () => { this.toast = 'Error al eliminar'; },
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
