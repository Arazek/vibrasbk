import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import {
  IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { addIcons } from 'ionicons';
import { calendar, location, statsChart, chevronBack, musicalNotes, school } from 'ionicons/icons';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    IonContent,
    IonList, IonItem, IonLabel, IonIcon,
    NavbarComponent,
  ],
  styles: [`
    .admin-header {
      padding: var(--lgui-pad-md);
      font-size: var(--lgui-fs-body);
      color: var(--lgui-text-3);
      font-weight: var(--lgui-fw-semibold);
      text-transform: uppercase;
      letter-spacing: 0.0375rem;
    }
  `],
  template: `
    <app-navbar></app-navbar>
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
