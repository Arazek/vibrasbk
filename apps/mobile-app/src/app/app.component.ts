import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'mobile-app';

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly platform: Platform,
    themeService: ThemeService,
  ) {
    themeService.init();
  }

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      const url = this.router.url.split('?')[0];

      // Exit points
      if (url === '/login' || url === '/tabs/home') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).Capacitor?.Plugins?.App?.exitApp();
        return;
      }

      // Tabs: always land on Agenda before exiting
      if (url === '/tabs/friends' || url === '/tabs/profile') {
        this.router.navigate(['/tabs/home']);
        return;
      }

      // Full-screen pages with a clear parent
      if (url === '/friends/add') {
        this.router.navigate(['/tabs/friends']);
        return;
      }

      if (url.startsWith('/event/')) {
        this.router.navigate(['/tabs/home']);
        return;
      }

      if (url.startsWith('/admin/')) {
        this.router.navigate(['/admin']);
        return;
      }

      if (url === '/admin') {
        this.router.navigate(['/tabs/home']);
        return;
      }

      // Onboarding: step back through the flow via router history
      if (url.startsWith('/onboarding/')) {
        this.location.back();
        return;
      }

      // Fallback: use router history, or go home
      this.location.back();
    });
  }
}
