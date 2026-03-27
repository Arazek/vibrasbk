import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton, IonIcon, IonSpinner, IonRefresher,
  IonRefresherContent, IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, checkmarkOutline, closeOutline, peopleOutline } from 'ionicons/icons';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FriendsService } from '../../services/friends.service';
import { Friend, FriendRequest } from '@shared/types';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonButton, IonIcon, IonSpinner,
    IonRefresher, IonRefresherContent, IonToast,
    NavbarComponent,
  ],
  styles: [`
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--lgui-pad-md) var(--lgui-pad-md) var(--lgui-gap-sm);
    }
    .page-title {
      font-size: var(--lgui-fs-heading);
      font-weight: var(--lgui-fw-bold);
      color: var(--lgui-text-4);
    }
    .section-title {
      font-size: var(--lgui-fs-caption);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-3);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: var(--lgui-gap-sm) var(--lgui-pad-md) var(--lgui-gap-xs);
    }
    /* Request cards */
    .request-card {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      background: var(--lgui-surface-1);
      border-bottom: 1px solid var(--lgui-surface-3);
    }
    /* Friend rows */
    .friend-row {
      display: flex;
      align-items: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-sm) var(--lgui-pad-md);
      border-bottom: 1px solid var(--lgui-surface-3);
    }
    .avatar {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: rgba(var(--ion-color-primary-rgb), 0.12);
      border: 2px solid var(--ion-color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--lgui-fs-subheading);
      font-weight: var(--lgui-fw-bold);
      color: var(--ion-color-primary);
      flex-shrink: 0;
      overflow: hidden;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .user-info {
      flex: 1;
      min-width: 0;
    }
    .user-alias {
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-semibold);
      color: var(--lgui-text-4);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-meta {
      font-size: var(--lgui-fs-caption);
      color: var(--lgui-text-3);
    }
    .request-actions {
      display: flex;
      gap: var(--lgui-gap-xs);
      flex-shrink: 0;
    }
    .btn-accept {
      --background: var(--vibe-lively);
      --color: #fff;
      --border-radius: var(--lgui-radius-pill);
      --padding-start: var(--lgui-pad-sm);
      --padding-end: var(--lgui-pad-sm);
      height: 2rem;
      font-size: var(--lgui-fs-caption);
    }
    .btn-reject {
      --background: var(--lgui-surface-3);
      --color: var(--lgui-text-3);
      --border-radius: var(--lgui-radius-pill);
      --padding-start: var(--lgui-pad-sm);
      --padding-end: var(--lgui-pad-sm);
      height: 2rem;
      font-size: var(--lgui-fs-caption);
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--lgui-gap-md);
      padding: var(--lgui-pad-xl) var(--lgui-pad-md);
      color: var(--lgui-text-3);
    }
    .empty-icon {
      font-size: 3rem;
      opacity: 0.4;
    }
    .empty-text {
      font-size: var(--lgui-fs-body);
      text-align: center;
    }
    .add-friend-btn {
      --border-radius: var(--lgui-radius-pill);
    }
  `],
  template: `
    <ion-content>
      <app-navbar></app-navbar>

      <ion-refresher slot="fixed" (ionRefresh)="load($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="page-header">
        <span class="page-title">Amigos</span>
        <ion-button class="add-friend-btn" size="small" (click)="goToAddFriend()">
          <ion-icon slot="start" name="person-add-outline"></ion-icon>
          Añadir
        </ion-button>
      </div>

      <div *ngIf="loading" style="display:flex;justify-content:center;padding:2rem">
        <ion-spinner></ion-spinner>
      </div>

      <ng-container *ngIf="!loading">

        <!-- Pending requests -->
        <ng-container *ngIf="pendingRequests.length > 0">
          <div class="section-title">Solicitudes recibidas · {{ pendingRequests.length }}</div>
          <div *ngFor="let req of pendingRequests" class="request-card">
            <div class="avatar">
              <img *ngIf="photoSrc(req.requester.photoUrl)" [src]="photoSrc(req.requester.photoUrl)" />
              <span *ngIf="!photoSrc(req.requester.photoUrl)">{{ initial(req.requester.alias) }}</span>
            </div>
            <div class="user-info">
              <div class="user-alias">&#64;{{ req.requester.alias }}</div>
              <div class="user-meta">{{ roleLabel(req.requester.dancingRole) }} · {{ levelLabel(req.requester.level) }}</div>
            </div>
            <div class="request-actions">
              <ion-button class="btn-accept" size="small" [disabled]="responding === req.id" (click)="respond(req.id, 'accept')">
                <ion-icon name="checkmark-outline"></ion-icon>
              </ion-button>
              <ion-button class="btn-reject" size="small" [disabled]="responding === req.id" (click)="respond(req.id, 'reject')">
                <ion-icon name="close-outline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </ng-container>

        <!-- Friends list -->
        <div class="section-title">Mis amigos · {{ friends.length }}</div>

        <div *ngIf="friends.length === 0" class="empty-state">
          <ion-icon class="empty-icon" name="people-outline"></ion-icon>
          <span class="empty-text">Aún no tienes amigos.<br>¡Añade a alguien!</span>
          <ion-button class="add-friend-btn" (click)="goToAddFriend()">
            <ion-icon slot="start" name="person-add-outline"></ion-icon>
            Añadir amigo
          </ion-button>
        </div>

        <div *ngFor="let f of friends" class="friend-row">
          <div class="avatar">
            <img *ngIf="photoSrc(f.user.photoUrl)" [src]="photoSrc(f.user.photoUrl)" />
            <span *ngIf="!photoSrc(f.user.photoUrl)">{{ initial(f.user.alias) }}</span>
          </div>
          <div class="user-info">
            <div class="user-alias">&#64;{{ f.user.alias }}</div>
            <div class="user-meta">
              {{ roleLabel(f.user.dancingRole) }} · {{ levelLabel(f.user.level) }}
              <span *ngIf="f.user.city"> · {{ f.user.city.name }}</span>
            </div>
          </div>
        </div>

      </ng-container>

      <ion-toast
        [isOpen]="!!toastMsg"
        [message]="toastMsg"
        duration="2500"
        position="bottom"
        (didDismiss)="toastMsg = ''">
      </ion-toast>
    </ion-content>
  `,
})
export class FriendsPage implements OnInit {
  loading = true;
  friends: Friend[] = [];
  pendingRequests: any[] = [];
  responding: string | null = null;
  toastMsg = '';

