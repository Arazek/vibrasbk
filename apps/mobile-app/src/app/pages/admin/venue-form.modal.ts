import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonInput, IonText, ModalController,
} from '@ionic/angular/standalone';
import { CreateVenuePayload } from '../../services/admin.service';

@Component({
  selector: 'app-venue-form-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonButton, IonInput, IonText,
  ],
  styles: [`
    .form-field { padding: 8px 0; }
    .coords-preview { font-size: 12px; color: var(--ion-color-medium); margin-top: 4px; padding: 0 16px; }
    .coords-ok { color: var(--ion-color-success); }
    .coords-err { color: var(--ion-color-danger); }
    ion-content {
      --background: var(--ion-background-color, #ffffff);
      --color: var(--ion-text-color, #19213D);
    }
    ion-input {
      color: var(--ion-text-color, #19213D);
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? 'Editar local' : 'Nuevo local' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-field">
        <ion-input
          label="Nombre del local"
          labelPlacement="stacked"
          [(ngModel)]="form.name"
          placeholder="Ej: El Almacén">
        </ion-input>
      </div>
      <div class="form-field">
        <ion-input
          label="Ciudad"
          labelPlacement="stacked"
          [(ngModel)]="form.city"
          placeholder="Cartagena">
        </ion-input>
      </div>
      <div class="form-field">
        <ion-input
          label="Enlace Google Maps"
          labelPlacement="stacked"
          [(ngModel)]="mapsLink"
          (ionInput)="parseLink($event)"
          placeholder="https://maps.app.goo.gl/... o pega la URL">
        </ion-input>
        <p class="coords-preview" [class.coords-ok]="coordsOk" [class.coords-err]="coordsErr">
          {{ coordsMsg }}
        </p>
      </div>
      <div class="form-field">
        <ion-input
          label="Aforo máximo"
          labelPlacement="stacked"
          type="number"
          [(ngModel)]="form.maxCapacity"
          placeholder="100">
        </ion-input>
      </div>
      <ion-button expand="block" style="margin-top: 24px;" (click)="submit()">
        {{ editingId ? 'Guardar cambios' : 'Crear local' }}
      </ion-button>
    </ion-content>
  `,
})
export class VenueFormModal {
  @Input() editingId: string | null = null;
  @Input() initial: CreateVenuePayload = { name: '', city: 'Cartagena' };

  form: CreateVenuePayload = { name: '', city: 'Cartagena' };
  mapsLink = '';
  coordsOk = false;
  coordsErr = false;
  coordsMsg = 'Pega un enlace de Google Maps para extraer las coordenadas';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.form = { ...this.initial };
    if (this.form.lat && this.form.lng) {
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
    }
  }

  parseLink(event: any) {
    const url: string = event.target?.value ?? '';
    this.coordsOk = false;
    this.coordsErr = false;
    this.coordsMsg = '';
    this.form.lat = undefined;
    this.form.lng = undefined;

    if (!url.trim()) {
      this.coordsMsg = 'Pega un enlace de Google Maps para extraer las coordenadas';
      return;
    }

    // Pattern 1: @lat,lng in URL (google.com/maps/@lat,lng,...)
    const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      this.form.lat = parseFloat(atMatch[1]);
      this.form.lng = parseFloat(atMatch[2]);
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
      return;
    }

    // Pattern 2: ?q=lat,lng or &q=lat,lng
    const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      this.form.lat = parseFloat(qMatch[1]);
      this.form.lng = parseFloat(qMatch[2]);
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
      return;
    }

    // Pattern 3: /place/.../@lat,lng or destination=lat,lng
    const destMatch = url.match(/destination=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (destMatch) {
      this.form.lat = parseFloat(destMatch[1]);
      this.form.lng = parseFloat(destMatch[2]);
      this.coordsOk = true;
      this.coordsMsg = `✅ ${this.form.lat}, ${this.form.lng}`;
      return;
    }

    // Shortened URL (maps.app.goo.gl) — can't resolve without HTTP, warn user
    if (url.includes('goo.gl') || url.includes('maps.app')) {
      this.coordsErr = true;
      this.coordsMsg = '⚠️ Enlace corto detectado. Usa el enlace completo de Google Maps (Share → Copy link)';
      return;
    }

    this.coordsErr = true;
    this.coordsMsg = '❌ No se pudieron extraer coordenadas. Usa: Compartir → Copiar enlace en Google Maps';
  }

  dismiss() {
    this.modalCtrl.dismiss(null);
  }

  submit() {
    if (!this.form.name?.trim()) return;
    this.modalCtrl.dismiss({ form: this.form });
  }
}
