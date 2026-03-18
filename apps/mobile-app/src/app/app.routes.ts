import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { onboardingGuard } from './guards/onboarding.guard';
import { TabsPage } from './pages/tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },

  // Login — blocked if already authenticated
  {
    path: 'login',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },

  // Onboarding flow — blocked if already authenticated
  {
    path: 'onboarding/ciudad',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./pages/onboarding/ciudad/onboarding-ciudad.page').then(
        (m) => m.OnboardingCiudadPage
      ),
  },
  {
    path: 'onboarding/rol',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./pages/onboarding/rol/onboarding-rol.page').then(
        (m) => m.OnboardingRolPage
      ),
  },
  {
    path: 'onboarding/nivel',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./pages/onboarding/nivel/onboarding-nivel.page').then(
        (m) => m.OnboardingNivelPage
      ),
  },
  {
    path: 'onboarding/estilos',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./pages/onboarding/estilos/onboarding-estilos.page').then(
        (m) => m.OnboardingEstilosPage
      ),
  },

  // Authenticated tabs shell
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },

  // Event detail — full-screen, no tab bar
  {
    path: 'event/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/event-detail/event-detail.page').then(
        (m) => m.EventDetailPage
      ),
  },

  // Admin section
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/admin-home.page').then(
            (m) => m.AdminHomePage
          ),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/admin/admin-events.page').then(
            (m) => m.AdminEventsPage
          ),
      },
      {
        path: 'venues',
        loadComponent: () =>
          import('./pages/admin/admin-venues.page').then(
            (m) => m.AdminVenuesPage
          ),
      },
      {
        path: 'estilos',
        loadComponent: () =>
          import('./pages/admin/admin-estilos.page').then(
            (m) => m.AdminEstilosPage
          ),
      },
      {
        path: 'academias',
        loadComponent: () =>
          import('./pages/admin/admin-academias.page').then(
            (m) => m.AdminAcademiasPage
          ),
      },
    ],
  },

  // Catch-all
  { path: '**', redirectTo: '/tabs/home' },
];
