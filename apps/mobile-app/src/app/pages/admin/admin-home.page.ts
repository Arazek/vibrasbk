import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendar, location, statsChart, chevronBack, musicalNotes, school } from 'ionicons/icons';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon, IonButtons, IonButton,
  ],
  styles: [`
    .admin-header {
      padding: var(--lgui-pad-md);
      font-size: 13px;
      color: var(--lgui-text-3);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="goBack()">
            <ion-icon slot="start" name="chevron-back"></ion-icon>
            Perfil
          </ion-button>
        </ion-buttons>
        <ion-title>Panel Admin</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="admin-header">Gestión</div>
      <ion-list>
        <ion-item button (click)="go('/admin/events')">
          <ion-icon name="calendar" slot="start" color="primary"></ion-icon>
          <ion-label>Eventos</ion-label>
        </ion-item>
        <ion-item button (click)="go('/admin/venues')">
          <ion-icon name="location" slot="start" color="primary"></ion-icon>
          <ion-label>Locales</ion-label>
        </ion-item>
        <ion-item button (click)="go('/admin/estilos')">
          <ion-icon name="musical-notes" slot="start" color="primary"></ion-icon>
          <ion-label>Estilos de Baile</ion-label>
        </ion-item>
        <ion-item button (click)="go('/admin/academias')">
          <ion-icon name="school" slot="start" color="primary"></ion-icon>
          <ion-label>Academias</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class AdminHomePage {
  constructor(private navCtrl: NavController) {
    addIcons({ calendar, location, statsChart, chevronBack, musicalNotes, school });
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  go(path: string) {
    this.navCtrl.navigateForward(path);
  }
}
