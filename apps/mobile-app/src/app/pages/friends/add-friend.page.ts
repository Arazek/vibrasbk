import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonButton, IonIcon, IonSpinner, IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, searchOutline } from 'ionicons/icons';
import { FriendsService } from '../../services/friends.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonButton, IonIcon, IonSpinner, IonToast,
  ],
  styles: [`
    .header {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-sm);
      padding: var(--lgui-pad-md);
      border-bottom: 1px solid var(--lgui-surface-3);
    }
    .header-title {
      font-size: var(--lgui-fs-subheading);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
    }
    .body {
      padding: var(--lgui-pad-lg) var(--lgui-pad-md);
      display: flex;
      flex-direction: column;
      gap: var(--lgui-gap-lg);
    }
    .hint {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
      line-height: 1.5;
    }
    /* Toggle: alias / email */
    .type-toggle {
      display: flex;
      background: var(--lgui-surface-2);
      border-radius: var(--lgui-radius-pill);
      padding: 0.1875rem;
      gap: 0;
    }
    .type-btn {
      flex: 1;
      border: none;
      background: transparent;
      border-radius: var(--lgui-radius-pill);
      padding: 0.4375rem var(--lgui-pad-sm);
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-3);
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .type-btn.active {
      background: var(--lgui-surface-1);
      color: var(--lgui-text-4);
      box-shadow: var(--lgui-shadow-sm);
    }
    .input-wrap {
      display: flex;
      align-items: center;
      background: var(--lgui-surface-2);
      border-radius: var(--lgui-radius-default);
      border: 1px solid var(--lgui-surface-3);
      overflow: hidden;
    }
    .input-wrap input {
      flex: 1;
      border: none;
      background: transparent;
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      font-size: var(--lgui-fs-body);
      color: var(--lgui-text-4);
      outline: none;
    }
    .input-wrap input::placeholder {
      color: var(--lgui-text-2);
    }
    .submit-btn {
      --border-radius: var(--lgui-radius-default);
      width: 100%;
    }
  `],
  template: `
    <ion-content>
      <div class="header">
        <ion-button fill="clear" size="small" (click)="goBack()">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </ion-button>
        <span class="header-title">Añadir amigo</span>
      </div>

      <div class="body">
        <p class="hint">
          Busca a alguien por su alias exacto o email. Por privacidad, no hay sugerencias automáticas.
        </p>

        <!-- Alias / Email toggle -->
        <div class="type-toggle">
          <button class="type-btn" [class.active]="identifierType === 'alias'" (click)="identifierType = 'alias'">
            Alias
          </button>
          <button class="type-btn" [class.active]="identifierType === 'email'" (click)="identifierType = 'email'">
            Email
          </button>
        </div>

        <!-- Input -->
        <div class="input-wrap">
          <input
            [(ngModel)]="identifier"
            [placeholder]="identifierType === 'alias' ? 'alias exacto' : 'email exacto'"
            [type]="identifierType === 'email' ? 'email' : 'text'"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="none"
            spellcheck="false"
            (keyup.enter)="submit()"
          />
        </div>

        <ion-button
          class="submit-btn"
          [disabled]="!identifier.trim() || sending"
          (click)="submit()">
          <ion-spinner *ngIf="sending" slot="start" name="crescent"></ion-spinner>
          <ion-icon *ngIf="!sending" slot="start" name="search-outline"></ion-icon>
          Enviar solicitud
        </ion-button>
      </div>

      <ion-toast
        [isOpen]="!!toastMsg"
        [message]="toastMsg"
        [color]="toastError ? 'danger' : 'success'"
        duration="2500"
        position="bottom"
        (didDismiss)="toastMsg = ''">
      </ion-toast>
    </ion-content>
  `,
})
export class AddFriendPage {
  identifier = '';
  identifierType: 'alias' | 'email' = 'alias';
  sending = false;
  toastMsg = '';
  toastError = false;

  constructor(
    private friendsService: FriendsService,
    private router: Router,
  ) {
    addIcons({ arrowBackOutline, searchOutline });
  }

  submit(): void {
    const value = this.identifier.trim();
    if (!value || this.sending) return;

    this.sending = true;
    this.friendsService.sendRequest(value, this.identifierType).subscribe({
      next: () => {
        this.sending = false;
        this.toastError = false;
        this.toastMsg = `Solicitud enviada a ${this.identifierType === 'alias' ? '@' : ''}${value}`;
        this.identifier = '';
        setTimeout(() => this.goBack(), 1800);
      },
      error: (err: HttpErrorResponse) => {
        this.sending = false;
        this.toastError = true;
        if (err.status === 404) {
          this.toastMsg = 'Usuario no encontrado';
        } else if (err.status === 409) {
          this.toastMsg = err.error?.message ?? 'Solicitud ya enviada o ya sois amigos';
        } else {
          this.toastMsg = 'Error al enviar la solicitud';
        }
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/tabs/friends']);
  }
}