  constructor(
    private friendsService: FriendsService,
    private router: Router,
  ) {
    addIcons({ personAddOutline, checkmarkOutline, closeOutline, peopleOutline });
  }

  ngOnInit(): void {
    this.load();
  }

  load(event?: any): void {
    this.loading = !event;
    let done = 0;
    const finish = () => {
      done++;
      if (done === 2) {
        this.loading = false;
        event?.target?.complete();
      }
    };

    this.friendsService.getFriends().subscribe({
      next: (f) => { this.friends = f; finish(); },
      error: () => finish(),
    });

    this.friendsService.getReceivedRequests().subscribe({
      next: (r) => { this.pendingRequests = r; finish(); },
      error: () => finish(),
    });
  }

  respond(id: string, action: 'accept' | 'reject'): void {
    this.responding = id;
    this.friendsService.respondToRequest(id, action).subscribe({
      next: () => {
        this.responding = null;
        this.toastMsg = action === 'accept' ? 'Solicitud aceptada' : 'Solicitud rechazada';
        this.load();
      },
      error: () => {
        this.responding = null;
        this.toastMsg = 'Error al responder';
      },
    });
  }

  goToAddFriend(): void {
    this.router.navigate(['/friends/add']);
  }

  photoSrc(url?: string | null): string | null {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return environment.socketUrl + url;
  }

  initial(alias: string): string {
    return alias?.charAt(0)?.toUpperCase() ?? '?';
  }

  roleLabel(role: string): string {
    const map: Record<string, string> = { leader: 'Líder', follower: 'Seguidor', switch: 'Switch' };
    return map[role] ?? role;
  }

  levelLabel(level: string): string {
    const map: Record<string, string> = {
      beginner: 'Nuevo',
      initiation: 'Iniciación',
      comfortable: 'Social',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    };
    return map[level] ?? level;
  }
}
