import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonList, IonItem, IonLabel, IonButton, IonFab, IonFabButton, IonIcon,
  IonToast, IonSpinner, IonBackButton, AlertController, NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, pencil, chevronBack } from 'ionicons/icons';
import { Academia } from '@shared/types';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-academias',
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
          <span class="breadcrumb">Academias</span>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngIf="loading" class="ion-text-center ion-padding">
        <ion-spinner color="primary"></ion-spinner>
      </div>
      <ion-list *ngIf="!loading">
        <ion-item *ngFor="let academia of academias">
          <ion-label>
            <h3>{{ academia.name }}</h3>
            <p *ngIf="academia.city">{{ academia.city }}</p>
          </ion-label>
          <ion-button fill="clear" slot="end" (click)="openEdit(academia)">
            <ion-icon name="pencil"></ion-icon>
          </ion-button>
          <ion-button fill="clear" slot="end" color="danger" (click)="confirmDelete(academia)">
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
export class AdminAcademiasPage implements OnInit {
  academias: Academia[] = [];
  loading = true;
  toast = '';

  constructor(
    private admin: AdminService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) { addIcons({ add, trash, pencil, chevronBack }); }

  goBack() { this.navCtrl.navigateBack('/admin'); }
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.admin.getAcademias().subscribe({
      next: (a) => { this.academias = a; this.loading = false; },
      error: () => { this.loading = false; this.toast = 'Error cargando academias'; },
    });
  }

  async openCreate() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva academia',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre de la academia' },
        { name: 'city', type: 'text', placeholder: 'Ciudad (opcional)' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data): boolean => {
            if (!data.name) return false;
            this.admin.createAcademia({ name: data.name, city: data.city || undefined }).subscribe({
              next: () => { this.toast = 'Academia creada'; this.load(); },
              error: () => { this.toast = 'Error al crear academia'; },
            });
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async openEdit(academia: Academia) {
    const alert = await this.alertCtrl.create({
      header: 'Editar academia',
      inputs: [
        { name: 'name', type: 'text', value: academia.name, placeholder: 'Nombre' },
        { name: 'city', type: 'text', value: academia.city ?? '', placeholder: 'Ciudad' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data): boolean => {
            if (!data.name) return false;
            this.admin.updateAcademia(academia.id, { name: data.name, city: data.city || undefined }).subscribe({
              next: () => { this.toast = 'Academia actualizada'; this.load(); },
              error: () => { this.toast = 'Error al actualizar'; },
            });
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmDelete(academia: Academia) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar academia',
      message: `¿Eliminar "${academia.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.admin.deleteAcademia(academia.id).subscribe({
              next: () => { this.toast = 'Academia eliminada'; this.load(); },
              error: () => { this.toast = 'Error al eliminar'; },
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
