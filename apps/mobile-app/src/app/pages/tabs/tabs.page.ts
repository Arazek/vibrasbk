import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, people } from 'ionicons/icons';
import { FriendsService } from '../../services/friends.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Agenda</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="friends" href="/tabs/friends">
          <ion-icon name="people"></ion-icon>
          <ion-label>Amigos</ion-label>
          <ion-badge *ngIf="pendingCount > 0" color="danger">{{ pendingCount }}</ion-badge>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsPage implements OnInit {
  pendingCount = 0;

  constructor(
    private readonly friendsService: FriendsService,
    private readonly router: Router,
  ) {
    addIcons({ home, people });
  }

  ngOnInit(): void {
    this.refreshBadge();

    // Refresh badge whenever we navigate back to a tabs page
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
    ).subscribe((e: any) => {
      if ((e.url as string).startsWith('/tabs')) {
        this.refreshBadge();
      }
    });
  }

  private refreshBadge(): void {
    this.friendsService.getPendingCount().subscribe({
      next: (count) => { this.pendingCount = count as unknown as number; },
      error: () => {},
    });
  }
}
